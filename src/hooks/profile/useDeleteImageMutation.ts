import { useMutation, useQueryClient } from "react-query";
import { TUser } from "~/apis";

const getUserImage = async (currentUser: TUser) => {
  if (!currentUser || !currentUser) return;
  await currentUser.updateProfile({ photoURL: "" });
};

export const useDeleteImageMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(getUserImage, {
    onSuccess: () => {
      queryClient.setQueryData(["userImageUrl"], null);
    },
  });

  return { mutation };
};
