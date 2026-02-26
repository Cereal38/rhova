interface Props {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export default function ParallelStrokes({
  size = 24,
  color = 'currentColor',
  strokeWidth = 4,
  className,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 32 32'
      fill='none'
      className={className}
      aria-hidden='true'
    >
      <line
        x1='4'
        y1='28'
        x2='10'
        y2='4'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <line
        x1='11.5'
        y1='28'
        x2='17.5'
        y2='4'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <line
        x1='19'
        y1='28'
        x2='25'
        y2='4'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
    </svg>
  );
}
