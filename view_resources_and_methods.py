import yaml
import csv
import sys

def extract_last_token(reference):
    # Split by '/' and take the last part, then split by '.' and take the last part
    return reference.split('/')[-1].split('.')[-1]

def generate_csv_from_yaml(yaml_file_path, csv_file_path):
    # Read the YAML file
    with open(yaml_file_path, 'r') as file:
        data = yaml.safe_load(file)

    # Open a new CSV file to write to
    with open(csv_file_path, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        
        # Write the header row
        csvwriter.writerow(['resourceId', 'sqlVerb', 'ref', 'path', 'operationId', 'respSchema'])
        
        # Navigate through the YAML content
        for resource_name, resource_content in data['components']['x-stackQL-resources'].items():
            resource_id = resource_content['id']
            # Loop through SQL verbs under each resource
            for sql_verb, verb_details in resource_content.get('sqlVerbs', {}).items():
                for verb_detail in verb_details:
                    # Extract the last part of $ref
                    ref = extract_last_token(verb_detail['$ref'])
                    # Extract the path
                    path = verb_detail['path']
                    # Extract the operationId
                    operation_id = verb_detail['operationId']
                    # Extract the last token of respSchema if it exists
                    resp_schema = ''
                    if 'respSchema' in verb_detail and verb_detail['respSchema']:
                        resp_schema = extract_last_token(verb_detail['respSchema'][0]['$ref'])

                    # Write to CSV
                    csvwriter.writerow([resource_id, sql_verb, ref, path, operation_id, resp_schema])

# Check for command-line arguments
if len(sys.argv) < 3:
    print("Usage: python view_resources_and_methods.py inputproviderdevfile outputcsvfile")
else:
    yaml_file_path = sys.argv[1]
    csv_file_path = sys.argv[2]
    generate_csv_from_yaml(yaml_file_path, csv_file_path)
