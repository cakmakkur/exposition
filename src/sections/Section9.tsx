import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec9_canvas";
// @ts-expect-error importing canvas class
import Effect2 from "../utils/sec9_canvas_2";

interface Props {
  painting: HTMLImageElement;
}

export default function Section9({ painting }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect>(null);
  const effectRef2 = useRef<Effect>(null);
  const [animationStatus, setAnimationStatus] = useState(1);

  const divRef = useRef<HTMLDivElement>(null);

  const [resizeToggle, setResizeToggle] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleClick = () => {
    if (animationStatus === 1) {
      setAnimationStatus(2);
    } else {
      setAnimationStatus(1);
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !canvasRef2.current || !divRef.current) return;

    // canvas main
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.35;
    canvas.height = window.innerHeight * 0.95;

    effectRef.current = new Effect(ctx, canvas.width, canvas.height, painting);

    // canvas background
    const canvas2 = canvasRef2.current;
    const ctx2 = canvas2.getContext("2d");

    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight * 1.3;

    effectRef2.current = new Effect2(
      ctx2,
      canvas2.width,
      canvas2.height,
      painting
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          divRef.current!.style.opacity = "1";
        } else {
          setShouldAnimate(false);
          divRef.current!.style.opacity = "0";
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(divRef.current);

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [resizeToggle]);

  useEffect(() => {
    if (!canvasRef.current || !canvasRef2.current || !effectRef.current) return;
    if (shouldAnimate) {
      effectRef.current.animate();
      effectRef2.current.animate();
    } else {
      effectRef.current.stop();
      effectRef2.current.stop();
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
    <div className="section_9__background" style={{ backgroundColor: "white" }}>
      <div ref={divRef} className="section_9">
        <canvas ref={canvasRef2} className="section_9__canvas_2"></canvas>
        <canvas ref={canvasRef} className="section_9__canvas"></canvas>
        <div className="section_9__right_side">
          <h1>Early Blossom</h1>
          <button
            onClick={handleClick}
            className="section_9__anm_switch_btn"
            id="section_9__btn"
          >
            {animationStatus === 1 ? (
              <img src="/spring_icon.svg" alt="spring_icon" />
            ) : (
              <img src="/rain_icon.svg" alt="rain_icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
