import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import FormField from "../../../../../components/custom/FormField";

function Socials({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { twitter, facebook, instagram } = formField;
  const { twitter: twitterV, facebook: facebookV, instagram: instagramV } = values;

  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Socials
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormField
              type={twitter.type}
              label={twitter.label}
              name={twitter.name}
              value={twitterV}
              placeholder={twitter.placeholder}
              error={errors.twitter && touched.twitter}
              success={twitterV.length > 0 && !errors.twitter}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              type={facebook.type}
              label={facebook.label}
              name={facebook.name}
              value={facebookV}
              placeholder={facebook.placeholder}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              type={instagram.type}
              label={instagram.label}
              name={instagram.name}
              value={instagramV}
              placeholder={instagram.placeholder}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for Socials
Socials.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Socials;
