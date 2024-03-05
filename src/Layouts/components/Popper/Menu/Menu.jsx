import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Wrapper as PopperWrapper } from "../../Popper";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import Button from "../../../../components/Button";
import { faMoon, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "antd";
import Header from "./Header";
import { useState } from "react";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, currentUser }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  const [isDarkMode, setIsDarkMode] = useState(true);

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setIsDarkMode(false);
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setIsDarkMode(true);
  };

  const renderResult = (attrs) => (
    <PopperWrapper>
      <div className={cx("content")} tabIndex="-1" {...attrs}>
        {history.length > 1 && (
          <Header title={current.title} onBack={handleBack} />
        )}
        <div className={cx("menu-body")}>{renderItems()}</div>
        {isDarkMode && (
          <div className={cx("menu-item")}>
            <Button leftIcon={faMoon} className={cx("dark-mode")}>
              Dark Mode
            </Button>
            <Switch className={cx("switch")} />
          </div>
        )}
        {currentUser && isDarkMode && (
          <>
            <span className={cx("log-out-line")}></span>
            <div className={cx("menu-item")}>
              <Button leftIcon={faSignOut} className={cx("log-out")}>
                Log Out
              </Button>
            </div>
          </>
        )}
      </div>
    </PopperWrapper>
  );

  // Reset to first page
  const handleReset = () => {
    setHistory((prev) => prev.slice(0, 1));
    setIsDarkMode(true);
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      placement="bottom-end"
      hideOnClick={false}
      render={renderResult}
      onHide={handleReset}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
  currentUser: PropTypes.bool,
};

export default Menu;
