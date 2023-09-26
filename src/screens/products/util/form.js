const form = {
  formId: "product-form",
  formField: {
    name: {
      name: "name",
      label: "Name",
      type: "text",
      minMsg: "Product must contain at least 3 characters",
      errorMsg: "Name is required.",
    },
    price: {
      name: "price",
      label: "Price",
      type: "text",
      minMsg: "You must add a number",
      errorMsg: "Price is required.",
    },
    description: {
      name: "description",
      label: "Description",
      type: "text",
      minMsg: "The description should be longer",
      errorMsg: "Description is required.",
    },
  },
};

export default form;
