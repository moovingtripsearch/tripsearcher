// Send the request data to the backend using Axios
      axios
        .get(`http://localhost:8090/api/trip/search?user_query=${JSON.stringify(requestData)}`)
        .then((response) => {
          // Handle the response from the backend
          console.log(response.data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });