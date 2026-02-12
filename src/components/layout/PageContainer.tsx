import { cn } from "@/lib/utils/Cn";
import type { ReactNode, ElementType } from "react";

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  noPadding?: boolean;
  noPaddingY?: boolean;
  noPaddingX?: boolean;
  as?: ElementType;
  [key: string]: any;
}

export function PageContainer({
  children,
  className,
  maxWidth,
  noPadding = false,
  noPaddingY = false,
  noPaddingX = false,
  as: Component = "div",
  ...props
}: PageContainerProps) {
  const maxWidthClasses = {
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn(
        "container mx-auto",
        maxWidth && maxWidthClasses[maxWidth],
        !noPadding && !noPaddingY && "py-8 sm:py-10",
        !noPadding && !noPaddingX && "px-4",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  className?: string;
  centered?: boolean;
  [key: string]: any;
}

export function PageHeader({
  title,
  description,
  badge,
  className,
  centered = true,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn("space-y-2 mb-8", centered && "text-center", className)}
      {...props}
    >
      {badge && (
        <div
          className={cn(
            "flex items-center gap-2 mb-4",
            centered && "justify-center",
          )}
        >
          {badge}
        </div>
      )}
      <h1 className="text-2xl font-bold text-foreground capitalize">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  [key: string]: any;
}

export function ContentSection({
  children,
  className,
  noPadding = false,
  ...props
}: ContentSectionProps) {
  return (
    <section
      className={cn(
        "container mx-auto",
        !noPadding && "pb-8 sm:pb-10 px-4",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
