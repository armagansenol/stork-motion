import apiClient from "@/api"
import { ProjectCardProps } from "@/lib/types"
import { useQuery } from "react-query"

// GET all project cards
async function all(category?: string | null) {
  const res = await apiClient.get("/projects.php", {
    params: {
      category,
    },
  })
  return res.data
}

export function useAll(category?: string | null) {
  return useQuery<ProjectCardProps[]>(["all", category], () => all(category), {
    retry: 2,
  })
}
