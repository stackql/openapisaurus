// deno-lint-ignore-file no-explicit-any

export function camelToSnake(inStr: string): string {

  // Step 1: Replace hyphens with underscores and special characters with underscores
  let processedStr = inStr.replace(/-/g, '_').replace(/[\(\)\$\%]/g, '_').replace(/^_+|_+$/g, '');

  // Step 2: Handle consecutive uppercase letters (e.g., "EC2" becomes "Ec2")
  processedStr = processedStr.replace(/([A-Z]+)([A-Z][a-z])/g, (match, p1, p2) => 
      p1.charAt(0) + p1.slice(1).toLowerCase() + p2
  );

  // Step 3: Insert underscores before uppercase letters and convert them to lowercase
  processedStr = processedStr.replace(/([A-Z])/g, (match, letter, offset) => 
      (offset > 0 ? '_' : '') + letter.toLowerCase()
  );

  // Step 4: Replace multiple underscores with a single one and trim edges again
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

export function parseDSL(dsl: string): { jmespath: string, transforms: string[] } {
  const parts = dsl.split(' | ');
  return { 
      jmespath: parts[0], 
      transforms: parts.slice(1) 
  };
}

function applyStringManipulation(input: string, manipulationFnString: string): string {
  const manipulationFn = eval(manipulationFnString);
  return manipulationFn(input);
}

export function applyTransformations(input: string, transforms: string[]): string {
  return transforms.reduce((result, transformString) => {
      // Apply each transform string as an anonymous function to the result
      return applyStringManipulation(result, transformString);
  }, input);
}

