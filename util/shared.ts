
export function camelToSnake(inStr: string): string {

    const prepStr = inStr.replace(/([A-Z])([A-Z]+)/g, function(match: any, first: any, rest: string) {
      return first + rest.toLowerCase();
    });

    let str = prepStr.replace(/\s+/g, '').replace(/-/g, '_');

    return str.replace(/\.?([A-Z])/g, function(x: string, y: string) {
        return "_" + y.toLowerCase();
    }).replace(/^_/, "").replace(/_{2,}/g, "_");
}

export function isMeaningfulToken(token: string, excludeParams: boolean = true): boolean {
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
    let path = pathKey.replace(/\./g, '/').replace(/-/g, '_');
    let outTokens: string[] = [];
    let inTokens: string[] = path.split('/');
    
    inTokens.forEach((token: string) => {
      if (isMeaningfulToken(token)) {
        outTokens.push(token);
      }
    });
  
    return outTokens;
}

export function getAllValuesForKey(
    obj: any,
    key: string,
    excludeKeys: string[] = [],
    refs: string[] = []
  ): string[] {
    for (let k in obj) {
      if (typeof obj[k] === "object") {
        if (!excludeKeys.includes(k)) {
          getAllValuesForKey(obj[k], key, excludeKeys, refs);
        }
      } else {
        if (k === key) {
          refs.push(obj[k].split('/').pop());
        }
      }
    }
    return refs;
}

export function convertLowerCaseToTitleCase(str) {
  return str.replace(/\b([a-z])/g, function(match, p1) {
    return p1.toUpperCase();
  });
}

export function snakeToTitleCase(str: string): string {
  let words = str.split('_');
  let titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return titleCase;
}

export function getAllPathTokens(pathKey: string): string[] {
  let path = pathKey.replace(/\./g, '/').replace(/-/g, '_');
  let outTokens: string[] = [];
  let inTokens = path.split('/');
  inTokens.forEach(token => {
    if (isMeaningfulToken(token, false)) {
      outTokens.push(token.replace(/{/, '_').replace(/}/, ''));
    }
  });
  return outTokens;
}