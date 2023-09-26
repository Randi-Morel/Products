import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Formik, Form } from "formik";
import UserInfo from "../../../screens/users/new-user/components/UserInfo";
import Address from "../../../screens/users/new-user/components/Address";
import Socials from "../../../screens/users/new-user/components/Socials";
import Profile from "../../../screens/users/new-user/components/Profile";
import validations from "../../../screens/users/new-user/schemas/validations";
import form from "../../../screens/users/new-user/schemas/form";
import initialValues from "../../../screens/users/new-user/schemas/initialValues";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { auth, firebase, firestore } from "../../../firebase";

function getSteps() {
  return ["User Info", "Address", "Social", "Profile"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    case 1:
      return <Address formData={formData} />;
    case 2:
      return <Socials formData={formData} />;
    case 3:
      return <Profile formData={formData} />;
    default:
      return null;
  }
}

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      const userRef = firestore().collection("users").doc(user.uid);
      let data = {
        firstName: values.firstName,
        lastName: values.lastName,
        id: user.uid,
        email: user.email,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        zip: values.zip,
        twitter: values.twitter,
        facebook: values.facebook,
        instagram: values.instagram,
      };
      await userRef.set(data, { merge: true });
      // navigate("/dashboards/analytics");
    } catch (e) {
      setLoading(false);
      window.alert("Error al iniciar session", e.message);
    }

    // actions.setSubmitting(false);
    // actions.resetForm();
    // setActiveStep(0);
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


  // TODO:hacer loading

  return (
    <CoverLayout image={bgImage}>
      <MDBox py={3} mt={-7} mb={0.5} height="65vh">
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "90%", mt: 0 }}>
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <MDBox mx={2} mt={-3}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={3}>
                      <MDBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        })}
                        <MDBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton variant="gradient" color="light" onClick={handleBack}>
                              back
                            </MDButton>
                          )}
                          <MDButton
                            disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            {isLastStep ? "send" : "next"}
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MDBox>
    </CoverLayout>
  );
}

