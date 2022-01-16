import { useState, useEffect } from "react";
import { Children } from "react";
import "./split-pane-with-dragbar.css";

export default function SplitPaneWithDragbar({ children, ...props }) {
  if (Children.count(children) !== 2) {
    throw new Error("SplitPaneWithDragbar should contain exactly two children");
  }
  const [position, setPosition] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  /*optional_reverse*/
  const [reverse, setReverse] = useState(false);
  /*optional_reverse_end*/

  function handleMouseDown() {
    // clear handlers on release
    window.onmouseup = function () {
      window.onmousemove = null;
      window.onmouseup = null;
    };

    window.onmousemove = function (e) {
      reverse ? setPosition(maxWidth - e.clientX) : setPosition(e.clientX);
    };
  }

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
    <>
      <div {...props} className="sp-container">
        {/*optional_reverse*/}
        <button onClick={() => setReverse(!reverse)}>Reverse</button>
        {/*optional_reverse_end*/}

        <div className="split-pane">
          {/* LEFT_SIDE */}
          <div
            className="sp-item"
            style={{
              width: `${position}px`,
              /*optional_reverse*/
              order: reverse ? 2 : 0,
              /*optional_reverse_end*/
            }}
          >
            {children[0]}
          </div>
          {/* LEFT_SIDE_END */}

          {/* DRAGBAR */}
          <div
            className="dragbar"
            /*optional_reverse*/
            style={{ order: 1 /*always in middle*/ }}
            /*optional_reverse_end*/
            onMouseDown={handleMouseDown}
          ></div>
          {/* DRAGBAR_END */}

          {/* RIGHT_SIDE */}
          <div
            className="sp-item"
            style={{
              /*optional_reverse*/
              order: reverse ? 0 : 2,
              /*optional_reverse_end*/
              width: `${maxWidth - position}px`,
            }}
          >
            {children[1]}
          </div>
          {/* RIGHT_SIDE_END */}
        </div>
      </div>
    </>
  );
}
