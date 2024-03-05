/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function Button({
  onClick,
  to,
  href,
  children,
  primary = false,
  outline = false,
  small = false,
  large = false,
  text = false,
  disabled = false,
  rounded = false,
  circle = false,
  leftIcon,
  rightIcon,
  ...passProps
}) {
  let Component = "button";

  const classes = cx("wrapper", {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    circle,
  });

  const props = {
    onClick,
    ...passProps,
  };

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] == "function")
        delete props[key];
    });
  }

  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = "a";
  }

  return (
    <Component className={classes} {...props}>
      {leftIcon && (
        <span className={cx("icon")}>
          <FontAwesomeIcon icon={leftIcon} />
        </span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className={cx("icon")}>
          <FontAwesomeIcon icon={rightIcon} />
        </span>
      )}
    </Component>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  text: PropTypes.bool,
  disabled: PropTypes.string,
  rounded: PropTypes.string,
  circle: PropTypes.string,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
};
export default Button;
