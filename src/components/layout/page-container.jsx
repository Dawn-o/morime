import { cn } from "@/lib/utils/cn";

export function PageContainer({
  children,
  className,
  maxWidth,
  noPadding = false,
  noPaddingY = false,
  noPaddingX = false,
  as: Component = "div",
  ...props
}) {
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

export function PageHeader({
  title,
  description,
  badge,
  className,
  centered = true,
  ...props
}) {
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
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// Section wrapper for content blocks with consistent spacing.
export function ContentSection({
  children,
  className,
  noPadding = false,
  ...props
}) {
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
