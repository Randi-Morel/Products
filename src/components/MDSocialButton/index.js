import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDSocialButtonRoot from "components/MDSocialButton/MDSocialButtonRoot";

const MDSocialButton = forwardRef(({ color, size, iconOnly, circular, children, ...rest }, ref) => (
  <MDSocialButtonRoot
    {...rest}
    ref={ref}
    variant="contained"
    color="primary"
    size={size}
    ownerState={{ color, size, iconOnly, circular }}
  >
    {children}
  </MDSocialButtonRoot>
));

// Setting default values for the props of MDSocialButton
MDSocialButton.defaultProps = {
  size: "medium",
  color: "facebook",
  iconOnly: false,
  circular: false,
};

// Typechecking props for the MDSocialButton
MDSocialButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "pinterest",
    "youtube",
    "github",
    "vimeo",
    "slack",
    "dribbble",
    "reddit",
    "tumblr",
  ]),
  iconOnly: PropTypes.bool,
  circular: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDSocialButton;
