import {
  faCamera,
  faHouse,
  faUserGroup,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import config from "../../../config";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Menu, { MenuItem } from "./Menu";
import FollowingAccounts from "../FollowingAccounts";
import { useEffect, useState } from "react";
import * as userServices from "../../../services/userServices";
import Footer from "./Footer/Footer";

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
  const [followers, setFollowers] = useState([]);
  const [page, setPage] = useState(INIT_PAGE);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getFollower({
        page,
        perPage: PER_PAGE,
      });
      setFollowers((prevResult) => [...prevResult, ...result]); // first time is duplicate because strict mode
    };
    fetchApi();
  }, [page]);

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  return (
    <aside className={cx("wrapper")}>
      <div className={cx("content")}>
        <Menu>
          <MenuItem
            title="For You"
            to={config.routes.home}
            leftIcon={faHouse}
          />
          <MenuItem
            title="Following"
            to={config.routes.following}
            leftIcon={faUserGroup}
          />
          <MenuItem
            title="Explore"
            to={config.routes.explore}
            leftIcon={faCompass}
          />
          <MenuItem title="Live" to={config.routes.live} leftIcon={faCamera} />
        </Menu>
        <span className={cx("line")}></span>
        <FollowingAccounts
          label="Following accounts"
          data={followers}
          onSeeMore={handleSeeMore}
        />
        <span className={cx("line")}></span>
        <Footer />
      </div>
    </aside>
  );
}

export default Sidebar;
