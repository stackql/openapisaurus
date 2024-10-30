# PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
# export REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'

import subprocess
import json
import csv
import os
import sys

def execute_stackql_command(registry, query):
    # Runs the stackql command and returns the JSON output
    command = f'./stackql exec --registry="{registry}" --output json "{query}"'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error executing command: {result.stderr}")
        sys.exit(1)
    return json.loads(result.stdout)

def main(registry):
    # Define output file
    output_file = 'confluent_methods.csv'
    
    # Open CSV file to write results
    with open(output_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Service', 'Resource', 'MethodName', 'RequiredParams', 'SQLVerb'])

        # Get all services in the confluent provider
        services = execute_stackql_command(registry, 'show services in confluent')
        
        for service in services:
            service_name = service['name']
            service_id = service['id']
            print(f"Processing service: {service_name}")

            # Get resources for each service
            resources = execute_stackql_command(registry, f"show resources in confluent.{service_name}")
            
            for resource in resources:
                resource_name = resource['name']
                print(f"Processing resource: {resource_name}")

                # Get methods for each resource
                if resource_name.startswith("vw_"):
                    print(f"Skipping view {resource_name}")
                    continue
                methods = execute_stackql_command(registry, f"show methods in confluent.{service_name}.{resource_name}")

                for method in methods:
                    # Write method details to CSV
                    writer.writerow([
                        service_name,
                        resource_name,
                        method.get("MethodName", ""),
                        method.get("RequiredParams", ""),
                        method.get("SQLVerb", "")
                    ])
                    print(f"Method {method.get('MethodName')} added to CSV.")

    print(f"Data saved to {output_file}")

if __name__ == "__main__":
    # Retrieve REG_STR from environment variables
    registry = os.getenv('REG_STR')
    if not registry:
        print("Error: REG_STR environment variable is not set.")
        sys.exit(1)
    
    main(registry)
