import NextLink from "next/link";
import type { ComponentProps } from "react";

export interface LinkProps extends ComponentProps<typeof NextLink> {
  prefetch?: boolean;
}

export function Link({ prefetch = false, ...props }: LinkProps) {
  return <NextLink prefetch={prefetch} {...props} />;
}
