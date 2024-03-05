import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import FooterLink from "./FooterLink";

const cx = classNames.bind(styles);

const ABOUT_LINK = [
  {
    title: "About",
    href: "/",
  },
  {
    title: "Newsroom",
    href: "/",
  },
  {
    title: "Contact",
    href: "/",
  },
  {
    title: "Careers",
    href: "/",
  },
];

const ADS_LINK = [
  { title: "TikTok for Good", href: "/" },
  { title: "Advertise", href: "/" },
  { title: "Developers", href: "/" },
  { title: "Transparency", href: "/" },
  { title: "TikTok Rewards", href: "/" },
  { title: "TikTok Embeds", href: "/" },
];

function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("effect-btn")}>
        <span>Create effects</span>
      </div>
      <FooterLink className={cx("footer-link")} footerLinks={ABOUT_LINK} />
      <FooterLink className={cx("footer-link")} footerLinks={ADS_LINK} />
    </div>
  );
}

export default Footer;
