import VideoItem from "../VideoItem";
import { useEffect, useState } from "react";
import * as userServices from "../../../services/userServices";
import classNames from "classnames/bind";
import styles from "./VideosContent.module.scss";

const cx = classNames.bind(styles);

let usedPages = [];
const INIT_PAGE = Math.floor(Math.random() * 47) + 1;
const PER_PAGE = 5;

function VideosContent() {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(INIT_PAGE);
  const [isBottom, setIsBottom] = useState(false);
  const [isMute, setIsMute] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getFollower({
        page,
        perPage: PER_PAGE,
      });
      setContents((prevContent) => [...prevContent, ...result]);
    };
    fetchApi();
  }, [page]);
  const handleMuteChange = (newMuteState) => {
    setIsMute(newMuteState);
  };

  useEffect(() => {
    function handleScroll() {
      const pageHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollTop + windowHeight >= pageHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function getRandomUnusedPage(usedPages) {
    let page;
    do {
      page = Math.floor(Math.random() * 47) + 1;
    } while (usedPages.includes(page));
    return page;
  }

  if (isBottom) {
    usedPages.push(page);
    setPage(getRandomUnusedPage(usedPages));
    setIsBottom(false);
  }

  return (
    <div className={cx("wrapper")}>
      {contents.map((content) => (
        <VideoItem
          data={content}
          key={content.id}
          muted={isMute}
          onMuteChange={handleMuteChange}
        />
      ))}
    </div>
  );
}

export default VideosContent;
