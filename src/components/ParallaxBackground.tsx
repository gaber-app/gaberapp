import morphBg from '@/assets/morph-lines-bg.svg';

interface ParallaxBackgroundProps {
  opacity?: number;
}

export default function ParallaxBackground({ opacity }: ParallaxBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      <div
        className={`absolute inset-0 w-full h-full mix-blend-multiply ${opacity ? '' : 'opacity-15'}`}
        style={{
          backgroundImage: `url(${morphBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          ...(opacity ? { opacity: opacity / 100 } : {}),
        }}
      />
    </div>
  );
}
