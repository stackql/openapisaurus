import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { createResourceIndexContent } from './resource-index-content.js';
import SwaggerParser from '@apidevtools/swagger-parser';

//
// main doc function
//
export async function doc(providerName) {

    const projectRoot = process.cwd();
    const dirName = path.basename(projectRoot);
    if (dirName !== 'openapisaurus') {
        console.error(`Must be run from openapisaurus project root...`);
        throw new Error('Must be run from openapisaurus project root');
    }    

    console.log(`documenting ${providerName}...`);

    const providerDir = `src/${providerName}/v00.00.00000`;
    const docsDir = `provider_docs/${providerName}-docs`;
   
    // delete ${providerName}-docs/index.md if it exists
    fs.existsSync(`${docsDir}/index.md`) && fs.unlinkSync(`${docsDir}/index.md`);
    fs.existsSync(`${docsDir}/providers`) && fs.rmSync(`${docsDir}/providers`, { recursive: true, force: true });

    // init provider index
    let servicesForIndex = [];

    if (!fs.existsSync(`doc_gen/provider_data/${providerName}/headerContent1.txt`) || !fs.existsSync(`doc_gen/provider_data/${providerName}/headerContent2.txt`)){
        console.error(`Missing headerContent1.txt or headerContent2.txt for ${providerName}...`);
        throw new Error(`Missing headerContent1.txt or headerContent2.txt for ${providerName}`);
    }

    // Static header content
    const headerContent1 = fs.readFileSync(`doc_gen/provider_data/${providerName}/headerContent1.txt`, 'utf8');
    const headerContent2 = fs.readFileSync(`doc_gen/provider_data/${providerName}/headerContent2.txt`, 'utf8');

    // Initialize counters for services and resources
    let totalServicesCount = 0;
    let totalResourcesCount = 0;

    //
    // Iterate over each yaml file in the output directory
    // and generate documentation for each service
    //

    // Process each YAML file one by one
    const serviceDir = `${providerDir}/services`;
    console.log(`Processing services in ${serviceDir}...`);
    const serviceFiles = fs.readdirSync(serviceDir).filter(file => path.extname(file) === '.yaml');

    for (const file of serviceFiles) {
        const serviceName = path.basename(file, '.yaml');
        console.log(`Processing ${serviceName}`);
        servicesForIndex.push(serviceName);
        const filePath = path.join(serviceDir, file);
        totalServicesCount++;
        const serviceFolder = `${docsDir}/providers/${providerName}/${serviceName}`;
        await createDocsForService(filePath, providerName, serviceName, serviceFolder); // Ensure one-by-one processing
    }

    console.log(`Processed ${totalServicesCount} services`);

    // totalResourcesCount is the sum of all resources in all services
    totalResourcesCount = fs.readdirSync(`provider_docs/${providerName}-docs/providers/${providerName}`, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => fs.readdirSync(`provider_docs/${providerName}-docs/providers/${providerName}/${dirent.name}`).length)
        .reduce((a, b) => a + b, 0);

        console.log(`Processed ${totalResourcesCount} resources`);

    //
    // get data for provider index
    //

    // make sure servicesForIndex is unique
    servicesForIndex = [...new Set(servicesForIndex)];

    // add services to index
    servicesForIndex.sort();

    // Splitting services into two columns
    const half = Math.ceil(servicesForIndex.length / 2);
    const firstColumnServices = servicesForIndex.slice(0, half);
    const secondColumnServices = servicesForIndex.slice(half);

    // Create the content for the index file
    const indexContent = `${headerContent1}

:::info Provider Summary

<div class="row">
<div class="providerDocColumn">
<span>total services:&nbsp;<b>${totalServicesCount}</b></span><br />
<span>total resources:&nbsp;<b>${totalResourcesCount}</b></span><br />
</div>
</div>

:::

${headerContent2}

## Services
<div class="row">
<div class="providerDocColumn">
${servicesToMarkdown(providerName, firstColumnServices)}
</div>
<div class="providerDocColumn">
${servicesToMarkdown(providerName, secondColumnServices)}
</div>
</div>
`;

    // Write the index file
    const indexPath = `provider_docs/${providerName}-docs/index.md`;
    fs.writeFileSync(indexPath, indexContent);

    console.log(`Index file created at ${indexPath}`);

}

