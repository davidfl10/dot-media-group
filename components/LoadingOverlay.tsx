export default function LoadingOverlay() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 select-none">
      {/* Logo */}
      <img
        src="/logo/black.png"
        alt="DOT Media Group"
        className="w-28 h-auto animate-logo-breathe"
        draggable={false}
      />

      {/* Three wave dots */}
      <div className="flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-dot-wave [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-dot-wave [animation-delay:160ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-dot-wave [animation-delay:320ms]" />
      </div>
    </div>
  );
}
