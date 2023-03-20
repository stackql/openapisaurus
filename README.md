# openapisaurus

> Command line utility to split OpenAPI documents into smaller, self contained, service oriented documents and prepare StackQL provider interfaces
> Command line utility to help developers prepare and submit StackQL provider specs, see [StackQL](https://github.com/stackql/stackql)

`openapisaurus` is implemented in TypeScript and designed to be run using the [`deno`](https://deno.land/) runtime.

## Installation

1. Install Deno by following the instructions at [deno.land](https://deno.land/).
2. Clone the `openapisaurus` repository to your local machine:
```
git clone git@github.com:stackql/openapisaurus.git
```
3. Make the `openapisaurus` script executable by running the following command:
```
chmod +x openapisaurus
```

## Command Line Usage

### `split`

Splits an OpenAPI spec into multiple service scoped documents.  

> &nbsp;&nbsp;&nbsp;__Usage:__   
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`openapisaurus split <apiDoc> <flags>`  
> 
> &nbsp;&nbsp;&nbsp;__Arguments:__  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`apiDoc`  __[REQUIRED]__ OpenAPI specification to be split.  
> 
> &nbsp;&nbsp;&nbsp;__Flags:__  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--providerName`      __[REQUIRED]__ Name of the provider.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--svcDiscriminator`  __[REQUIRED]__ [JMESPath](https://jmespath.org/) expression to extract the service name from the OpenAPI spec.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--exclude`           __[OPTIONAL]__ [JMESPath](https://jmespath.org/) expression for paths to exclude from processing.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--outputDir`         __[OPTIONAL]__ Directory to write the output OpenAPI documents to. (defaults to `cwd`)  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--overwrite`         __[OPTIONAL]__ Overwrite existing files. (defaults to `false`)  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--verbose`           __[OPTIONAL]__ Verbose output (defaults to `false`).  

#### Examples

`fivetran` example:  

```
./openapisaurus split \
ref/fivetran/swagger.json \
--providerName=fivetran \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite \
--verbose
```

`digitalocean` example:  

```
./openapisaurus split \
ref/digitalocean/digitalocean-openapi-bundled.yaml \
--providerName=digitalocean \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite
```

### `dev`

Generate stackql provider development provider docs.    

> &nbsp;&nbsp;&nbsp;__Usage:__   
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`openapisaurus dev <apiDocDir> <flags>`  
> 
> &nbsp;&nbsp;&nbsp;__Arguments:__  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`apiDocDir`  __[REQUIRED]__ Directory containing OpenAPI specifications used to create StackQL dev docs.  
> 
> &nbsp;&nbsp;&nbsp;__Flags:__  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--providerName`      __[REQUIRED]__ Name of the provider.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--resDiscriminator`  __[REQUIRED]__ [JMESPath](https://jmespath.org/) used to identify stackql resources from an OpenAPI spec.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (defaults to `path_tokens`).  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--providerConfig`    __[OPTIONAL]__ Stringified JSON object, describing the config for a provider.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (defaults to `{ "auth": { "type": "null_auth" }}`).  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--methodKey`         __[OPTIONAL]__ [JMESPath](https://jmespath.org/) used to identify resource methods from a providers OpenAPI spec.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (defaults to `operationId`).  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--overwrite`         __[OPTIONAL]__ Overwrite existing files. (defaults to `false`)  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--verbose`           __[OPTIONAL]__ Verbose output (defaults to `false`).  

#### Examples

`fivetran` example:  

```
./openapisaurus dev \
dev \
--providerName=fivetran \
--providerConfig='{ "auth": { "type": "basic", "credentialsenvvar": "FIVETRAN_CREDS" }}' \
--overwrite \
--verbose
```

`digitalocean` example:  

```
./openapisaurus dev \
dev \
--providerName=digitalocean \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "DIGITALOCEAN_TOKEN" }}' \
--overwrite \
--verbose
```

### `build`

Build deployable stackql provider docs.   

> &nbsp;&nbsp;&nbsp;__Usage:__   
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`openapisaurus build <apiDocDir> <flags>`  
> 
> &nbsp;&nbsp;&nbsp;__Arguments:__  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`apiDocDir`  __[REQUIRED]__ Directory containing OpenAPI service specifications and StackQL dev docs.  
> 
> &nbsp;&nbsp;&nbsp;__Flags:__  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--providerName`      __[REQUIRED]__ Name of the provider.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--outputDir`         __[REQUIRED]__ Output directory to write compiled docs to.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--servers`    __[OPTIONAL]__ Stringified JSON array containing servers for the provider.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (overrides the `servers` list in the original OpenAPI spec).  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--overwrite`         __[OPTIONAL]__ Overwrite existing files. (defaults to `false`)  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--verbose`           __[OPTIONAL]__ Verbose output (defaults to `false`).  

#### Examples

`fivetran` example:  

```
./openapisaurus build \
dev \
--providerName=fivetran \
--outputDir=src \
--overwrite \
--verbose
```

`digitalocean` example:  

```
./openapisaurus build \
dev \
--providerName=digitalocean \
--outputDir=src \
--overwrite \
--verbose
```

## Run provider meta tests

> to run tests locally you will need to download `stackql`, to download the latest `stackql` release for Linux you can use the following commands:  
> `curl -L https://bit.ly/stackql-zip -O && unzip stackql-zip`

## Testing providers using the local registry

To test providers using the local registry, you can use the following commands:  

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```
## Running without `openapisaurus`

To run directly without using the `openapisaurus` script, you can use the following command as an example:  

```
deno run \
--allow-net \
--allow-read \
--allow-write \
app.ts split \
../../local-registry/ref/fivetran/swagger.json \
--providerName=fivetran \
--svcdiscriminator='["tags"][0]' \
--overwrite \
--verbose 
```

If you have any issues with `openapisaurus`, please report them [here](https://github.com/stackql/openapisaurus/issues).

## License

This project is licensed under the [MIT License](LICENSE).
