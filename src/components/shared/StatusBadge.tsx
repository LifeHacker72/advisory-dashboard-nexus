
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  statusOptions?: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
    variant?: "success" | "warning" | "danger" | "info" | "default" | "primary" | "outline";
  }>;
  showToastOnChange?: boolean;
}

export function StatusBadge({
  className,
  variant,
  icon,
  children,
  selectable = false,
  onStatusChange,
  currentStatus,
  statusOptions,
  showToastOnChange = false,
  ...props
}: StatusBadgeProps) {
  const { toast } = useToast();

  // Default status options if none are provided
  const defaultStatusOptions = [
    {
      value: "pending",
      label: "Pending",
      icon: <Clock className="h-3.5 w-3.5 mr-2 text-amber-600" />,
      variant: "warning" as const,
    },
    {
      value: "overdue",
      label: "Overdue",
      icon: <AlertCircle className="h-3.5 w-3.5 mr-2 text-destructive" />,
      variant: "danger" as const,
    },
    {
      value: "completed",
      label: "Completed",
      icon: <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-green-600" />,
      variant: "success" as const,
    },
  ];

  const options = statusOptions || defaultStatusOptions;

  const handleStatusChange = (status: string) => {
    onStatusChange && onStatusChange(status);
    
    if (showToastOnChange) {
      const statusOption = options.find(option => option.value === status);
      toast({
        title: "Status updated",
        description: `Task status changed to ${statusOption?.label || status}`,
      });
    }
  };

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
        {options.map((option) => (
          <DropdownMenuItem 
            key={option.value}
            className={cn("flex items-center cursor-pointer", currentStatus === option.value && "bg-accent")}
            onClick={() => handleStatusChange(option.value)}
          >
            {option.icon}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
