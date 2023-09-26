import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import FormField from "../../../../../components/custom/FormField";

function Pricing({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { price } = formField;
  const { price: priceV } = values;

  return (
    <MDBox>
      <MDTypography variant="h5">Pricing</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormField
              type={price.type}
              label={price.label}
              name={price.name}
              value={priceV}
              placeholder={price.placeholder}
              error={errors.name && touched.name}
              success={priceV.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
            <Autocomplete
              defaultValue="USD"
              options={["BTC", "CNY", "EUR", "GBP", "INR", "USD"]}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </Grid>
          {/* <Grid item xs={12} sm={5}>
            <FormField
              type={name.type}
              label={name.label}
              name={name.name}
              placeholder={name.label}
            />
          </Grid> */}
        </Grid>
      </MDBox>
      <MDBox mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDBox my={2} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Tags
              </MDTypography>
            </MDBox>
            <Autocomplete
              multiple
              defaultValue={["In Stock", "Out of Stock"]}
              options={["Black Friday", "Expired", "Out of Stock", "In Stock", "Sale"]}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Pricing;
