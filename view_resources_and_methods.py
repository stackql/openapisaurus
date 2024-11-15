import yaml, csv, sys, os

def extract_last_token(reference):
    # Split by '/' and take the last part, then split by '.' and take the last part
    return reference.split('/')[-1].split('.')[-1]

def generate_csv_from_yaml(yaml_file_path, csv_file_path, header_row):
    # Read the YAML file
    with open(yaml_file_path, 'r') as file:
        data = yaml.safe_load(file)

    # Check if the CSV file already exists
    file_exists = os.path.isfile(csv_file_path)

    # Open the CSV file in append mode if it exists, otherwise create a new one
    with open(csv_file_path, 'a' if file_exists else 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        
        if header_row:
            # Write the header row
            csvwriter.writerow(['resourceId', 'sqlVerb', 'ref', 'path', 'tokens', 'operationId', 'methodName', 'schemaRef', 'mediaType', 'objectKey'])

        # Navigate through the YAML content
        for resource_name, resource_content in data['components']['x-stackQL-resources'].items():
            resource_id = resource_content['id']
            print('processing ' + resource_id)

            methods_mapped_to_sqlVerbs = []
            for verb_obj in data['components']['x-stackQL-resources'][resource_name]['sqlVerbs']['select']:
                methods_mapped_to_sqlVerbs.append(extract_last_token(verb_obj['$ref']))
            
            for verb_obj in data['components']['x-stackQL-resources'][resource_name]['sqlVerbs']['insert']:
                methods_mapped_to_sqlVerbs.append(extract_last_token(verb_obj['$ref']))

            for verb_obj in data['components']['x-stackQL-resources'][resource_name]['sqlVerbs']['update']:
                methods_mapped_to_sqlVerbs.append(extract_last_token(verb_obj['$ref']))

            for verb_obj in data['components']['x-stackQL-resources'][resource_name]['sqlVerbs']['replace']:
                methods_mapped_to_sqlVerbs.append(extract_last_token(verb_obj['$ref']))

            for verb_obj in data['components']['x-stackQL-resources'][resource_name]['sqlVerbs']['delete']:
                methods_mapped_to_sqlVerbs.append(extract_last_token(verb_obj['$ref']))

            # find all methods not mapped to sqlVerbs
            for method_name, method_content in data['components']['x-stackQL-resources'][resource_name]['methods'].items():
                if method_name not in methods_mapped_to_sqlVerbs:
                    print('processing ' + method_name)
                    # Extract the last part of $ref
                    ref = ''
                    # Extract the path
                    path = method_content['operation']['$ref']
                    # Extract the tokens
                    tokens = ''
                    # Extract the operationId
                    operation_id = method_content['operation']['operationId']
                    # get schemaRef
                    if 'schemaRef' in method_content['response']:
                        schema_ref = method_content['response']['schemaRef']
                    else:
                        schema_ref = ''
                    # get mediaType                          
                    if 'mediaType' in method_content['response']:                        
                        media_type = method_content['response']['mediaType']
                    else:
                        media_type = ''
                    # get objectKey 
                    if 'objectKey' in method_content['response']:                         
                        object_key = method_content['response']['objectKey']
                    else:
                        object_key = ''
                    # Write to CSV
                    csvwriter.writerow([resource_id, 'exec', ref, path, tokens, operation_id, method_name, schema_ref, media_type, object_key])

            # Loop through SQL verbs under each resource
            for sql_verb, verb_details in resource_content.get('sqlVerbs', {}).items():
                for verb_detail in verb_details:
                    # Extract the last part of $ref
                    ref = extract_last_token(verb_detail['$ref'])
                    # Extract the path
                    path = verb_detail['path']
                    # Extract the tokens
                    tokens = verb_detail['tokens']
                    # Extract the operationId
                    operation_id = verb_detail['operationId']
                    # get the last token of verb_detail['$ref']
                    method_name = extract_last_token(verb_detail['$ref'])
                    # get schemaRef
                    if 'schemaRef' in resource_content['methods'][method_name]['response']:
                        schema_ref = resource_content['methods'][method_name]['response']['schemaRef']
                    else:
                        schema_ref = ''
                    # get mediaType                          
                    if 'mediaType' in resource_content['methods'][method_name]['response']:                        
                        media_type = resource_content['methods'][method_name]['response']['mediaType']
                    else:
                        media_type = ''
                    # get objectKey 
                    if 'objectKey' in resource_content['methods'][method_name]['response']:                         
                        object_key = resource_content['methods'][method_name]['response']['objectKey']
                    else:
                        object_key = ''
                    # Write to CSV
                    csvwriter.writerow([resource_id, sql_verb, ref, path, tokens, operation_id, method_name, schema_ref, media_type, object_key])

# Check for command-line arguments
if len(sys.argv) < 3:
    print("Usage: python3 view_resources_and_methods.py inputproviderdevfile outputcsvfile")
else:
    yaml_file_path = sys.argv[1]
    csv_file_path = sys.argv[2]
    header_row = sys.argv[3] if len(sys.argv) > 3 else False
    generate_csv_from_yaml(yaml_file_path, csv_file_path, header_row)
