import morphBg from '@/assets/morph-lines-bg.svg';

export default function ParallaxBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <div
        className="absolute inset-0 w-full h-full opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url(${morphBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}
