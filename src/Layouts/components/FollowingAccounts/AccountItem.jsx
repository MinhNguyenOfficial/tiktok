import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./FollowingAccounts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Image from "../../../components/Image";

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <div className={cx("account-item-wrapper")}>
      <div className={cx("avatar")}>
        <Image src={data.avatar} alt="" />
      </div>
      <div className={cx("info")}>
        <h4 className={cx("user-name")}>
          {data.nickname}
          {data.tick && (
            <span className={cx("tick")}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          )}
        </h4>
        <p className={cx("name")}>{data.first_name + " " + data.last_name}</p>
      </div>
    </div>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object,
};

export default AccountItem;
