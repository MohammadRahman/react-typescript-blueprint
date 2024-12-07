import { emailAccountApi } from "@apis/email-account";
import { useEmailData } from "@context/EmailAccountContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDelete() {
  const queryClient = useQueryClient();
  const { emailData, setEmailData } = useEmailData();

  const { mutate: deleteAccount, isPending: isLoading } = useMutation({
    mutationFn: async (id: string) => {
      const response = await emailAccountApi.deleteEmailAccount(id);
      console.log("id received", id);
      return response.data;
    },
    onSuccess: (_, id: string) => {
      if (emailData) {
        const updatedList = emailData?.list.filter(acc => acc.id != id);
        setEmailData({ ...emailData, list: updatedList });
      }
      queryClient.invalidateQueries({ queryKey: ["EmailAccount"] });
    },
  });
  return { deleteAccount, isLoading };
}
