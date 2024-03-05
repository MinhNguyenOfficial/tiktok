import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./FollowingAccounts.module.scss";
import AccountItem from "./AccountItem";

const cx = classNames.bind(styles);

function FollowingAccounts({ label, data = [], onSeeMore }) {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("label")}>{label}</span>
      {data.map((account) => (
        <AccountItem key={account.id} data={account} />
      ))}

      <p className={cx("more-btn")} onClick={onSeeMore}>
        See more
      </p>
    </div>
  );
}

FollowingAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
  onSeeMore: PropTypes.func,
};

export default FollowingAccounts;
