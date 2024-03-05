import styles from "./UserInfo.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import Image from "../../../../components/Image";
import Button from "../../../../components/Button";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function UserInfo({ children, data }) {
  const renderInfo = (attrs) => (
    <div className={cx("box")} tabIndex="-1" {...attrs}>
      <div className={cx("header")}>
        <Image className={cx("avatar")} src={data.avatar} />
        <div className={cx("button")}>
          <Button outline>Follow</Button>
        </div>
      </div>
      <strong className={cx("nickname")}>{data.nickname}</strong>
      <p className={cx("user-name")}>
        {data.first_name + " " + data.last_name}
      </p>
      <p className={cx("followers")}>
        <span className={cx("likes-number")}>{data.followers_count}</span>{" "}
        <span className={cx("likes")}>Followers</span>{" "}
        <span className={cx("likes-number")}>{data.likes_count}</span>{" "}
        <span className={cx("likes")}>Likes</span>{" "}
      </p>
    </div>
  );
  return (
    <Tippy interactive placement="bottom-start" render={renderInfo}>
      {children}
    </Tippy>
  );
}

UserInfo.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default UserInfo;
