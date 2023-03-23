// node tests/inspectProvider.js cloudflare 2>&1 | tee cloudflare.log

const { execSync } = require("child_process");

const regStr = '{"url": "file:///mnt/c/LocalGitRepos/stackql/openapisaurus", "localDocRoot": "/mnt/c/LocalGitRepos/stackql/openapisaurus", "verifyConfig": {"nopVerify": true}}';

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: node inspectProvider.js <provider>");
  process.exit(1);
}
const provider = args[0];

// Get the services for the provider
const servicesCommand = `./stackql exec --registry='${regStr}' --output=json 'SHOW SERVICES IN ${provider}'`;
const servicesOutput = execSync(servicesCommand);
const servicesJson = JSON.parse(servicesOutput);

// Loop through the services and get the resources for each service
for (const service of servicesJson) {
  const serviceName = service.name;
  console.log(`/*`);
  console.log(`*`);
  console.log(`* Processing resources in ${serviceName}`);
  console.log(`*`);
  console.log(`*/`);
  const resourcesCommand = `./stackql exec --registry='${regStr}' --output=json 'SHOW RESOURCES IN ${provider}.${serviceName}'`;
  const resourcesOutput = execSync(resourcesCommand);
  let resourcesJson;
  try {
    resourcesJson = JSON.parse(resourcesOutput);
  } catch (e) {
    console.log(resourcesOutput);
  }

  // Loop through the resources and describe each resource
  for (const resource of resourcesJson) {
    const resourceId = resource.id;
    const describeStatement = `DESCRIBE ${resourceId}`;
    console.log(`/* ${describeStatement} */`);
    const describeCommand = `./stackql exec --registry='${regStr}' '${describeStatement}'`;
    const describeOutput = execSync(describeCommand).toString();
    console.log(describeOutput);
  }
}
