import HeadlessTippy from "@tippyjs/react/headless";
import { useEffect, useRef, useState } from "react";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountItem from "../../../components/AccountItem";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useDebounce } from "../../../hooks";
import * as searchServices from "../../../services/searchServices.js";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const debouncedValue = useDebounce(searchValue, 500);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) setSearchValue(searchValue);
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debouncedValue);
      setSearchResult(result);
      setLoading(false);
    };
    fetchApi();
  }, [debouncedValue]);
  return (
    //Using a wrapper <div>  tag around the reference
    // element solves this by creating a new parentNode context
    <div>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive={true}
        render={(attrs) => (
          <PopperWrapper>
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              <p className={cx("search-title")}>Accounts</p>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </div>
          </PopperWrapper>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            value={searchValue}
            ref={inputRef}
            type="text"
            className={cx("search-bar")}
            placeholder="Search"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx("clear-button")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <span className={cx("loading")}>
              <FontAwesomeIcon icon={faSpinner} />
            </span>
          )}
          <span className={cx("small-column")}></span>
          <button
            className={cx("search-button")}
            onMouseDown={(e) => e.preventDefault(e)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
