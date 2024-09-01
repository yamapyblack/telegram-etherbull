import { useState, useEffect } from "react";
import "./App.css";
// import WebApp from "@twa-dev/sdk";

function App() {
  const [count, setCount] = useState(0);
  const [arrows, setArrows] = useState<
    { id: number; left: number; top: number }[]
  >([]);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
    document.head.appendChild(meta);
  }, []);

  //Delete 10 old arrows
  useEffect(() => {
    const timeout = setTimeout(() => {
      //If arrow over 10, delete all arrows except for the last 10
      if (arrows.length > 10) {
        setArrows(arrows.slice(-10));
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [arrows]);

  const addArrow = () => {
    const newArrow = {
      id: count,
      left: Math.random() * 300 + 30, // Random position between 30px and 330px
      // 0 to 300 px
      top: Math.random() * 300 + 30, // Random position between 30px and 330px
    };
    setArrows((prevArrows) => [...prevArrows, newArrow]);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="App">
      <div
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          width: "100vw",
          height: "100vh",
          overflowX: "auto",
          // overflowY: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <h1>ETHER BULL</h1>
        <h2 className="eth">
          <span>ETH</span> will be
          <span style={{ fontSize: "42px" }}>${count}</span>
        </h2>
        <div style={{ position: "relative" }}>
          {arrows.map((arrow) => (
            <div
              key={arrow.id}
              style={{
                position: "absolute",
                left: `${arrow.left}px`,
                top: `${arrow.top}px`,
                fontSize: "32px",
                fontWeight: "bold",
                animation: "moveUp 1s ease-out",
                opacity: 0,
                zIndex: 100,
                userSelect: "none", // Add this line to prevent text selection
                WebkitUserSelect: "none", // For webkit browsers
                MozUserSelect: "none", // For Firefox
                msUserSelect: "none", // For IE/Edge
              }}
            >
              ↑
            </div>
          ))}
          <div onClick={addArrow}>
            <img
              src="/ethereum_is_good.jpeg"
              className="logo"
              alt="Vite logo"
              style={{ width: "360px", height: "auto" }}
            />
          </div>
        </div>
        <h2 style={{ fontSize: "32px" }}>TAP ↑↑↑</h2>

        {/* <div className="card">
        <button
          onClick={() => WebApp.showAlert(`Congrats! ETH will be $${count}!`)}
        >
          Exit
        </button>
      </div> */}
      </div>
    </div>
  );
}

export default App;
