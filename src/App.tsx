import { Route, Routes } from "react-router-dom";
import Section3 from "./sections/Section3";
import Exposition from "./sections/Exposition";

export default function App() {
  return (
    <div className="main_div">
      <Routes>
        <Route path="/" element={<Section3 />} />
        <Route path="/exposition" element={<Exposition />} />
      </Routes>
    </div>
  );
}
