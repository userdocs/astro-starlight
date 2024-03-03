import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown'

export default function MyToolTip({ children }) {
    const toolTipChildren = children.props.value.trim().split(":");
    const customCssID = toolTipChildren[1];
    const glossaryUrl = "/astro-starlight/glossary/" + toolTipChildren[1];
    const [GlossaryBody, setGlossaryBody] = useState(null);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/userdocs/astro-starlight/main/src/content/docs/glossary/" + toolTipChildren[1] + ".md")
            .then((response) => response.text())
            .then((data) => {
                setGlossaryBody(String(data).split("---")[2]);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <a
                id={customCssID + "_tooltip"}
                data-tooltip-position-strategy="absolute"
                data-tooltip-id={customCssID + "_tooltip"}
                data-tooltip-wrapper="span"
                data-tooltip-place="bottom-start"
                data-tooltip-offset="30"
                href={glossaryUrl}
                target="_blank"
                className="my_tooltip_url"
            >
                {toolTipChildren[0]}
            </a>
            <Tooltip
                className="my_tooltip"
                noArrow="true"
                id={customCssID + "_tooltip"}
                float="true"
                clickable="true"
                anchorSelect={"#" + customCssID + "_tooltip"}
                wrapper="span"
            ><Markdown>{GlossaryBody}</Markdown></Tooltip>
        </>
    );
}