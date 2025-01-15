import axios from "axios"

const apiClient = axios.create({
  baseURL: "https://cms.storkmotion.com/services",
})

export default apiClient
