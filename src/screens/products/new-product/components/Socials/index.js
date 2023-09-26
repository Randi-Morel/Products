import Grid from "@mui/material/Grid";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import FormField from "../FormField";

function Socials() {
  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Socials
      </MDTypography>
      <MDBox mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormField type="text" label="Twitter Handle" />
          </Grid>
          <Grid item xs={12}>
            <FormField type="text" label="Facebook Account" />
          </Grid>
          <Grid item xs={12}>
            <FormField type="text" label="Instagram Account" />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Socials;
