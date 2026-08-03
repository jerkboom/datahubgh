import React from "react";
import { motion } from "framer-motion";
import { FolderX } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * EmptyState Component
 * Reusable feedback component for empty tables, lists, or missing data.
 * Features entry animations and accessible action buttons.
 */
export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg bg-muted/50 ${className || ""}`}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted text-muted-foreground">
        {icon || <FolderX className="w-8 h-8" />}
      </div>
      <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mb-6 text-sm text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="min-w-[120px]">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
