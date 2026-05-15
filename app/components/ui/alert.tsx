import React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
  className?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-blue-50 border-blue-200 text-blue-900",
      destructive: "bg-red-50 border-red-200 text-red-900",
    };
    
    return (
      <div
        ref={ref}
        className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Alert.displayName = "Alert";

export const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`text-sm ${className}`}
      {...props}
    />
  )
);

AlertDescription.displayName = "AlertDescription";

export const AlertTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`font-semibold ${className}`}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";
