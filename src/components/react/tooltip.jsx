import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { getCollection } from 'astro:content';

const glossaryCollection = await getCollection('docs');

export default function MyToolTip({ children }) {

    const toolTipChildren = JSON.parse(JSON.stringify(children.props)).value.trim().split(":");
    const customCssID = toolTipChildren[1];
    const glossaryUrl = "glossary/" + toolTipChildren[1];
    const result = glossaryCollection.filter(glossaryCollection => glossaryCollection.slug == "glossary/" + toolTipChildren[1])
    const toolTipBody = JSON.parse(JSON.stringify(result))[0].body;
    const toolTipSections = toolTipBody.split("---");

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
                data-tooltip-html={"<span>" + toolTipSections[0] + "</span>"}
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