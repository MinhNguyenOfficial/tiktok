import PropTypes from "prop-types";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function FooterLink({ footerLinks }) {
  return (
    <div className={cx("link-wrapper")}>
      {footerLinks.map((link, index) => (
        <a className={cx("footer-link")} key={index} href={link.href}>
          {link.title}
        </a>
      ))}
    </div>
  );
}

FooterLink.propTypes = {
  footerLinks: PropTypes.array,
};

export default FooterLink;
