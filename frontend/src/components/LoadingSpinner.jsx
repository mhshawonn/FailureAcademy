const LoadingSpinner = ({ label = 'Loading' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-24 text-white/70">
    <div className="h-12 w-12 border-4 border-primary/40 border-t-primary rounded-full animate-spin" />
    <p className="text-sm uppercase tracking-widest text-white/60">{label}</p>
  </div>
);

export default LoadingSpinner;
