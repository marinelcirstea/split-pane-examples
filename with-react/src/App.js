import SplitPaneWithRange from "./components/split-pane-with-range";
import SplitPaneWithDragbar from "./components/split-pane-with-dragbar";

export default function App() {
  return (
    <div className="App">
      {/* WITH INPUT RANGE */}
      <SplitPaneWithRange>
        <div className="s" style={{ backgroundColor: "blue", height: "100%" }}>
          left
        </div>
        <div className="s" style={{ backgroundColor: "red", height: "100%" }}>
          right
        </div>
      </SplitPaneWithRange>

      {/* WITH DRAGBAR */}
      <SplitPaneWithDragbar>
        <div className="s" style={{ backgroundColor: "blue", height: "100%" }}>
          left
        </div>
        <div className="s" style={{ backgroundColor: "red", height: "100%" }}>
          right{" "}
        </div>
      </SplitPaneWithDragbar>

      {/* just for demo */}
      <style jsx>{`
        .s {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 2em;
          color: white;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
