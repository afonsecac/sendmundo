import * as Yup from "yup";
import { Regex } from "utils/Regex";

export const recoverPasswordSchema = () =>
  Yup.object().shape({
    code: Yup.string().required("Campo requerido"),
    password: Yup.string()
      .required("Campo requerido")
      .min(8, "Debe tener 8 o mas caracteres")
      .matches(Regex.upperCase, {
        excludeEmptyString: true,
        message: "Debe tener un caracter en mayuscula",
      })
      .matches(Regex.lowerCase, {
        excludeEmptyString: true,
        message: "Debe tener un caracter en minuscula",
      })
      .matches(Regex.number, {
        excludeEmptyString: true,
        message: "Debe tener un caracter de tipo numero",
      })
      .matches(Regex.specialCharacter, {
        excludeEmptyString: true,
        message: "Debe tener un caracter especial",
      }),
    passwordConfirm: Yup.string()
      .required("Campo es requerida")
      .oneOf(
        [Yup.ref("password"), null],
        "La conformacion del password no concuarda con el password"
      ),
  });
