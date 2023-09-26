import PropTypes from "prop-types";
import { ErrorMessage, Field } from "formik";
import MDBox from "../../MDBox";
import MDTypography from "../../MDTypography";
import MDInput from "../../MDInput";

function FormField({ label, name, ...rest }) {
  return (
    <MDBox mb={1.5}>
      <Field {...rest} name={name} as={MDInput} variant="standard" label={label} fullWidth />
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FormField;
