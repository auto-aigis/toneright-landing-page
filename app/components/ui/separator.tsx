import React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-gray-200 ${className}`}
      {...props}
    />
  )
);

Separator.displayName = "Separator";
