import json
from datetime import datetime, timedelta
import random

# Function to read JSON data from a file
def read_json(file_name):
    with open(file_name, 'r', encoding='utf-8') as f:
        return json.load(f)

# Function to generate random datetime within a range
def random_datetime(start, end):
    return start + timedelta(seconds=random.randint(0, int((end - start).total_seconds())))

# Load data from JSON files
points = read_json('points.json')
vehicles = read_json('vehicle.json')
stations = read_json('stations.json')
agencies = read_json('agency.json')

# Generate trips
trips = []

for i in range(1000):  # Generate 1000 trips (adjust as needed)
    trip_id = i + 1
    departure_date = random_datetime(datetime.now(), datetime.now() + timedelta(days=365))  # Random date within next year
    departure_time = random_datetime(datetime.now(), datetime.now() + timedelta(days=1))  # Random time within next day
    price = random.randint(1000, 10000)
    vehicle = random.choice(vehicles)
    agency = random.choice(agencies)
    station = random.choice(stations)
    origin = random.choice(points)
    destination = random.choice(points)
    stop_points = random.sample(points, k=random.randint(0, 6))  # Randomly choose up to 5 stop points
    trip_type = random.choice(['inter', 'inter'])
    standing = random.choice(['classic', 'vip'])
    number_of_passengers = random.randint(1, vehicle['number_of_seats'])
    number_of_reservations = random.randint(0, number_of_passengers)
    latest_reservation_date = random_datetime(datetime.now(), departure_date)

    luggage_types = ['normal', 'animals', 'furnitures', 'electronics', 'other']
    luggage_type = random.sample(luggage_types, k=random.randint(0, 5))  # Randomly choose up to 5 stop points


    trip = {
        'trip_id': trip_id,
        'departure_date': departure_date.strftime('%Y-%m-%dT%H:%M:%S'),
        'departure_time': departure_time.strftime('%Y-%m-%dT%H:%M:%S'),
        'price': price,
        'vehicle': vehicle,
        'agency': agency,
        'station': station,
        'origin': origin,
        'destination': destination,
        'stop_points': stop_points,
        'trip_type': trip_type,
        'number_of_passengers': number_of_passengers,
        'number_of_reservations': number_of_reservations,
        'latest_reservation_date': latest_reservation_date.strftime('%Y-%m-%dT%H:%M:%S'),
        'luggage_types': luggage_type,
        'standing': standing
    }

    trips.append(trip)

# Write generated trips to a JSON file
with open('generated_trips.json', 'w', encoding='utf-8') as f:
    json.dump(trips, f, ensure_ascii=False, indent=2)

print(f'Generated {len(trips)} trips. Check generated_trips.json')
