import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import MoveableComponent from "./Components/MoveableComponent";
import { Frame } from "scenejs";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("new Frame ", `${counter}`);
  const [frame, setFrame] = useState(
  new Frame({
    width: "250px",
    height: "200px",
    left: "0px",
    top: "0px",
    transform: {
      rotate: "0deg",
      scaleX: 1,
      scaleY: 1,
      matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    },
  }));

  const moveableRef = useRef(null);
  const labelRef = useRef(null);
  const [target, setTarget] = useState(null);
  const [scalable, setScalable] = useState(true);
  const [resizable, setResizable] = useState(false);
  const [warpable, setWarpable] = useState(false);

  useEffect(() => {
    setCounter(counter + 1);
    setTarget(document.querySelector(".moveable"));
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  const onWindowResize = () => {
    moveableRef.current.updateRect();
  };

  const clickScalable = () => {
    setScalable(true);
    setResizable(false);
    setWarpable(false);
  };

  const clickResizable = () => {
    setScalable(false);
    setResizable(true);
    setWarpable(false);
  };

  const clickWarpable = () => {
    setScalable(false);
    setResizable(false);
    setWarpable(true);
  };

  return (
    <div className="page main">
      <MoveableComponent   scalable={scalable}
      resizable={resizable}
      warpable={warpable} 
      labelRef={labelRef}
      moveableRef={moveableRef}
      target={target}
      frame={frame}/>
      <div className="container">
        <div className="moveable">
          <span>
            React
            <br />
            Moveable
          </span>
        </div>
        <div className="buttons able">
          <button
            className={scalable ? "selected" : ""}
            data-able="scalable"
            onClick={clickScalable}
          >
            Scalable
          </button>
          <button
            className={resizable ? "selected" : ""}
            data-able="resizable"
            onClick={clickResizable}
          >
            Resizable
          </button>
          <button
            className={warpable ? "selected" : ""}
            data-able="warpable"
            onClick={clickWarpable}
          >
            Warpable
          </button>
        </div>
        <p align="middle">
          Moveable is Draggable, Resizable, Scalable, Rotatable, Warpable,
          Pinchable
        </p>
        <p align="middle">
          <a href="https://github.com/daybrush/moveable" target="_blank">
            <strong>About Moveable</strong>
          </a>{" "}
          /
          <a
            href="https://daybrush.com/moveable/release/latest/doc/"
            target="_blank"
          >
            <strong>API</strong>
          </a>{" "}
          /
          <a href="https://github.com/daybrush/scenejs-timeline" target="_blank">
            <strong>Main Project</strong>
          </a>
        </p>
      </div>
      <div className="label" ref={labelRef} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
