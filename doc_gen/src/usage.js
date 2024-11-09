import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {},
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
  providerName: args._[0] || false,
 };
}

export {
  parseArgumentsIntoOptions,
}
