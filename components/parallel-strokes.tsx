interface Props {
  size?: number;
  color?: string;
  strokeWidth?: number;
  count?: number;
}

export default function ParallelStrokes({
  size = 24,
  color = 'currentColor',
  strokeWidth = 4,
  count = 3,
}: Props) {
  const padding = 4;
  const tilt = 6;
  const gap = 7.5;
  const y1 = 28;
  const y2 = 4;
  const totalWidth = 2 * padding + tilt + (count - 1) * gap;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${totalWidth} 32`}
      fill='none'
      aria-hidden='true'
    >
      {Array.from({ length: count }, (_, i) => {
        const x1 = padding + i * gap;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x1 + tilt}
            y2={y2}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
          />
        );
      })}
    </svg>
  );
}
