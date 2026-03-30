export default function Loading() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
