import toast from "cogo-toast";
import copy from "copy-text-to-clipboard";
import React, { useState } from "react";
import svgr from "@svgr/core";
import { renderToStaticMarkup } from "react-dom/server";

function Icon({ icon, name }) {
  const [active, setActive] = useState(0);
  const jsx = typeof icon === "function" && icon();

  const copyToClipboard = icon => {
    copy(icon);
    toast.success(`Copied to clipboard`, {
      position: "bottom-center"
    });
  };

  const copyAsSvg = () => {
    const staticIcon = renderToStaticMarkup(jsx);
    copyToClipboard(staticIcon);
  };

  const copyAsJSX = () => {
    const staticIcon = renderToStaticMarkup(jsx);
    svgr(staticIcon, { icon: true }, { componentName: name }).then(jsxIcon => {
      copyToClipboard(jsxIcon);
    });
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(0, active - 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(Math.min(1, active + 1));
    } else if (e.key === "Enter") {
      if (active === 0) copyAsSvg();
      else copyAsJSX();
    }
  };

  return (
    <div className="item" tabIndex={0} onKeyDown={handleKeyDown} key={name}>
      <div className="relative icon h2">
        <span className="icon-inner">{jsx}</span>
        <div className="absolute left-0 top-0 hover:visible invisible overlay">
          <p
            className={active === 0 ? "active" : ''}
            onMouseEnter={() => setActive(0)}
            onClick={copyAsSvg}
          >
            copy SVG
          </p>
          <p
            className={active === 1 ? "active" : ''}
            onMouseEnter={() => setActive(1)}
            onClick={copyAsJSX}
          >
            copy JSX
          </p>
        </div>
      </div>
      <div className="name">{name}</div>
    </div>
  );
}

export default Icon;
