import Icon from "@components/@core/icon";
import loadable from "@loadable/component";
import React from "react";
import { getIcons } from "@utils/getIcons";
import fuzzysort from 'fuzzysort'
import SearchPageIconLoading from "./loading";

export default function SearchIconSet({ icon, query, setResults }) {
  const IconSet = loadable.lib(() => getIcons(icon.id));  

  return (
    <IconSet fallback={<SearchPageIconLoading />}>
      {({ default: icons }) => {
        const found = fuzzysort.go(query, Object.keys(icons), {
        limit: 1000,
        allowTypo: false,
        threshold: -10000,
      })
        return (
          <>
            {found.map(({target: name}) => (
                <Icon key={name} icon={icons[name]} name={name} />
              ))}
              {setResults(prevResults => {
                return prevResults.hasOwnProperty(icon.id) ?
                  prevResults :
                  {
                    ...prevResults,
                    [icon.id]: found.length
                  }
              })}
          </>
        )
      }}
    </IconSet>
  );
}
