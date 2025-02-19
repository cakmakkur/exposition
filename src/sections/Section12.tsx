import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec12_canvas";

interface Props {
  painting: HTMLImageElement;
}
export default function Section12({ painting }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<number>(0);
  const [animationStatus, setAnimationStatus] = useState(1);

  const divRef = useRef<HTMLDivElement>(null);

  const [resizeToggle, setResizeToggle] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !divRef.current) return;

    // canvas main
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.95;

    effectRef.current = new Effect(ctx, canvas.width, canvas.height, painting);

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

      //   imgRef.current.style.opacity = `${Math.sin(timerRef.current) * 0.1 + 0.1}`;
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
    if (!canvasRef.current || !effectRef.current) return;
    if (shouldAnimate) {
      effectRef.current.animate();
    } else {
      effectRef.current.stop();
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
      <div ref={divRef} className="section_12">
        <canvas ref={canvasRef} className="section_12__canvas"></canvas>
        <img ref={imgRef} className="section_12__img" src={painting.src}></img>
      </div>
    </div>
  );
}
