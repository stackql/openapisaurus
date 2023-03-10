# openapisaurus

> Command line utility to split OpenAPI documents into smaller, self contained, service oriented documents and prepare StackQL provider interfaces
> Command line utility to help developers prepare and submit StackQL provider specs, see [StackQL](https://github.com/stackql/stackql)

`openapisaurus` is implemented in TypeScript and designed to be run using the [`deno`](https://deno.land/) runtime.

## Installation

1. Install Deno by following the instructions at [deno.land](https://deno.land/).
2. Download the `openapisaurus` script by running the following command:
```
curl -o openapisaurus https://raw.githubusercontent.com/<username>/<repository>/main/app.ts
```
Replace `<username>` and `<repository>` with your GitHub username and the name of your repository, respectively.
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

#### Example

```bash
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

In the example we gave the `search` function input data of
`{foo: {bar: {baz: [0, 1, 2, 3, 4]}}}` as well as the JMESPath
expression `foo.bar.baz[2]`, and the `search` function evaluated
the expression against the input data to produce the result `2`.

The JMESPath language can do *a lot* more than select an element
from a list.  Here are a few more examples:

```javascript
import { search } from "https://deno.land/x/jmespath/index.ts";

/* --- EXAMPLE 1 --- */

let JSON_DOCUMENT = {
  foo: {
    bar: {
      baz: [0, 1, 2, 3, 4]
    }
  }
};

search(JSON_DOCUMENT, "foo.bar");
// OUTPUTS: { baz: [ 0, 1, 2, 3, 4 ] }


/* --- EXAMPLE 2 --- */

JSON_DOCUMENT = {
  "foo": [
    {"first": "a", "last": "b"},
    {"first": "c", "last": "d"}
  ]
};

search(JSON_DOCUMENT, "foo[*].first")
// OUTPUTS: [ 'a', 'c' ]


/* --- EXAMPLE 3 --- */

JSON_DOCUMENT = {
  "foo": [
    {"age": 20},
    {"age": 25},
    {"age": 30},
    {"age": 35},
    {"age": 40}
  ]
}

search(JSON_DOCUMENT, "foo[?age > `30`]");
// OUTPUTS: [ { age: 35 }, { age: 40 } ]
```


### `registerFunction(functionName: string, customFunction: RuntimeFunction, signature: InputSignature[]): void`

Extend the list of built in JMESpath expressions with your own functions.

```javascript
  import {search, registerFunction, TYPE_NUMBER} from "https://deno.land/x/jmespath/index.ts";


  search({ foo: 60, bar: 10 }, 'divide(foo, bar)')
  // THROWS ERROR: Error: Unknown function: divide()

  registerFunction(
    'divide', // FUNCTION NAME
    (resolvedArgs) => {   // CUSTOM FUNCTION
      const [dividend, divisor] = resolvedArgs;
      return dividend / divisor;
    },
    [{ types: [TYPE_NUMBER] }, { types: [TYPE_NUMBER] }] //SIGNATURE
  );

  search({ foo: 60,bar: 10 }, 'divide(foo, bar)');
  // OUTPUTS: 6

```

### `compile(expression: string): ASTNode`

You can precompile all your expressions ready for use later on. the `compile`
function takes a JMESPath expression and returns an abstract syntax tree that
can be used by the TreeInterpreter function

```javascript
import { compile, TreeInterpreter } from "https://deno.land/x/jmespath/index.ts";

const ast = compile('foo.bar');

TreeInterpreter.search(ast, {foo: {bar: 'BAZ'}})
// RETURNS: "BAZ"

```

## Local Development

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
```
chmod +x openapisaurus
```

```
./openapisaurus split \
../../local-registry/ref/fivetran/swagger.json \
--providerName=fivetran \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite \
--verbose
```

```
./openapisaurus dev \
dev \
--providerName=fivetran \
--resdiscriminator='["tags"][0]' \
--overwrite \
--verbose
```


If you have any issues with `openapisaurus`, please report them at [the issue tracker](https://github.com/<username>/<repository>/issues).

## License

This project is licensed under the [MIT License](LICENSE).
