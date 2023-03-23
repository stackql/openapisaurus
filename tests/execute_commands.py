import subprocess
import json

# Set up the initial object to hold the results
result = {}

# Read in the list of commands from the input file
with open('tests/queries.sql') as f:
    commands = f.readlines()

# Loop over the commands and execute them using stackql
for command in commands:
    # Remove any trailing whitespace or newline characters
    command = command.strip()
    
    # print('Executing command: {}'.format(command))

    # Execute the command using stackql
    output = subprocess.check_output(['./stackql', 'exec', '--registry={\"url\": \"file:///mnt/c/LocalGitRepos/stackql/openapisaurus\", \"localDocRoot\": \"/mnt/c/LocalGitRepos/stackql/openapisaurus\", \"verifyConfig\": {\"nopVerify\": true} }', '--output=json', command])
    
    # print(output)

    # Parse the output as JSON
    try:
        json_output = json.loads(output)
    except ValueError:
        # If the output is not valid JSON, skip to the next command
        # continue
        json_output = []
    
    # Extract the provider, service, and resource from the original command
    provider, service, resource = command.split('DESCRIBE ')[1].split('.')[0:3]

    # print('Provider: {}'.format(provider))
    # print('Service: {}'.format(service))
    # print('Resource: {}'.format(resource))
    
    # Check if the output is a valid JSON object with a "name" field
    if isinstance(json_output, list) and len(json_output) == 1 and 'name' in json_output[0]:
        column_name = json_output[0]['name']
        
        # Check if the column name is "column_anon"
        if column_name == 'column_anon':
            object_key = '$'
        else:
            object_key = '$.result.{}'.format(column_name)
    else:
        object_key = '$'
    
    show_cmd = 'SHOW METHODS IN {}.{}'.format(provider + '.' + service, resource)

    # print('Executing command: {}'.format(show_cmd))

    # Get the list of methods for the resource
    methods_output = subprocess.check_output(['./stackql', 'exec', '--registry={\"url\": \"file:///mnt/c/LocalGitRepos/stackql/openapisaurus\", \"localDocRoot\": \"/mnt/c/LocalGitRepos/stackql/openapisaurus\", \"verifyConfig\": {\"nopVerify\": true} }', '--output=json', show_cmd])
    methods_json = json.loads(methods_output)
    
    # Loop over the methods and find the one with a SQLVerb of "SELECT"
    for method in methods_json:
        if method['SQLVerb'] == 'SELECT':
            method_name = method['MethodName']
            break
    else:
        # If no method with a SQLVerb of "SELECT" was found, skip to the next command
        continue
    
    # Add the method to the result object
    if provider not in result:
        result[provider] = {}
    if service not in result[provider]:
        result[provider][service] = {}
    if resource not in result[provider][service]:
        result[provider][service][resource] = {}
    result[provider][service][resource][method_name] = {'objectKey': object_key}

# Print the final result as a formatted JSON string
print(json.dumps(result, indent=4))
