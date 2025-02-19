import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec10_canvas";

import Clock from "../components/Clock";

interface Props {
  painting: HTMLImageElement;
  painting2: HTMLImageElement;
}
export default function Section10({ painting, painting2 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect>(null);
  const [animationStatus, setAnimationStatus] = useState(1);

  const divRef = useRef<HTMLDivElement>(null);

  const [resizeToggle, setResizeToggle] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !divRef.current) return;

    // canvas main
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.8;

    effectRef.current = new Effect(
      ctx,
      canvas.width,
      canvas.height,
      painting,
      painting2
    );

    // const observer = new IntersectionObserver(
    //   ([entry]) => {
    //     if (entry.isIntersecting) {
    //       setShouldAnimate(true);
    //       divRef.current!.style.opacity = "1";
    //     } else {
    //       setShouldAnimate(false);
    //       divRef.current!.style.opacity = "0";
    //     }
    //   },
    //   { threshold: 0.5 }
    // );

    // observer.observe(divRef.current);

    // return () => {
    //   if (divRef.current) {
    //     observer.unobserve(divRef.current);
    //   }
    // };
  }, [resizeToggle]);

  useEffect(() => {
    if (!canvasRef.current || !effectRef.current) return;
    if (shouldAnimate) {
      effectRef.current.animate();
    } else {
      effectRef.current.stop();
    }
  }, [shouldAnimate]);

  useEffect(() => {
    const handleResize = () => {
      setResizeToggle(!resizeToggle);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="section_10__background"
      style={{ backgroundColor: "white" }}
    >
      <div ref={divRef} className="section_10">
        <h1>Space</h1>

        <canvas ref={canvasRef} className="section_10__canvas"></canvas>
        <div className="section_10__right_side">
          <Clock />
        </div>
      </div>
    </div>
  );
}
