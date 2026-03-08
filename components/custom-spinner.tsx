export default function CustomSpinner({ size = 10 }: { size?: number }) {
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
          0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
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
