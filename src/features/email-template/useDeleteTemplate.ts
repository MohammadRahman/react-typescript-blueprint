import { templateApi } from "@apis/email-template";
import { showToast } from "@components/toast/Toast";
import { useTemplateData } from "@context/TemplateContext";
import { TemplatePayload } from "@interface/email";
import { useIsFetching, useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  const { template, setTemplateData } = useTemplateData();
  const isInvalidating = useIsFetching({ queryKey: ["Templates"] }) > 0;

  const { mutate: deleteTemplate, isPending: isDeleting } = useMutation({
    mutationFn: async (id: TemplatePayload["id"]) => {
      const response = await templateApi.deleteTemplate(id);
      return response;
    },
    onSuccess: (_, id: TemplatePayload["id"]) => {
      if (template) {
        const updatedList = template?.list.filter(acc => acc.id != id);
        setTemplateData({ ...template, list: updatedList });
      }
      showToast({ message: "Entry delete successful.", statusCode: 200, type: "warning" });
      queryClient.invalidateQueries({ queryKey: ["Templates"] });
    },
  });
  const isLoading = isDeleting || isInvalidating;
  return { deleteTemplate, isLoading };
};
