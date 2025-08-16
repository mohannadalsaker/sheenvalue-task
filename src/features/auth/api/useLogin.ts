import { post } from "@/api/mutator";
import { useMutation } from "@tanstack/react-query";
import type { LoginFormFields } from "../validation/LoginFormSchema";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

const baseUrl = "https://reqres.in/api";

export const useLogin = ({
  onSuccess,
}: {
  onSuccess?: (res: { token: string }) => void;
}) => {
  const mutation = useMutation<
    { token: string },
    AxiosError<{ error: string }>,
    LoginFormFields
  >({
    mutationFn: (data: LoginFormFields) =>
      post<{ token: string }>(`${baseUrl}/login`, data, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
      }),
    onSuccess: (res) => {
      toast.success("Login success");
      onSuccess?.(res);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data.error || "There has been an error logging in"
      );
    },
  });
  return mutation;
};
