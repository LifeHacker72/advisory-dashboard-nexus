
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const metricCardVariants = cva(
  "rounded-xl border p-6 shadow-sm glass-card transition-all hover:shadow-md hover:translate-y-[-2px]",
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/20 bg-primary/5",
        success: "border-green-500/20 bg-green-500/5",
        warning: "border-amber-500/20 bg-amber-500/5",
        danger: "border-destructive/20 bg-destructive/5",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  icon?: React.ReactNode;
}

export function MetricCard({
  className,
  variant,
  title,
  value,
  trend,
  icon,
  ...props
}: MetricCardProps) {
  return (
    <div className={cn(metricCardVariants({ variant }), className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight">{value}</h3>
          
          {trend && (
            <p className="mt-2 flex items-center text-xs">
              <span
                className={cn(
                  "inline-flex items-center mr-1",
                  trend.isPositive ? "text-green-600" : "text-destructive"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
            </p>
          )}
        </div>
        
        {icon && <div className="rounded-full p-3 bg-primary/10">{icon}</div>}
      </div>
    </div>
  );
}
