import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown'

export default function MyToolTip({ children }) {
    const toolTipChildren = children.props.value.trim().split(":");
    const customCssID = toolTipChildren[1];
    const glossaryUrl = "/astro-starlight/glossary/" + toolTipChildren[1];
    const [GlossaryBody, setGlossaryBody] = useState(null);

    const localUrl = "/src/content/docs/glossary/" + toolTipChildren[1] + ".md";
    const remoteUrl = "https://raw.githubusercontent.com/userdocs/astro-starlight/main/src/content/docs/glossary/" + toolTipChildren[1] + ".md";

    const theme = document.documentElement.dataset.theme

    console.log("Theme: " + theme);

    useEffect(() => {
        fetch(localUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Local fetch failed');
                }
                return response;
            })
            .catch(error => {
                console.log(error);
                console.log('Local fetch failed, trying remote URL...');
                return fetch(remoteUrl);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Remote fetch also failed');
                }
                return response.text(); // or response.text() if the response is text
            })
            .then(data => {
                // Use the data
                setGlossaryBody(String(data).split("---")[2]);
            })
            .catch(error => {
                console.error('Both fetches failed', error);
            });
    }, []);

    return (
        <>
            <a
                id={customCssID + "-tooltip"}
                data-tooltip-id={customCssID + "-tooltip"}
                data-tooltip-wrapper="span"
                target="_blank"
                className="my-tooltip-url"
            >
                {toolTipChildren[0]}
            </a>
            <Tooltip
                noArrow="true"
                variant={theme}
                place="bottom"
                clickable="true"
                openOnClick="true"
                className="my-tooltip"
                id={customCssID + "-tooltip"}
                anchorSelect={"#" + customCssID + "-tooltip"}
                wrapper="span"
            ><Markdown>{GlossaryBody}</Markdown> 🟢 <a href={glossaryUrl} target="_blank">Click here full Glossary entry</a></Tooltip>
        </>
    );
}