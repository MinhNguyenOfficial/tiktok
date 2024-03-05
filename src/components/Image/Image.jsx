/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import defaultImage from "../../assets/images/default_img.png";

const Image = forwardRef(
  ({ src, alt, fallback = defaultImage, ...props }, ref) => {
    const [fallBack, setFallBack] = useState("");
    const handleError = () => {
      setFallBack(fallback);
    };
    return (
      <img
        ref={ref}
        src={fallBack || src}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;
