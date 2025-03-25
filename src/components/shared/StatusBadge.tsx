
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        primary: "bg-primary text-primary-foreground",
        success: "bg-green-500/15 text-green-600 border border-green-500/20",
        warning: "bg-amber-500/15 text-amber-600 border border-amber-500/20",
        danger: "bg-destructive/15 text-destructive border border-destructive/20",
        info: "bg-blue-500/15 text-blue-600 border border-blue-500/20",
        outline: "border border-input bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  icon?: React.ReactNode;
}

export function StatusBadge({
  className,
  variant,
  icon,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
}
