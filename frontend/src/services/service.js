import axios from 'axios'; 

const REST_API_HOME_SEARCH = ``

const REST_API_MAINPAGE_SEARCH = ``

const REST_API_GET_TRIPS = `http://localhost:8090/api/trip/search?user_query=${JSON.stringify(requestData)}`

// Sending  a request to backend to get trips
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.get(REST_API_GET_TRIPS, {
      params: formData
    });
    console.log('Search Results:', response.data);
  } catch (error) {
    console.error('Error fetching search results', error);
  }
};

// Creating a new trip to the backend using Axios
export const homeSearch = (dataForm) =>  axios
                .post(REST_API_HOME_SEARCH, dataForm)
                .then((response) => {
                // Handle the response from the backend
                console.log(response.data);
                })
                .catch((error) => {
                // Handle the error
                console.error(error);
                });



export const geolocateAndFillOrigin = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Update geo_location in the query state
        setQuery(prevQuery => ({
          ...prevQuery,
          geo_location: { lat: latitude, lon: longitude }
        }));

        try {
          // Use Nominatim for reverse geocoding
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          if (response.data && response.data.display_name) {
            // Extract city or a suitable place name from the response
            const placeName = response.data.address.city || 
                              response.data.address.town || 
                              response.data.address.village || 
                              response.data.display_name.split(',')[0];

            // Update the origin in the query state
            setQuery(prevQuery => ({
              ...prevQuery,
              origin: placeName
            }));

            // Also update the input field
            const originInput = document.getElementById('originInput');
            if (originInput) {
              originInput.value = placeName;
            }
          }
        } catch (error) {
          console.error('Error in reverse geocoding:', error);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};


