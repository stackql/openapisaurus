import yaml
import csv
import argparse

def process_yaml_file(filename):
    # Load the YAML file
    with open(filename, "r") as f:
        data = yaml.safe_load(f)

    # Create a CSV file
    csv_filename = "output.csv"
    with open(csv_filename, "w", newline='') as csvfile:
        fieldnames = ['resource', 'opId', 'tokens', 'respSchema']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()

        # Iterate through each resource
        for resource, resource_data in data['components']['x-stackQL-resources'].items():
            for method, method_data in resource_data['methods'].items():
                # Initialize tokens and respSchema as None
                tokens = None
                respSchema = None
                
                # Look at select methods for tokens and respSchema
                select_methods = resource_data.get('sqlVerbs', {}).get('select', [])
                for select_method in select_methods:
                    if select_method.get('methodKey') == method_data['operation']['opId']:
                        tokens = select_method.get('tokens', None)
                        respSchema = select_method.get('respSchema', [])[0]['$ref'] if select_method.get('respSchema', []) else None
                        break

                writer.writerow({'opId': method_data['operation']['opId'], 'resource': resource, 'tokens': tokens, 'respSchema': respSchema})

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process a YAML file to extract specific data.')
    parser.add_argument('filename', type=str, help='The YAML file to process')

    args = parser.parse_args()
    process_yaml_file(args.filename)
