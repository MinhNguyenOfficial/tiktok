import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Image from "../Image";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Link to={`@${data.nickname}`} className={cx("wrapper")}>
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
        <p className={cx("name")}>{data.full_name}</p>
      </div>
    </Link>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
