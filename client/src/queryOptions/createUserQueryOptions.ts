import { queryOptions } from "@tanstack/react-query";

function createUserQueryOptions() {
  return queryOptions({
    queryKey: ["sign-up"],
    queryFn: () => console.log("getting Data"),
  });
}
