import { useEffect } from "react";
import { useRef } from "react";

interface SliderbarProps {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sliderbar({ isOn, setIsOn }: SliderbarProps) {
  const sliderThumbRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    if (!sliderThumbRef.current) return;
    if (isOn) {
      sliderThumbRef.current.style.transform = `translateX(0)`;
    } else {
      sliderThumbRef.current.style.transform = `translateX(20px)`;
    }
  }, [isOn]);

  return (
    <div className="sliderbar__container">
      <div ref={sliderThumbRef} className="slider__ball"></div>
      <div className="circle__l"></div>
      <div onClick={handleClick} className="slider__mid"></div>
      <div className="circle__r"></div>
    </div>
  );
}
