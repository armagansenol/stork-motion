import apiClient from "@/api"
import { ServiceProps } from "@/lib/types"
import { useQuery } from "react-query"

// GET all services
async function all(category?: string | null) {
  const res = await apiClient.get("/services.php", {
    params: {
      category,
    },
  })
  return res.data
}

export function useAll(service?: string | null) {
  return useQuery<ServiceProps[]>(["all", service], () => all(service), {
    retry: 2,
  })
}
