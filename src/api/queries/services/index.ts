import apiClient from "@/api"
import { ServiceProps } from "@/lib/types"
import { useQuery } from "react-query"

// GET all services
async function all() {
  const res = await apiClient.get("/services.php", {})
  return res.data
}

export function useAll() {
  return useQuery<ServiceProps[]>(["all-services"], () => all(), {
    retry: 2,
  })
}
