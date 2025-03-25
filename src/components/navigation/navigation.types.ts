import { ReactNode } from "react";

export interface NavLinkInterface {
  label: string;
  href: string;
  Icon: () => ReactNode;
}
