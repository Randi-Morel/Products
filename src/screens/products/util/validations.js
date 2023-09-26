import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { name, description, price },
} = checkout;

const validations = [
  Yup.object().shape({
    [name.name]: Yup.string().min(3, name.minMsg).required(name.errorMsg),
    [description.name]: Yup.string().min(10, description.minMsg).required(description.errorMsg),
    [price.name]: Yup.number().min(1, price.minMsg).required(price.errorMsg),
  }),
];

export default validations;
