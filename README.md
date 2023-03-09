# openapisaurus
> Command line utility to split OpenAPI documents into smaller, self contained, service oriented documents and prepare StackQL provider interfaces
> Command line utility to help developers prepare and submit StackQL provider specs, see [StackQL](https://github.com/stackql/stackql)

`openapisaurus` is implemented in TypeScript and designed to be run using the [`deno`](https://deno.land/) runtime.

## Installation



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
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--providerName`      *[REQUIRED]* Name of the provider.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--svcDiscriminator`  *[REQUIRED]* [JMESPath](https://jmespath.org/) expression to extract the service name from the OpenAPI spec.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--exclude`           *[OPTIONAL]* [JMESPath](https://jmespath.org/) expression for paths to exclude from processing.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--outputDir`         *[OPTIONAL]* Directory to write the generated stackql provider development documents to. (defaults to `cwd`)  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--overwrite`         *[OPTIONAL]* Overwrite existing files. (defaults to `false`)  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`--verbose`           *[OPTIONAL]* Verbose output (defaults to `false`).  

```javascript
import { search } from "https://deno.land/x/jmespath/index.ts";

search({foo: {bar: {baz: [0, 1, 2, 3, 4]}}}, "foo.bar.baz[2]")

// OUTPUTS: 2

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


## More Resources

The example above only show a small amount of what
a JMESPath expression can do. If you want to take a
tour of the language, the *best* place to go is the
[JMESPath Tutorial](http://jmespath.org/tutorial.html).

One of the best things about JMESPath is that it is
implemented in many different programming languages including
python, ruby, php, lua, etc.  To see a complete list of libraries,
check out the [JMESPath libraries page](http://jmespath.org/libraries.html).

And finally, the full JMESPath specification can be found
on the [JMESPath site](http://jmespath.org/specification.html).


## License

jmespath-ts is licensed under the Mozilla Public License Version 2.0
