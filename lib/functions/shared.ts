// deno-lint-ignore-file no-explicit-any
import { search } from "https://deno.land/x/jmespath@v0.2.2/index.ts";

// export function camelToSnake(inStr: string): string {

//   // Step 1: Replace hyphens with underscores and special characters with underscores
//   let processedStr = inStr.replace(/-/g, '_').replace(/[\(\)\$\%]/g, '_').replace(/^_+|_+$/g, '');

//   // Step 2: Handle consecutive uppercase letters (e.g., "EC2" becomes "Ec2")
//   processedStr = processedStr.replace(/([A-Z]+)([A-Z][a-z])/g, (match, p1, p2) => 
//       p1.charAt(0) + p1.slice(1).toLowerCase() + p2
//   );

//   // Step 3: Insert underscores before uppercase letters and convert them to lowercase
//   processedStr = processedStr.replace(/([A-Z])/g, (match, letter, offset) => 
//       (offset > 0 ? '_' : '') + letter.toLowerCase()
//   );

//   // Step 4: Replace multiple underscores with a single one and trim edges again
//   processedStr = processedStr.replace(/_{2,}/g, '_').replace(/^_+|_+$/g, '');

//   return processedStr;
// }

export function camelToSnake(inStr: string): string {

  // Step : Replace exceptions in the input string
  const exceptions = {
    "AuthN": "authn",
    "IdP": "idp",
  };

  // Replace exceptions in the input string
  Object.keys(exceptions).forEach(key => {
    inStr = inStr.replace(new RegExp(key, 'g'), exceptions[key]);
  });

  // Step 1: Replace hyphens with underscores and special characters with underscores
  let processedStr = inStr.replace(/-/g, '_').replace(/[\(\)\$\%]/g, '_').replace(/^_+|_+$/g, '');

  // Step 2: Insert underscore before a group of uppercase letters followed by a lowercase letter
  processedStr = processedStr.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2');

  // Step 3: Insert underscore before a lowercase letter followed by an uppercase letter
  processedStr = processedStr.replace(/([a-z])([A-Z])/g, '$1_$2');

  // Step 4: Lowercase the entire string
  processedStr = processedStr.toLowerCase();

  // Step 5: Replace multiple underscores with a single one and trim edges again
  processedStr = processedStr.replace(/_{2,}/g, '_').replace(/^_+|_+$/g, '');

  return processedStr;
}

export function isMeaningfulToken(token: string, excludeParams = true): boolean {
  if (excludeParams && token.startsWith('{')) {
    return false;
  } 
  if (token.match(/[v]\d/) || token.match(/^\d/) || token == 'rest' || token == 'api' || token.length == 0) {
    return false;
  } else {
    return true;
  }
}

export function getMeaningfulPathTokens(pathKey: string): string[] {
  const path = pathKey.replace(/\./g, '/').replace(/-/g, '_');
  const outTokens: string[] = [];
  const inTokens: string[] = path.split('/');
    
  inTokens.forEach((token: string) => {
    if (isMeaningfulToken(token)) {
      outTokens.push(token);
    }
  });

  return outTokens;
}

export function getAllValuesForKey(
  service: string,
  obj: any,
  key: string,
  excludeKeys: string[] = [],
  refs: any[] = []
): any[] {
  for (const k in obj) {
    if (typeof obj[k] === "object") {
      if (!excludeKeys.includes(k)) {
        getAllValuesForKey(service, obj[k], key, excludeKeys, refs);
      }
    } else {
      if (k === key) {
        refs.push({$ref: `${service}.yaml${obj[k]}`});
        // refs.push(obj[k].split('/').pop());
      }
    }
  }
  return refs;
}

export function convertLowerCaseToTitleCase(str: string): string {
  return str.replace(/\b([a-z])/g, function(_match: string, p1: string): string {
    return p1.toUpperCase();
  });
}

export function snakeToTitleCase(str: string): string {
  const words = str.split('_');
  const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return titleCase;
}

export function getAllPathTokens(pathKey: string): string[] {
  const path = pathKey.replace(/\./g, '/').replace(/-/g, '_');
  const outTokens: string[] = [];
  const inTokens = path.split('/');
  inTokens.forEach(token => {
    if (isMeaningfulToken(token, false)) {
      outTokens.push(token.replace(/{/, '_').replace(/}/, ''));
    }
  });
  return outTokens;
}

export function parseDSL(dsl: string, operation: any) {
  
  const [rawJmespaths, transformString] = dsl.split(' | ');
  const jmespaths = rawJmespaths.split(',').map(s => s.trim().replace(/"|'/g, '')); // Removing quotes and trimming spaces
  
  // Run searches for each JMESPath query
  const searchResults = jmespaths.map(jmespath => search(operation, jmespath));
  
  // Return the search results and the transform string
  return { searchResults, transformString };
}

function applyStringManipulation(inputs: string[], manipulationFnString: string): string {
  // Convert the string representation of the function into an actual function
  const manipulationFn = eval(`(${manipulationFnString})`);
  // Apply the function to the inputs
  // Ensure inputs is an array of the expected arguments for the manipulation function
  return manipulationFn(...inputs);
}

export function applyTransformations(inputs: string[], transformString: string): string {
  // Since the transformation function may expect multiple arguments,
  // ensure that inputs is an array of those arguments.
  return applyStringManipulation(inputs, transformString);
}

export function startsOrEndsWith(str: string, arr: string[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (str.startsWith(arr[i]) || str.endsWith(arr[i])) {
      return true;
    }
  }
  return false;
}

export function includes(str: string, arr: string[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (str.includes(arr[i])) {
      return true;
    }
  }
  return false;
}