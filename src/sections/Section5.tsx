import { useEffect, useRef } from "react";
// @ts-expect-error importing canvas class
import Effect from "../utils/sec5_canvas";

export default function Section5() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectRef = useRef<Effect>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    effectRef.current = new Effect(ctx, canvas.width, canvas.height);

    function animate() {
      effectRef.current.animate();
    }

    animate();
  }, []);

  return (
    <div className="section_5">
      <canvas ref={canvasRef} className="section_5__canvas"></canvas>
      <img src="/painting-16.jpeg" alt="painting #16" />
    </div>
  );
}
