import { useEffect, useRef, useState } from "react";
// @ts-expect-error importing canvas class
import { Effect, Symbol } from "../utils/sec4_canvas";
interface Props {
  painting: HTMLImageElement;
}
export default function Section4({ painting }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect>(null);
  const timerRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const paintingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!shouldAnimate) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    effectRef.current = new Effect(canvas.height, canvas.width);

    const fps = 20;
    const nextFrame = 1000 / fps;

    function animate(timestamp: number) {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (timerRef.current > nextFrame) {
        ctx!.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        ctx!.font = effectRef.current.fontSize + "px monospace";
        effectRef.current.symbols.forEach((symbol: Symbol) => {
          symbol.draw(ctx);
        });
        timerRef.current = 0;
      } else {
        timerRef.current += deltaTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate(0);

    // ----- RESIZE -----
    const handleResize = () => {
      cancelAnimationFrame(animationRef.current);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.3;
      effectRef.current = new Effect(ctx, canvas.width, canvas.height);
      animate(0);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldAnimate]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          canvasRef.current!.style.opacity = "0.5";
          setShouldAnimate(true);
        } else {
          canvasRef.current!.style.opacity = "0";
          cancelAnimationFrame(animationRef.current);
          setShouldAnimate(false);
        }
      },
      { threshold: 0.3 }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paintingRef.current!.style.transform = "translateX(0)";
          titleRef1.current!.style.transitionDelay = "0.4s";
          titleRef1.current!.style.transform = "translateX(0)";
          titleRef2.current!.style.transitionDelay = "0.8s";
          titleRef2.current!.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(canvasRef.current);
    observer2.observe(canvasRef.current);

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
        observer2.unobserve(canvasRef.current);
      }
    };
  }, []);

  return (
    <section className="section_4">
      <canvas
        ref={canvasRef}
        className="canvas_4 absoluteLargeFullScreen"
      ></canvas>
      <div className="child_5">
        <h1 ref={titleRef1} className="section_4__title">
          Drums
        </h1>
        <h1 ref={titleRef2} className="section_4__title">
          and Bones
        </h1>
      </div>
      <div ref={paintingRef} className="child_4">
        <img src={painting.src} alt="painting #3" />
      </div>
    </section>
  );
}
