import { useState, useEffect } from "react";
import { Children } from "react";
import "./split-pane-with-range.css";

export default function SplitPaneWithRange({ children, ...props }) {
  if (Children.count(children) !== 2) {
    throw new Error("SplitPaneWithRange should contain exactly two children");
  }

  const [position, setPosition] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  /*optional_reverse*/
  const [reverse, setReverse] = useState(false);
  /*optional_reverse_end*/

  const handleChange = (e) => {
    setPosition(e.target.value);
  };

  //if you want to reset them the window is resized
  /*useEffect(() => {
    window.addEventListener("resize", () => {
      setMaxWidth(document.body.clientWidth);
    });
  });*/

  useEffect(
    () => {
      // set values when window becomes available
      setMaxWidth(window.innerWidth);
      setPosition(window.innerWidth / 2);
    },
    [] /*[maxWidth] if you want to reset when the window is resized*/
  );

  return (
    <div {...props} className="sp-container">
      <div className="sp-sizing-details">
        {/*optional_reverse*/}
        <p>
          <button onClick={() => setReverse(!reverse)}>Reverse</button>
        </p>
        {/* optional_reverse_end */}
        <input
          type="range"
          min={0}
          max={maxWidth}
          value={position}
          className="sp-range"
          onChange={handleChange}
          /*optional_reverse*/ style={{ transform: reverse ? `rotate(180deg)` : "initial" }} /*optional_reverse_end*/
        />
      </div>
      <div className="split-pane">
        <div
          className="sp-item"
          style={{
            width: `${position}px`,
            /*optional_reverse*/
            order: reverse ? 1 : 0,
            /*optional_reverse_end*/
          }}
        >
          {children[0]}
        </div>
        <div className="sp-item" style={{ width: `${maxWidth - position}px` }}>
          {children[1]}
        </div>
      </div>
    </div>
  );
}
