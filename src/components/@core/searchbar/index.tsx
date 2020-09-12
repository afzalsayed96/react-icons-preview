import { Context } from "@utils/search-context";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import ActiveLink from "../active-link";
import BrandIcon from "../heading/icon";

function debounce (fn, delay) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

export default function Searchbar() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null)

  const { query, setQuery, setResults } = React.useContext(Context);

  const debounced = debounce((value) => {
    setQuery(value.toLowerCase());
    setResults(prevResult => {
      return {};
    });
  }, 200)

  const onSearch = e => {
    let value =e.target.value
    /*@ts-ignore */
    debounced(value)
  };

  const goToSearch = e => {
    router.push("/search");
  };

  const clear = e => {
    ref.current.value = ''
    setQuery("");
    if (query.length) {
      window && window.history.back();
    }
  };

  const onBlur = event => {
    if (event.target.value.length === 0) {
      window && window.history.back();
    }
  };

  const onEscape = event => {
    if (event.key === "Escape") {
      onBlur(event);
    }
  };

  return (
    <div className="searchbar">
      <div className="search p2 flex">
        <span className="pr2">
          <ActiveLink href="/">
            <a>
              <BrandIcon size="3rem" />
            </a>
          </ActiveLink>
        </span>
        <input
          type="text"
          aria-label="search"
          className="px2 py1"
          placeholder="🔍  Search All Icons"
          onFocus={goToSearch}
          onBlur={onBlur}
          onChange={onSearch}
          onKeyDown={onEscape}
          ref={ref}
        />
        <span
          className="absolute pr3 pt1 right-0"
          onClick={clear}
          style={{ cursor: "pointer" }}
        >
          ❎
        </span>
      </div>
    </div>
  );
}
