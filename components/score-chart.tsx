interface Props {
  score: number;
  max: number;
}

export default function ScoreChart({ score, max }: Props) {
  const radius = 70;
  const stroke = 18;

  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const size = radius * 2 + stroke;

  const progress = score / max;
  const length = progress * circumference;
  const dasharray = `${length} ${circumference}`;

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className='-rotate-90'
      >
        <defs>
          <linearGradient id='scoreGradient'>
            <stop offset='0%' stopColor='#22c55e' />
            <stop offset='100%' stopColor='#4ade80' />
          </linearGradient>
        </defs>

        <circle
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          fill='transparent'
          stroke='#e5e7eb'
          strokeWidth={stroke}
        />

        <circle
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          fill='transparent'
          strokeWidth={stroke}
          strokeDasharray={dasharray}
          strokeDashoffset={0}
          strokeLinecap='round'
          stroke='url(#scoreGradient)'
        />
      </svg>

      <div className='absolute inset-0 flex items-center justify-center text-xl font-bold'>
        {score}/{max}
      </div>
    </div>
  );
}
