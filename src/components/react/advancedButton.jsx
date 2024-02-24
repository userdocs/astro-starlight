import { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { GiBrain } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";

function getToggled() {
    const toggle = window.localStorage.getItem("advanced");
    return JSON.parse(toggle);
}

function setToggled(toggled) {
    const toggledJSON = JSON.stringify(toggled);
    window.localStorage.setItem("advanced", toggledJSON);
}

function App() {
    const [toggle, setToggle] = useState(getToggled());

    useEffect(() => {
        setToggled(toggle);
    }, [toggle]);

    return (
        <div className="astro-kmkmnagf">
            <label className="myreact-label advanced-button ">
                <Toggle
                    className="myreact-toggle"
                    checked={toggle}
                    icons={{
                        checked: <GiBrain />,
                        unchecked: <MdOutlineMenuBook />,
                    }}
                    onChange={() => {
                        setToggle((prev) => !prev);
                        for (let element of document.getElementsByClassName(
                            "Advanced-class"
                        )) {
                            {
                                toggle
                                    ? (element.style.display = "none")
                                    : (element.style.display = "block");
                            }
                        }
                    }}
                ></Toggle>
                <span className="myreact-span astro-kmkmnagf">{toggle ? "" : ""}</span>
            </label>
        </div>
    );
}

export default App;
