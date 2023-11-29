import { yellow } from "https://deno.land/std@0.178.0/fmt/colors.ts";

const banner = String.raw`
 ___   ___  ___  ___  ___ _ ___   (_)
/ _ \ / _ \/ -_)/ _ \/ _  // _ \ / /
\___// .__/\__//_//_/\_,_// .__//_/
    /_/                  /_/   
	⠀⠀⠀⠀⠀⠀⢀⣀⡤⠤⠤⠤⠤⣄⣀⠀⠀⠀⠀⠀
	⠀⠀⠀⠀⣠⠞⠉⠀⠀⠀⠀⠀⠀⠀⠈⠓⢦⡀⠀⠀
	⠀⠀⢠⠞⠁⣤⣶⣿⣿⡿⢿⣿⣶⣄⠀⠀⠀⠙⣆⠀
	⠀⢀⡎⠀⣾⣿⣿⣿⣿⣷⣴⣿⣿⣿⣷⠀⠀⠀⠘⣆
	⠀⢸⠁⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⢹
	⠀⢸⠀⠀⠈⠙⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢸
	⠀⠸⡆⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣇⠀⠀⡞
	⠀⠀⠹⡄⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⠿⢀⡼⠁
	⠀⠀⠀⠙⠦⣀⠀⠀⠀⠀⠀⣿⠿⠿⠋⢁⡤⠏⠀⠀
	⠀⠀⠀⠀⠀⠈⠑⠶⠤⣄⣀⣀⠤⠴⠒⠉⠀⠀⠀⠀
  ___ ___ _ __ __ ____ __ __ ___
 (_-</ _  // // // __// // /(_-<
/___/\_,_/ \_,_//_/   \_,_//___/
`;

const banner2 = String.raw` 
 ___   ___  ___  ___  ___ _ ___   (_)___ ___ _ __ __ ____ __ __ ___
/ _ \ / _ \/ -_)/ _ \/ _  // _ \ / /(_-</ _  // // // __// // /(_-<
\___// .__/\__//_//_/\_,_// .__//_//___/\_,_/ \_,_//_/   \_,_//___/
   /_/                  /_/                                       
`

export const usage = {
  //
  // program usage
  //
  program: `${banner}
  Usage: 
    ${yellow('openapisaurus <command> [options]')}

  Commands:
    split   Split an OpenAPI spec into multiple service scoped documents.
    dev     Generate stackql provider development provider docs.
    build   Build deployable stackql provider docs. 
    format  Format an OpenAPI spec to the OpenAPI 3.0.0 spec.
  `,
  //
  // split usage
  //
  split: `${banner2}
  Usage: 
    ${yellow('openapisaurus split <apiDoc> <flags>')}  

  Arguments:
    apiDoc  [REQUIRED] OpenAPI specification to be split.

  Flags:
    --providerName      [REQUIRED] Name of the provider.
    --svcDiscriminator  [REQUIRED] JMESPath expression to extract the service name from the OpenAPI spec.
    --exclude           [OPTIONAL] JMESPath expression for paths to exclude from processing.
    --outputDir         [OPTIONAL] Directory to write the generated stackql provider development documents to. (defaults to cwd)
    --overwrite         [OPTIONAL] Overwrite existing files. (defaults to false)
    --verbose           [OPTIONAL] Verbose output (defaults to false).
  `,
  //
  // dev usage
  //
  dev: `${banner2}
  Usage: 
    ${yellow('openapisaurus dev <apiDocDir> <flags>')}  

  Arguments:
    apiDocDir  [REQUIRED] Directory containing OpenAPI specifications documents used to create StackQL dev docs.

  Flags:
    --providerName      [REQUIRED] Name of the provider.
    --resDiscriminator  [OPTIONAL] JMESPath expression used to identify stackql resources from a providers OpenAPI spec. (defaults to path_tokens).
    --providerConfig    [OPTIONAL] Stringified JSON object, describing the config for a provider. (defaults to '{ "auth": { "type": "null_auth" }}').
    --operationIdKey    [OPTIONAL] JMESPath used to identify resource methods from a providers OpenAPI spec. (defaults to operationId).
    --overwrite         [OPTIONAL] Overwrite existing files. (defaults to false)
    --verbose           [OPTIONAL] Verbose output (defaults to false).
  `,
  //
  // build usage
  //
  build: `${banner2}
  Usage: 
    ${yellow('openapisaurus build <apiDocDir> <flags>')}

  Arguments:
    apiDocDir  [REQUIRED] Directory containing OpenAPI service specifications and StackQL dev docs.

  Flags:
    --providerName      [REQUIRED] Name of the provider.
    --outputDir         [REQUIRED] Output directory to write compiled docs to.
    --servers           [OPTIONAL] Stringified JSON array containing servers for the provider (overrides the servers list in the original OpenAPI spec).
    --overwrite         [OPTIONAL] Overwrite existing files. (defaults to false)
    --verbose           [OPTIONAL] Verbose output (defaults to false).
  `,
  //
  // format usage
  //
  format: `${banner2}
  Usage: 
    ${yellow('openapisaurus format <apiDoc> <outputFileName> <flags>')}

  Arguments:
    apiDoc  [REQUIRED] OpenAPI service specifications to format.
    outputFileName [REQUIRED] Output filename for formatted spec.

  Flags:
    --overwrite         [OPTIONAL] Overwrite existing files. (defaults to false)
    --verbose           [OPTIONAL] Verbose output (defaults to false).
  `,
};