// Process each service sequentially
async function createDocsForService(yamlFilePath, providerName, serviceName, serviceFolder) {

    const data = yaml.load(fs.readFileSync(yamlFilePath, 'utf8'));

    // Create a new SwaggerParser instance
    let parser = new SwaggerParser();
    let dereferencedAPI = await parser.dereference(yamlFilePath);

    // Create service directory
    if (!fs.existsSync(serviceFolder)) {
        fs.mkdirSync(serviceFolder, { recursive: true });
    }

    const resourcesObj = data.components['x-stackQL-resources'];
    const componentsSchemas = data.components.schemas;
    const componentsRequestBodies = data?.components?.requestBodies || {};
    const paths = data.paths;

    if (!resourcesObj) {
        console.warn(`No resources found in ${yamlFilePath}`);
        return;
    }

    const resources = [];
    for (let resourceName in resourcesObj) {
        // Skip resources that start with "vw_"
        if (resourceName.startsWith('vw_')) continue;
    
        let resourceData = resourcesObj[resourceName];
        if (!resourceData.id) {
            console.warn(`No 'id' defined for resource: ${resourceName} in service: ${serviceName}`);
            continue;
        }
    
        // Check if there's a corresponding "vw_" resource
        const vwResourceName = `vw_${resourceName}`;
        const hasVwResource = vwResourceName in resourcesObj;
    
        resources.push({
            name: resourceName,
            vwResourceName: hasVwResource ? vwResourceName : hasVwResource,
            resourceData,
            paths,
            componentsSchemas,
            componentsRequestBodies,
            dereferencedAPI
        });
    }    

    // Process service index
    const serviceIndexPath = path.join(serviceFolder, 'index.md');
    const serviceIndexContent = await createServiceIndexContent(providerName, serviceName, resources);
    fs.writeFileSync(serviceIndexPath, serviceIndexContent);

    // Split into columns and process resources one by one
    const halfLength = Math.ceil(resources.length / 2);
    const firstColumn = resources.slice(0, halfLength);
    const secondColumn = resources.slice(halfLength);

    // Process each resource in first column
    for (const resource of firstColumn) {
        await processResource(providerName, serviceFolder, serviceName, resource);
    }

    // Process each resource in second column
    for (const resource of secondColumn) {
        await processResource(providerName, serviceFolder, serviceName, resource);
    }

    console.log(`Generated documentation for ${serviceName}`);
}

// new
async function processResource(providerName, serviceFolder, serviceName, resource) {
    console.log(`Processing resource: ${resource.name}`);
    
    const resourceFolder = path.join(serviceFolder, resource.name);
    if (!fs.existsSync(resourceFolder)) {
        fs.mkdirSync(resourceFolder, { recursive: true });
    }

    const resourceIndexPath = path.join(resourceFolder, 'index.md');
    const resourceIndexContent = await createResourceIndexContent(
        providerName, 
        serviceName, 
        resource.name, 
        resource.vwResourceName, 
        resource.resourceData, 
        resource.paths, 
        resource.componentsSchemas, 
        resource.componentsRequestBodies,
        resource.dereferencedAPI
    );
    fs.writeFileSync(resourceIndexPath, resourceIndexContent);

    // After writing the file, force garbage collection if available (optional)
    if (global.gc) {
        global.gc();
    }
}

async function createServiceIndexContent(providerName, serviceName, resources) {
    const totalResources = resources.length; // Calculate the total resources

    // Sort resources alphabetically by name
    resources.sort((a, b) => a.name.localeCompare(b.name));

    const halfLength = Math.ceil(totalResources / 2);
    const firstColumnResources = resources.slice(0, halfLength);
    const secondColumnResources = resources.slice(halfLength);

    // Generate the HTML for resource links in the first column
    const firstColumnLinks = generateResourceLinks(providerName, serviceName, firstColumnResources);

    // Generate the HTML for resource links in the second column
    const secondColumnLinks = generateResourceLinks(providerName, serviceName, secondColumnResources);

    // Create the markdown content for the service index
    // You can customize this content as needed
    return `---
title: ${serviceName}
hide_title: false
hide_table_of_contents: false
keywords:
  - ${serviceName}
  - azure
  - microsoft azure
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage Microsoft Azure resources using SQL
custom_edit_url: null
image: /img/providers/azure/stackql-azure-provider-featured-image.png
---

${serviceName} service documentation.

:::info Service Summary

<div class="row">
<div class="providerDocColumn">
<span>total resources:&nbsp;<b>${totalResources}</b></span><br />
</div>
</div>

:::

## Resources
<div class="row">
<div class="providerDocColumn">
${firstColumnLinks}
</div>
<div class="providerDocColumn">
${secondColumnLinks}
</div>
</div>`;
}

function generateResourceLinks(providerName, serviceName, resources) {
    // Generate resource links for the service index
    const resourceLinks = resources.map((resource) => {
        return `<a href="/providers/${providerName}/${serviceName}/${resource.name}/">${resource.name}</a>`;
    });
    return resourceLinks.join('<br />\n');
}

// Function to convert services to markdown links
function servicesToMarkdown(providerName, servicesList) {
    return servicesList.map(service => `<a href="/providers/${providerName}/${service}/">${service}</a><br />`).join('\n');
}

