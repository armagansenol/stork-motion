import apiClient from "@/api"
import { ProjectCardProps } from "@/lib/types"
import { useQuery } from "react-query"

// GET all selected project cards
async function all() {
  const res = await apiClient.get("/homeProjects.php")
  return res.data
}

export function useAll() {
  return useQuery<ProjectCardProps[]>(["all"], () => all(), {
    retry: 2,
  })
}
