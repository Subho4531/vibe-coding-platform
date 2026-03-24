'use client';

export function StreamingLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="space-y-4 w-full max-w-sm">
        {/* Animated bars */}
        <div className="flex gap-2 items-end justify-center h-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-primary to-secondary rounded-full"
              style={{
                height: `${30 + Math.random() * 40}px`,
                animation: `pulse 1s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-foreground">Generating your website...</p>
          <p className="text-xs text-muted-foreground">This usually takes 10-30 seconds</p>
        </div>

        {/* Dots animation */}
        <div className="flex items-center justify-center gap-1">
          <div
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-secondary animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-accent animate-bounce"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
