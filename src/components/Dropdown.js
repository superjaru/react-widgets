import React, { useState, useEffect, useRef } from "react";

export const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const ref2 = useRef();

  React.useLayoutEffect(() => {
    // console.log("in useffect");
    const onBodyClick = (event) => {
      // console.log("in eventlistenere of body");
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
      // console.log("Delete succeed");
    };
  }, []);
  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        className="item "
        key={option.value}
        onClick={() => {
          // console.log("in each");
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div ref={ref2} className="field">
        <label className="label">{label}</label>
        <div
          className={
            open
              ? "ui selection dropdown visible active"
              : "ui selection dropdown"
          }
          onClick={() => {
            // console.log("in dropdown");

            setOpen(!open);
          }}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={open ? "menu visible transition" : "menu"}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};
