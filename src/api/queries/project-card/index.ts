import apiClient from "@/api"
import { ProjectCardProps } from "@/lib/types"
import { useQuery } from "react-query"

// GET all project cards
async function all(service?: string | null) {
  const res = await apiClient.get("/projects.php", {
    params: {
      service,
    },
  })
  return res.data
}

export function useAll(service?: string | null) {
  return useQuery<ProjectCardProps[]>(["all-project-cards", service], () => all(service), {
    retry: 2,
  })
}
