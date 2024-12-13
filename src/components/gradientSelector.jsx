import { useEffect, useState } from "react";

const GradientSelector = ({ onGradientChange }) => {
  const [gradientType, setGradientType] = useState("linear");
  const [colors, setColors] = useState(["#ff0000", "#0000ff"]);
  const [angle, setAngle] = useState(90);

  const handleColorChange = (color, index) => {
    const updatedColors = [...colors];
    updatedColors[index] = color;
    setColors(updatedColors);
  };

  const updateGradient = () => {
    const gradient =
      gradientType === "linear"
        ? `linear-gradient(${angle}deg, ${colors.join(", ")})`
        : `radial-gradient(circle, ${colors.join(", ")})`;
    return gradient;
  };

  useEffect(() => {
    onGradientChange(updateGradient());
  }, [gradientType, colors, angle]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <div className="grid">
          <label className="block text-white mb-2">Gradient Picker</label>
          <select
            value={gradientType}
            onChange={(e) => setGradientType(e.target.value)}
            className="p-[5px] rounded mb-2 bg-transparent text-white border-2 border-gray-500 outline-none"
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>

        {gradientType === "linear" && (
          <div className="grid">
            <label className="text-white">Angle:</label>
            <input
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="rounded w-full p-1 mb-2 bg-transparent text-white border-2 border-gray-500 outline-none"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 mt-5">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value, index)}
              className="w-12 h-8"
            />
            <span className="text-white">{color}</span>
          </div>
        ))}
      </div>
      <div
        className={`w-full h-40 rounded-lg border border-gray-400`}
        style={{ background: updateGradient() }}
      ></div>
    </div>
  );
};

export default GradientSelector;
