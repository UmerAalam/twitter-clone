import { useMutation } from "@tanstack/react-query";
import { client } from "../../lib/client";
import { UpdatedUser } from "../../types/auth";

export const useUpdateUserData = () =>
  useMutation({
    mutationFn: async (user: UpdatedUser) => {
      const res = await client.api.auth["me"].$patch({ json: user });
      if (!res.ok) {
        throw new Error("Unable to update data");
      }
      return res.json();
    },
    onSuccess: () => {},
  });
