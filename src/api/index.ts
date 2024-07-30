import axios from "axios"

const apiClient = axios.create({
  baseURL: "https://cms.luckluckstudio.com/services",
})

export default apiClient
