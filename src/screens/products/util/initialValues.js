import checkout from "./form";

const {
  formField: { name, description, price },
} = checkout;

const initialValues = {
  [name.name]: "",
  [description.name]: "",
  [price.name]: "",
};

export default initialValues;
