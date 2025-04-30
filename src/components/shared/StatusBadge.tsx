
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

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
  selectable?: boolean;
  onStatusChange?: (status: string) => void;
  currentStatus?: string;
}

export function StatusBadge({
  className,
  variant,
  icon,
  children,
  selectable = false,
  onStatusChange,
  currentStatus,
  ...props
}: StatusBadgeProps) {
  if (!selectable) {
    return (
      <div className={cn(statusBadgeVariants({ variant }), className)} {...props}>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn(statusBadgeVariants({ variant }), "cursor-pointer hover:opacity-80", className)} {...props}>
          {icon && <span className="mr-1">{icon}</span>}
          {children}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[180px] p-1">
        <DropdownMenuItem 
          className={cn("flex items-center cursor-pointer", currentStatus === "pending" && "bg-accent")}
          onClick={() => onStatusChange && onStatusChange("pending")}
        >
          <Clock className="h-3.5 w-3.5 mr-2 text-amber-600" />
          <span>Pending</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={cn("flex items-center cursor-pointer", currentStatus === "overdue" && "bg-accent")}
          onClick={() => onStatusChange && onStatusChange("overdue")}
        >
          <AlertCircle className="h-3.5 w-3.5 mr-2 text-destructive" />
          <span>Overdue</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={cn("flex items-center cursor-pointer", currentStatus === "completed" && "bg-accent")}
          onClick={() => onStatusChange && onStatusChange("completed")}
        >
          <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-green-600" />
          <span>Completed</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
