import VideosContent from "../../layouts/components/VideosContent";
import classNames from "classnames";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("wrapper")}>
      <VideosContent />
    </div>
  );
}

export default Home;
