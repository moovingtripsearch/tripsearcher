import '../../styles/Welcome.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';


export default function SearchFields({ tripType }) {
  const router = useRouter();

  const [showVehiclesField, setShowVehiclesField] = useState(false);
  const [showPriceField, setShowPriceField] = useState(false);
  const [showLuggageField, setShowLuggageField] = useState(false);


  const [query, setQuery] = useState({
    origin: '',
    destination: '',
    trip_type: '',// Default value, you might want to make this selectable
    geo_location: { lat: null, lon: null }
  });

  const [filters, setFilters] = useState({
    min_price: null,
    max_price: null,
    luggage_type: [],
    vehicle_type: '',
    number_of_seats: 0,
    agency_name: '',
    allow_origin_as_stop_point: false,
    allow_destination_as_stop_point: false,
    max_distance_from_station: null,
    date: '',
    time: ''
  });


  /* Information sent to backend */
  const handleSearch = async () => {
    const requestData = { query, filters };
    const params = new URLSearchParams();
    params.append('user_query', JSON.stringify(requestData.query));
    params.append('user_filter', JSON.stringify(requestData.filters));

    const baseUrl = 'http://localhost:8080/api/trip/search';
    const url = `${baseUrl}?${params.toString()}`;

    try {
      const response = await axios.get(url);
      console.log('Response:', response.data);
      // Navigate to the results page with the search results
      router.push({
        pathname: '/main',
        query: { data: JSON.stringify(response.data) }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setQuery(prevQuery => ({
          ...prevQuery,
          geo_location: { lat: latitude, lon: longitude }
        }));
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  /* Information sent to backend */


  const handleVehiclesFieldCheckbox = () => {
    setShowVehiclesField(!showVehiclesField);
  };

  const handlePriceFieldCheckbox = () => {
    setShowPriceField(!showPriceField);
  };

  const handleLuggageFieldCheckbox = () => {
    setShowLuggageField(!showLuggageField);
  };

  return (
    <div data-theme="light">
      <div className="rounded p-3 bg-cp" style={{ marginTop: '85%', width: 1000 }}>

        <form onSubmit={handleSubmit}>
          {/* Main data for search */}
          <MainSearch setQuery={setQuery} setFilters={setFilters} />

          {/* Filter fields */}
          <div className="d-flex align-items-center py-2 gap-4">

            {showPriceField && <PriceField filters={filters} setFilters={setFilters} />}

            {showLuggageField && <LuggageField filters={filters} setFilters={setFilters} />}

            {showVehiclesField && <VehiclesField filters={filters} setFilters={setFilters} />}

          </div>

          {/* footer items*/}
          <div className="d-flex align-items-center justify-content-between">
            <Footer
              handleVehiclesFieldCheckbox={handleVehiclesFieldCheckbox}
              handlePriceFieldCheckbox={handlePriceFieldCheckbox}
              handleLuggageFieldCheckbox={handleLuggageFieldCheckbox}
            />

            <button className="btn btn-dark fw-bold btn-lg inp-width inp-width-h" type='submit'>Search journey</button>

          </div>

        </form>
      </div>
    </div>
  )
}



export function MainSearch({ setQuery, setFilters }) {

  const handleTripType = (type) => {
    setQuery(prevQuery => ({ ...prevQuery, trip_type: type }));
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="form-check" style={{ marginRight: '10px' }}>
          <input
            className="form-check-input"
            type="radio"
            name="tripType"
            id="urbanTrip"
            onChange={() => handleTripType("intra")}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Urban Trip
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="tripType"
            id="urbanTrip"
            onChange={() => handleTripType("inter")}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Inter-urban Trip
          </label>
        </div>
      </div>

      <div className="d-flex align-items-center py-2" style={{ gap: "10%" }}>
        <div>
          <div style={{ display: "flex", gap: "5%" }}>
            <div>
              <label
                htmlFor="exampleDataList"
                className="form-label fw-bold fs-8 m-0"
              >
                From
              </label>
              <input
                className="form-control inp-width inp-height"
                list="datalistOptions"
                id="originInput"
                placeholder="City or quarter"
                onChange={(e) => setQuery(prevQuery => ({ ...prevQuery, origin: e.target.value }))}
              />

              <datalist id="datalistOptions">
                <option value="Polytechnique Yaounde"></option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="exampleDataList"
                className="form-label fw-bold fs-8 m-0"
              >
                To
              </label>
              <input
                className="form-control inp-width inp-height"
                list="datalistOptions"
                id="destinationInput"
                placeholder="City or quarter"
                onChange={(e) => setQuery(prevQuery => ({ ...prevQuery, destination: e.target.value }))}
              />
              <datalist id="datalistOptions">
                <option value="Polytechnique Yaounde"></option>
              </datalist>
            </div>
          </div>
          <div>
            <label
              htmlFor="exampleDataList"
              className="form-label fw-bold fs-8 m-0"
            >
              Number of passengers
            </label>
            <label className="input input-bordered flex items-center gap-2" style={{ width: "240px" }}>
              <input
                type="number"
                className="grow"
                list="datalistNumber"
                onChange={(e) => setFilters(prevFilter => ({ ...prevFilter, number_of_seats: parseInt(e.target.value) }))}
                style={{ width: "50px" }}
              />
              <span className="badge badge-info">Optional</span>
            </label>
            <datalist id="datalistNumber">
              <option value={1}></option>
              <option value={2}></option>
              <option value={3}></option>
              <option value={4}></option>
              <option value={5}></option>
            </datalist>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column mb-2">
            <label htmlFor="" className="fw-bold fs-8">
              Departure date
            </label>
            <input
              type="date"
              name=""
              id=""
              className="form-control date-input w-100"
              styles={{ borderRadius: '25px', width: '50%' }}
              onChange={(e) => setFilters(prevFilter => ({ ...prevFilter, date: e.target.value }))}
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="" className="fw-bold fs-8">
              Departure time
            </label>
            <input
              type="time"
              name=""
              id=""
              className="form-control time-input w-100"
              onChange={(e) => setFilters(prevFilter => ({ ...prevFilter, time: e.target.value }))}
            />
          </div>
        </div>

      </div>

    </>
  )
}


export function VehiclesField({ filters, setFilters }) {
  return (
    <div id="VehiclesField">
      <label htmlFor="exampleDataList" className="form-label fw-bold fs-8 m-0">
        Means of transport
      </label>
      <input
        className="form-control inp-width inp-height"
        list="datalistVehicle"
        id="vehicleData"
        placeholder="Vehicle"
        onChange={(e) => setFilters(prevFilter => ({ ...prevFilter, vehicle_type: e.target.value }))}
      />
      <datalist id="datalistVehicle">
        <option value="Personal Car"></option>
        <option value="Taxi"></option>
        <option value="Bike"></option>
        <option value="Bus"></option>
        <option value="Limouzine"></option>
      </datalist>
    </div>
  );
}

export function PriceField({ filters, setFilters }) {
  return (
    <div id="PriceField">
      <label htmlFor="minPriceData" className="form-label fw-bold fs-8 m-0">
        Min Price
      </label>
      <input
        className="form-control inp-width inp-height"
        id="minPriceData"
        placeholder="Min Price (FCFA)"
        type="number"
        onChange={(e) => setFilters(prevFilters => ({ ...prevFilters, min_price: parseFloat(e.target.value) }))}
      />
      <label htmlFor="maxPriceData" className="form-label fw-bold fs-8 m-0">
        Max Price
      </label>
      <input
        className="form-control inp-width inp-height"
        id="maxPriceData"
        placeholder="Max Price (FCFA)"
        type="number"
        onChange={(e) => setFilters(prevFilters => ({ ...prevFilters, max_price: parseFloat(e.target.value) }))}
      />
    </div>
  );
}

export function LuggageField({ filters, setFilters }) {
  const handleLuggageChange = (e) => {
    const { value, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      luggage_type: checked
        ? [...prevFilters.luggage_type, value]
        : prevFilters.luggage_type.filter(type => type !== value)
    }));
  };

  return (
    <div id="LuggageField">
      <label className="form-label fw-bold fs-8 m-0">Luggages</label>
      {["NORMAL", "ANIMALS", "FURNITURES", "ELECTRONICS", "OTHER"].map(type => (
        <div key={type} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={`luggage-${type}`}
            value={type}
            onChange={handleLuggageChange}
            checked={filters.luggage_type.includes(type)}
          />
          <label className="form-check-label" htmlFor={`luggage-${type}`}>
            {type}
          </label>
        </div>
      ))}
    </div>
  );
}

export function Footer({ handleVehiclesFieldCheckbox, handlePriceFieldCheckbox, handleLuggageFieldCheckbox }) {

  return (

    <div style={{ display: 'flex', gap: '20%' }}>
      <div className="p_filter">
        <p style={{ color: 'blue', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}>
          More fields
        </p>
      </div>

      <div className="form-check form-check-inline ms-S">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue=""
          id="flexCheckPrice"
          onClick={handlePriceFieldCheckbox}
        />
        <label className="form-check-label fw-bold fs-8" htmlFor="flexCheckPrice">
          Price
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue=""
          id="flexCheckLug"
          onClick={handleLuggageFieldCheckbox}
        />
        <label className="form-check-label fw-bold fs-8" htmlFor="flexCheckLug">
          Luggages
        </label>
      </div>

      <div className="form-check form-check-inline">
        <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckVehicles"
          onClick={handleVehiclesFieldCheckbox} />
        <label className="form-check-label fw-bold fs-8" htmlFor="flexCheckVehicles">
          vehicles
        </label>
      </div>
    </div>
  );
}