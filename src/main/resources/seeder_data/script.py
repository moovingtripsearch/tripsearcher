import json

# Function to load JSON data from file and extract ids
def extract_ids(input_file, output_file):
    with open(input_file, 'r') as f:
        data = json.load(f)

    ids = [entry['id'] for entry in data]

    with open(output_file, 'w') as f:
        f.write(','.join(map(str, ids)))

# Example usage
if __name__ == "__main__":
    input_file = 'stations.json'  # Replace with your JSON file path
    output_file = 'stations-ids.txt'      # Replace with your output file path

    extract_ids(input_file, output_file)
    print(f"IDs extracted from '{input_file}' and saved to '{output_file}'.")
