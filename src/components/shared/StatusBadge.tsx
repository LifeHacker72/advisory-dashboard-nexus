import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";

type StatusVariant = 
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

interface StatusBadgeProps {
  children: ReactNode;
  variant?: StatusVariant;
  icon?: ReactNode;
  className?: string;
  selectable?: boolean;
  onStatusChange?: (status: string) => boolean | void;
  currentStatus?: string;
}

export function StatusBadge({
  children,
  variant = "default",
  icon,
  className,
  selectable = false,
  onStatusChange,
  currentStatus
}: StatusBadgeProps) {
  const [open, setOpen] = useState(false);
  
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary/15 text-primary border border-primary/20";
      case "success":
        return "bg-green-500/15 text-green-600 border border-green-500/20";
      case "warning":
        return "bg-amber-500/15 text-amber-600 border border-amber-500/20";
      case "danger":
        return "bg-destructive/15 text-destructive border border-destructive/20";
      case "info":
        return "bg-blue-500/15 text-blue-600 border border-blue-500/20";
      case "outline":
        return "bg-background text-foreground border border-input";
      default:
        return "bg-muted text-muted-foreground border border-transparent";
    }
  };
  
  const handleStatusSelect = (status: string) => {
    setOpen(false);
    if (onStatusChange) {
      const result = onStatusChange(status);
      // If the handler returns false, prevent event propagation
      return result;
    }
  };
  
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "overdue", label: "Overdue" }
  ];
  
  if (selectable) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild onClick={(e) => {
          if (selectable) {
            e.stopPropagation();
          }
        }}>
          <button 
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              getVariantStyles(),
              className
            )}
          >
            {icon}
            {children}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm hover:bg-muted",
                  currentStatus === option.value && "bg-muted/50"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  const result = handleStatusSelect(option.value);
                  if (result === false) {
                    e.stopPropagation();
                  }
                }}
              >
                {option.label}
                {currentStatus === option.value && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getVariantStyles(),
        className
      )}
    >
      {icon}
      {children}
    </div>
  );
}
