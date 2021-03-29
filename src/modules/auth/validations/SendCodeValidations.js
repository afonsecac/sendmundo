import * as Yup from "yup";

export const sendCodeSchema = () =>
  Yup.object().shape({
    usernameOrEmail: Yup.string().required("Campo requerido"),
  });
