import * as Yup from "yup";

export const userConfirmSchema = () =>
  Yup.object().shape({
    code: Yup.string().required("Campo requerido"),
  });
