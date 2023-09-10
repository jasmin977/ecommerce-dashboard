import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Prop to pass an icon element
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {" "}
        {/* Container for positioning */}
        {icon && (
          <span className="absolute transform -translate-y-1/2 left-2 top-1/2">
            {icon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            `flex h-12 w-full rounded-md border border-input dark:bg-dark-3  ${
              icon ? "px-12" : "px-2"
            } py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
