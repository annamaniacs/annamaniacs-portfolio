import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/api";

export function useContent() {
  return useQuery({
    queryKey: ["content"],
    queryFn: async () => (await http.get("/content")).data,
    staleTime: Infinity,
  });
}
