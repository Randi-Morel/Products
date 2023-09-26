import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import ProductInfo from "./components/ProductInfo";
import Media from "./components/Media";
import Pricing from "./components/Pricing";
import Socials from "./components/Socials";
import { form, initialValues, validations } from "../util";
import { Form, Formik } from "formik";
import { firestore } from "../../../firebase";

function getSteps() {
  return ["1. Product Info", "2. Media", "3. Pricing"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo formData={formData} />;
    case 1:
      return <Media formData={formData} />;
    case 2:
      return <Pricing formData={formData} />;
    default:
      return null;
  }
}

function NewProduct() {
  const [loading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;
  const currentValidation = validations[activeStep];

  const { formId, formField } = form;

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = (values, actions) => {
    setLoading(true);
    firestore()
      .collection("products")
      .add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        name: values.name,
        description: values.description,
        price: values.price,
      })
      .then(() => {
        actions.resetForm();
        setActiveStep(0);
        //   Exito
      })
      .catch()
      // Error
      .finally(() => {
        actions.setSubmitting(false);
        setLoading(false);
      });
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={9}>
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form id={formId} autoComplete="off">
              <Grid container justifyContent="center">
                <Grid item xs={12} lg={8}>
                  <MDBox mt={6} mb={8} textAlign="center">
                    <MDBox mb={1}>
                      <MDTypography variant="h3" fontWeight="bold">
                        Add New Product
                      </MDTypography>
                    </MDBox>
                    <MDTypography variant="h5" fontWeight="regular" color="secondary">
                      This information will describe more about the product.
                    </MDTypography>
                  </MDBox>
                  <Card>
                    <MDBox mt={-3} mb={3} mx={2}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={2}>
                      <MDBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        })}
                        <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton variant="gradient" color="light" onClick={handleBack}>
                              back
                            </MDButton>
                          )}
                          <MDButton
                            disabled={isSubmitting}
                            variant="gradient"
                            color="dark"
                            type="submit"
                          >
                            {isLastStep ? "send" : "next"}
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </MDBox>
    </DashboardLayout>
  );
}

export default NewProduct;
