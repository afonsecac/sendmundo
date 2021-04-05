import * as Yup from "yup";

export const createContactSchema = () =>
  Yup.object().shape({
    name: Yup.string().required("Campo requerido"),
    contactInfo: Yup.object().shape({
      phone: Yup.string().required("Campo requerido"),
      nautaEmail: Yup.string().email("Campo invalido"),
    }),
  });
