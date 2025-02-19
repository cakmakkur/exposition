import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec7_canvas";
// @ts-expect-error importing canvas class
import Effect2 from "../utils/sec7_canvas_2";
// @ts-expect-error importing canvas class
import Effect3 from "../utils/sec7_canvas_3";

interface Props {
  painting: HTMLImageElement;
}

export default function Section7({ painting }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);
  const sectionDivRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const effectRef = useRef<Effect>(null);
  const effectRef2 = useRef<Effect>(null);
  const effectRef3 = useRef<Effect>(null);
  const [resizeToggle, setResizeToggle] = useState(false);

  const painting_inComponent = new Image();
  painting_inComponent.src = painting.src;

  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  painting_inComponent.onload = () => {
    setHasImageLoaded(true);
  };

  useEffect(() => {
    effectRef.current?.stop();
    effectRef2.current?.stop();
    effectRef3.current?.stop();

    // canvas 1 --- painting
    if (canvasRef.current && hasImageLoaded) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      effectRef.current = new Effect(
        ctx,
        canvas.width,
        canvas.height,
        painting_inComponent
      );
      effectRef.current.animate();
    }

    // canvas 2 --- background
    if (canvasRef2.current) {
      const canvas2 = canvasRef2.current;
      const ctx2 = canvas2.getContext("2d");
      canvas2.width = window.innerWidth;
      canvas2.height = window.innerHeight;
      effectRef2.current = new Effect2(ctx2, canvas2.width, canvas2.height);
      effectRef2.current.animate();
    }

    // canvas 3 --- title
    if (canvasRef3.current) {
      const canvas3 = canvasRef3.current;
      const ctx3 = canvas3.getContext("2d");
      canvas3.width = canvas3.offsetWidth;
      canvas3.height = canvas3.offsetHeight;
      effectRef3.current = new Effect3(ctx3, canvas3.width, canvas3.height);
      effectRef3.current.animate();
    }

    // observers

    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionDivRef.current!.style.opacity = "1";
          effectRef.current.animate();
          effectRef2.current.animate();
          effectRef3.current.animate();
        } else {
          sectionDivRef.current!.style.opacity = "0";
          effectRef.current?.stop();
          effectRef2.current?.stop();
          effectRef3.current?.stop();
        }
      },
      { threshold: 0.3 }
    );
    observer1.observe(sectionDivRef.current!);

    return () => {
      observer1.unobserve(sectionDivRef.current!);
    };
  }, [hasImageLoaded, resizeToggle]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setResizeToggle((prev) => !prev);
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(180, 180, 171)" }}>
      <div ref={sectionDivRef} className="section_7">
        <canvas ref={canvasRef2} className="section_7__canvas_2"></canvas>
        <canvas ref={canvasRef} className="section_7__canvas"></canvas>
        <canvas ref={canvasRef3} className="section_7__canvas_3"></canvas>
        <div className="section_7__shadow_div"></div>
      </div>
    </div>
  );
}
