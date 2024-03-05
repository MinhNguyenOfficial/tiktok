import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function MenuItem({ title, to, leftIcon, rightIcon }) {
  return (
    <NavLink
      to={to}
      className={(nav) => cx("menu-item", { active: nav.isActive })}
    >
      {leftIcon && (
        <span className={cx("left-icon")}>
          <FontAwesomeIcon icon={leftIcon} />
        </span>
      )}
      <span className={cx("title")}>{title}</span>
      {rightIcon && (
        <span className={cx("right-icon")}>
          <FontAwesomeIcon icon={rightIcon} />
        </span>
      )}
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  leftIcon: PropTypes.object.isRequired,
  rightIcon: PropTypes.object,
};

export default MenuItem;
