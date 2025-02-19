import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec11_canvas";
// @ts-expect-error importing canvas class
import TextEffect from "../utils/sec11_canvas_2";

interface Props {
  painting: HTMLImageElement;
}
export default function Section11({ painting }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect>(null);
  const textEffectRef = useRef<TextEffect>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<number>(0);

  const [animationStatus, setAnimationStatus] = useState(1);

  const divRef = useRef<HTMLDivElement>(null);

  const [resizeToggle, setResizeToggle] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !divRef.current || !textCanvasRef.current) return;

    // canvas main
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // text canvas
    const textCanvas = textCanvasRef.current;
    const textCtx = textCanvas.getContext("2d");

    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.95;

    textCanvas.width = window.innerWidth * 0.95;
    textCanvas.height = window.innerHeight * 0.95;

    effectRef.current = new Effect(ctx, canvas.width, canvas.height, painting);

    textEffectRef.current = new TextEffect(
      textCtx,
      textCanvas.width,
      textCanvas.height,
      painting
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
    if (!imgRef.current) return;

    function animate() {
      if (!imgRef.current) return;
      imgRef.current.style.transform = `scale(${Math.sin(timerRef.current * 2) * 0.01 + 1.01})`;
      imgRef.current.style.filter = `hue-rotate(${timerRef.current * 0.1}deg)`;

      timerRef.current += 0.01;
      requestAnimationFrame(animate);
    }

    if (shouldAnimate) {
      animate();
    }
  }, [shouldAnimate]);

  useEffect(() => {
    if (!canvasRef.current || !effectRef.current || !textCanvasRef.current)
      return;
    if (shouldAnimate) {
      effectRef.current.animate();
      textEffectRef.current.animate();
    } else {
      effectRef.current.stop();
      textEffectRef.current.stop();
    }
  }, [shouldAnimate]);

  // resize
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
    <div style={{ backgroundColor: "white" }}>
      <div ref={divRef} className="section_11">
        <canvas ref={canvasRef} className="section_11__canvas"></canvas>
        <canvas ref={textCanvasRef} className="section_11__canvas_2"></canvas>
        <img ref={imgRef} className="section_11__img" src={painting.src}></img>
      </div>
    </div>
  );
}
