import { ALL_ICONS } from "@utils/icon";
import React from "react";

import ActiveLink from "../active-link";

export default function List() {
  const iconsList = ALL_ICONS.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <div className="pt3">
      <ul className="sidebar--links">
        {iconsList.map(icon => {
          return (
            <li key={icon.id} className="col col-6 md-col-4">
              <ActiveLink
                href={{ pathname: "icons", query: { name: icon.id } }}
              >
                <a className="rounded px2 py2 center">
                  <p className="h4 mb0 bold">{icon.name}</p>
                  <span className="h6">{icon.license}</span>
                </a>
              </ActiveLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
