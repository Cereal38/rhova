export default function GradientBackground() {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_80%_20%,rgba(110,168,255,0.4),transparent_40%),radial-gradient(circle_at_20%_70%,rgba(255,110,199,0.25),transparent_50%),linear-gradient(135deg,#2b2f77,#1c1f4a)]'
    />
  );
}
