# python3 extract_openapi.py /mnt/c/LocalGitRepos/stackql/openapi-conversion/openapisaurus/dev/confluent/v00.00.00000/services

import os
import yaml
import csv

def extract_openapi_details(yaml_dir):
    output_file = 'output.csv'
    with open(output_file, 'w', newline='') as csvfile:
        fieldnames = ['service', 'operationId', 'path', 'verb', 'tags', 'summary']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for root, _, files in os.walk(yaml_dir):
            for file in files:
                if file.endswith('.yaml') and not file.endswith('-resources.yaml'):
                    service_name = file.rsplit('.', 1)[0]
                    yaml_path = os.path.join(root, file)
                    
                    with open(yaml_path, 'r') as f:
                        try:
                            openapi_spec = yaml.safe_load(f)
                        except yaml.YAMLError as exc:
                            print(f"Error parsing {yaml_path}: {exc}")
                            continue
                    
                    paths = openapi_spec.get('paths', {})
                    for path, path_item in paths.items():
                        for verb, operation in path_item.items():
                            if verb not in ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']:
                                continue
                            
                            operation_id = operation.get('operationId', '')
                            tags = operation.get('tags', [])
                            tags_str = '|'.join(tags)
                            summary = operation.get('summary', '')
                            
                            writer.writerow({
                                'service': service_name,
                                'operationId': operation_id,
                                'path': path,
                                'verb': verb,
                                'tags': tags_str,
                                'summary': summary
                            })

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Extract OpenAPI details from YAML files.')
    parser.add_argument('yaml_dir', type=str, help='Directory containing YAML files')
    args = parser.parse_args()
    
    extract_openapi_details(args.yaml_dir)
