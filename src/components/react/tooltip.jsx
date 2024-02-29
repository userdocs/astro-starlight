import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState, useEffect } from 'react';

export default function MyToolTip({ children }) {

    const toolTipChildren = JSON.parse(JSON.stringify(children.props)).value.trim().split(":");
    const customCssID = toolTipChildren[1];
    const glossaryUrl = "glossary/" + toolTipChildren[1];

    const [GlossaryBody, setGlossaryBody] = useState(null);

    useEffect(() => {
        fetch("/src/content/docs/glossary/" + toolTipChildren[1] + ".md")
            .then((response) => response.text())
            .then((data) => {
                setGlossaryBody(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const toolTipBody = String(GlossaryBody).split("---");

    return (
        <>
            <a
                id={customCssID + "_tooltip"}
                data-tooltip-position-strategy="absolute"
                data-tooltip-id={customCssID + "_tooltip"}
                data-tooltip-wrapper="span"
                data-tooltip-place="top"
                href={glossaryUrl}
                target="_blank"
                className="my_tooltip_url"
                data-tooltip-html={"<span>" + toolTipBody[2] + "</span>"}
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
            ></Tooltip>
        </>
    );
}