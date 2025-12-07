import { formatNumber } from "../utils/formatNumbers";
interface CustomReferenceLabelProps {
  viewBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  value: number;
  title: string;
  color: string;
  position: "top" | "bottom";
}
export const CustomReferenceLabel: React.FC<CustomReferenceLabelProps> = ({
  viewBox,
  value,
  title,
  color,
  position,
}) => {
  if (!viewBox) return null;

  const { x, y, width, height } = viewBox;
  const cx = x + width / 2;

  let dy = 0;

  if (position === "top") {
    dy = y < 20 ? 15 : -5;
  } else {
    const distanceToBottom = height - y;
    dy = distanceToBottom < 20 ? -10 : 20;
  }

  const isNearRightEdge = cx > width - 60;
  const isNearLeftEdge = cx < 60;

  let textAnchor: "middle" | "end" | "start" | "inherit" | undefined = "middle";
  if (isNearRightEdge) textAnchor = "end";
  if (isNearLeftEdge) textAnchor = "start";

  return (
    <g>
      <text
        x={cx}
        y={y + dy}
        fill={color}
        textAnchor={textAnchor}
        className="text-[9px] sm:text-xs md:text-sm font-bold tracking-wide transition-all duration-300 stroke-[3px] stroke-white dark:stroke-[#1e293b]"
        strokeWidth="3px"
        style={{ paintOrder: "stroke", pointerEvents: "none" }}
      >
        {title}: {formatNumber(value)}
      </text>

     
    </g>
  );
};
