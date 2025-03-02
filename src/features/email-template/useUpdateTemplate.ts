import { templateApi } from "@apis/email-template";
import { showToast } from "@components/toast/Toast";
import { useTemplateData } from "@context/TemplateContext";
import { ErrorResponse } from "@interface/common";
import { TemplatePayload } from "@interface/email";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  const { setTemplateData } = useTemplateData();

  const { mutate: updateTemplate, isPending: isUpdating } = useMutation<
    TemplatePayload,
    AxiosError<ErrorResponse>,
    Partial<TemplatePayload>
  >({
    mutationKey: ["Templates"],
    mutationFn: async (data: Partial<TemplatePayload>) => {
      const response = await templateApi.updateTemplate(data);
      return response.data;
    },
    onSuccess: updatedAccount => {
      showToast({ message: "Update successful.", statusCode: 200, type: "success" });
      queryClient.invalidateQueries({ queryKey: ["Templates"] });

      setTemplateData(prevData => {
        if (!prevData) return null;

        const updatedList = prevData.list.map(ac =>
          ac.id === updatedAccount.id ? updatedAccount : ac
        );
        return {
          ...prevData,
          list: updatedList,
          totalCount: prevData.totalCount,
        };
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { updateTemplate, isUpdating };
}
