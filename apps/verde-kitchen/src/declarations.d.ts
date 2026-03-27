declare module "react-burger-menu" {
  import type { ComponentType, ReactNode } from "react";
  interface MenuProps {
    children?: ReactNode;
    [key: string]: unknown;
  }
  export const slide: ComponentType<MenuProps>;
  export const stack: ComponentType<MenuProps>;
  export const elastic: ComponentType<MenuProps>;
  export const bubble: ComponentType<MenuProps>;
  export const push: ComponentType<MenuProps>;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
