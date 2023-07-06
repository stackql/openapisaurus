// deno-lint-ignore-file no-explicit-any

export function camelToSnake(inStr: string): string {

    const prepStr = inStr.replace(/([A-Z])([A-Z]+)/g, function(_match: any, first: any, rest: string) {
      return first + rest.toLowerCase();
    });

    const str = prepStr.replace(/\s+/g, '').replace(/-/g, '_');

    return str.replace(/\.?([A-Z])/g, function(_x: string, y: string) {
        return "_" + y.toLowerCase();
    }).replace(/^_/, "").replace(/_{2,}/g, "_");
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