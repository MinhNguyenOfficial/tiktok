import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faHouse,
  faKeyboard,
  faLightbulb,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPaperPlane,
  faMessage,
  faUser,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import logo from "../../../assets/images/tiktok_logo.svg";
import Button from "../../../components/Button";
import Menu from "../Popper/Menu";
import Image from "../../../components/Image";
import Search from "../Search";
import config from "../../../config";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: faLightbulb,
    title: "LIVE Creator Hub",
    to: "/live_creator",
  },
  {
    icon: faEarthAsia,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          type: "language",
          code: "en",
          title: "English",
        },
        { type: "language", code: "vi", title: "Tiếng Việt" },
      ],
    },
  },
  {
    icon: faCircleQuestion,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: faKeyboard,
    title: "Keyboard shortcuts",
  },
];

const userMenu = [
  {
    icon: faUser,
    title: "View Profile",
  },
  {
    icon: faBookmark,
    title: "Favorites",
  },
  {
    icon: faCoins,
    title: "Get Coins",
  },
  {
    icon: faCamera,
    title: "LIVE Studio",
  },
  {
    icon: faHouse,
    title: "LIVE Center",
  },
  {
    icon: faLightbulb,
    title: "LIVE Creator Hub",
    to: "/live_creator",
  },
  {
    icon: faGear,
    title: "Settings",
  },
  ...MENU_ITEMS.slice(1),
];
function Header() {
  const currentUser = true;

  return (
    <header className={cx("wrapper")}>
      <Link to={config.home} className={cx("tiktok-icon")}>
        <img src={logo} alt="TikTok" />
      </Link>
      <Search />
      <div className={cx("action")}>
        <Button text leftIcon={faPlus}>
          Upload
        </Button>
        {currentUser ? (
          <>
            <Tippy content="Messages">
              <button className={cx("action-button")}>
                {" "}
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </Tippy>
            <Tippy content="Inbox">
              <button className={cx("action-button")}>
                <FontAwesomeIcon icon={faMessage} />{" "}
              </button>
            </Tippy>
          </>
        ) : (
          <>
            <Button primary>Login</Button>
          </>
        )}
        <Menu
          items={currentUser ? userMenu : MENU_ITEMS}
          currentUser={currentUser}
        >
          {currentUser ? (
            <Image
              className={cx("user-avatar")}
              src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/751d9281c7f18830a694812b0643f720.jpeg?x-expires=1693634400&x-signature=ljBL2dhzpGdIFlKOQ0DFBY3EfhA%3D"
              alt=""
            />
          ) : (
            <button className={cx("menu-button")}>
              {" "}
              <FontAwesomeIcon icon={faEllipsisVertical} />{" "}
            </button>
          )}
        </Menu>
      </div>
    </header>
  );
}

export default Header;
