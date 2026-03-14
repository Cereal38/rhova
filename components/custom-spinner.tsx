export default function CustomLoader({ size = 10 }: { size?: number }) {
  const colors = [
    'var(--answer-color-1)',
    'var(--answer-color-2)',
    'var(--answer-color-3)',
    'var(--answer-color-4)',
  ];

  return (
    <>
      <style>{`
        @keyframes spinner-bounce {
          50% { transform: translateY(-9px) scale(1); }
          0%, 100% { transform: translateY(9px) scale(0.6); }
        }
      `}</style>
      <div className='flex items-center gap-2'>
        {colors.map((color, i) => (
          <div
            key={i}
            className='rounded-full'
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              animation: `spinner-bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
            }}
          />
        ))}
      </div>
    </>
  );
}
