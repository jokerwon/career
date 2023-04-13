import img from "@assets/pursue.png";
import { useEffect, useRef } from "react";
import Logo, { ReactComponent } from "../logo.svg";
import fib from "virtual:fib";
import html2canvas from "html2canvas";
import * as html2img from "html-to-image";
import styles from "./index.module.scss";
// import Worker from "./worker.js?worker";

// 1. 初始化 Worker 实例
// const worker = new Worker();
// // 2. 主线程监听 worker 的信息
// worker.addEventListener("message", e => {
//   console.log(e);
// });

export function Header() {
  useEffect(() => {
    console.log(`结果: ${fib(10)}`);
  }, []);

  const onClick = () => {
    html2img
      .toPng(document.getElementById("target")!)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    // html2canvas(document.getElementById("target")!, {
    //   width: 668,
    //   height: 690,
    // })
    //   .then(function (canvas) {
    //     // const res = canvas.toDataURL()
    //     document.body.appendChild(canvas);
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });
  };

  return (
    <div id="target">
      <p className={styles.header}>This is Header</p>
      <img src={img} alt="" />
      <img src={Logo} alt="" />
      <ReactComponent />
      <button onClick={onClick}>shot</button>
    </div>
  );
}
