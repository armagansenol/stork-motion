import apiClient from "@/api"
import { ProjectProps } from "@/lib/types"
import { useQuery } from "react-query"

// GET project detail
async function single(projectName: string) {
  const res = await apiClient.get("/projectDetail.php", {
    params: { url: projectName },
  })
  return res.data
}

export function useSingle(projectName: string) {
  return useQuery<ProjectProps>(["single", projectName], () => single(projectName), {
    retry: 2,
  })
}
