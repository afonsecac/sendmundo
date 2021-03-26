import * as Yup from "yup";

export const userLoginSchema = () =>
  Yup.object().shape({
    username: Yup.string().required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  });
