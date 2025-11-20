import { Sparkles } from 'lucide-react';

interface StartupLoaderProps {
  isVisible: boolean;
}

export default function StartupLoader({ isVisible }: StartupLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#fdf2fa] via-white to-[#e9d5ff] transition-opacity duration-500 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="h-28 w-28 rounded-full bg-white shadow-2xl flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#DC2E7C] to-[#5F4D8B] animate-pulse flex items-center justify-center text-white">
              <Sparkles className="h-10 w-10 animate-spin" />
            </div>
          </div>
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-[#DC2E7C]/30" />
        </div>
        <div>
          <p className="text-sm tracking-[0.5em] uppercase text-[#DC2E7C]">Pure Serenity</p>
          <p className="text-xl font-semibold text-gray-700 mt-2">Curating calm for your rituals...</p>
        </div>
      </div>
    </div>
  );
}
