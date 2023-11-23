import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import DashboardLayout from "../../../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../../../examples/Navbars/DashboardNavbar";
import ProductInfo from "./../../../components/ProductInfo";
import Media from "./../../../components/Media";
import Pricing from "./../../../components/Pricing";
import { form, initialValues, validations } from "../../../../util";
import { Form, Formik, useFormik, useField } from "formik";
import { firestore } from "../../../../../../firebase";
import FormField from "../../../../../../components/custom/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "../../../../../../components/MDInput";

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
                            <MDBox>
                                <MDTypography variant="h5">Product Information</MDTypography>
                                <MDBox mt={3}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <FormField
                                                type={name.type}
                                                label={name.label}
                                                name={name.name}
                                                value={nameV}
                                                placeholder={name.placeholder}
                                                error={errors.name && touched.name}
                                                success={nameV.length > 0 && !errors.name}
                                            />
                                        </Grid>
                                    </Grid>
                                </MDBox>

                                <MDBox mt={2}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <MDBox mb={3}>
                                                <MDBox mb={2} display="inline-block">
                                                    <MDTypography
                                                        component="label"
                                                        variant="button"
                                                        fontWeight="regular"
                                                        color="text"
                                                        textTransform="capitalize"
                                                    >
                                                        Category
                                                    </MDTypography>
                                                </MDBox>
                                                <Autocomplete
                                                    defaultValue="Clothing"
                                                    options={["Clothing", "Electronics", "Furniture", "Others", "Real Estate"]}
                                                    renderInput={(params) => <MDInput {...params} variant="standard" />}
                                                />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MDBox mb={2} display="inline-block">
                                                <MDTypography
                                                    component="label"
                                                    variant="button"
                                                    fontWeight="regular"
                                                    color="text"
                                                    textTransform="capitalize"
                                                >
                                                    Size
                                                </MDTypography>
                                            </MDBox>
                                            <Autocomplete
                                                defaultValue="Medium"
                                                options={["Extra Large", "Extra Small", "Large", "Medium", "Small"]}
                                                renderInput={(params) => <MDInput {...params} variant="standard" />}
                                            />
                                        </Grid>
                                    </Grid>
                                </MDBox>

                                <MDBox mt={3}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <FormField
                                                type={description.type}
                                                label={description.label}
                                                name={description.name}
                                                value={descriptionV}
                                                placeholder={description.placeholder}
                                                error={errors.name && touched.name}
                                                success={descriptionV.length > 0 && !errors.name}
                                            />
                                        </Grid>
                                    </Grid>
                                </MDBox>
                            </MDBox>
                        </Form>
                    )}
                </Formik>
            </MDBox>
        </DashboardLayout>
    );
}

export default NewProduct;
