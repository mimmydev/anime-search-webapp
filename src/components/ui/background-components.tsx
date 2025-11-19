import { cn } from "@/lib/utils";

type BackgroundComponentsProps = {
  children?: React.ReactNode;
  className?: string;
}

export const Component = ({ children, className }: BackgroundComponentsProps) => {
  return (
    <div className={cn("min-h-screen w-full relative bg-white", className)}>
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #FFF991 0%, transparent 70%)
          `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
      {/* Content/Components */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
