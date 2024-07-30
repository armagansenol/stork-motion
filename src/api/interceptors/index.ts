import apiClient from ".."

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can modify the request configuration here
    return config
  },
  (error) => {
    // Handle request errors here
    console.error("An error occured when requesting data!")
    return Promise.reject(error)
  }
)

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      // The server responded with a status code other than 2xx
      console.error("HTTP error", error.response.status, error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received", error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Request error", error.message)
    }
    return Promise.reject(error)
  }
)
