declare module 'react-burger-menu' {
  import * as React from 'react';

  export interface Props {
    isOpen?: boolean;
    right?: boolean;
    width?: number | string;
    noOverlay?: boolean;
    disableAutoFocus?: boolean;
    customBurgerIcon?: React.ReactNode;
    customCrossIcon?: React.ReactNode;
    onStateChange?: (state: { isOpen: boolean }) => void;
    children?: React.ReactNode;
  }

  export const slide: React.ComponentType<Props>;
  export const stack: React.ComponentType<Props>;
  export const elastic: React.ComponentType<Props>;
  export const bubble: React.ComponentType<Props>;
  export const push: React.ComponentType<Props>;
  export const pushRotate: React.ComponentType<Props>;
  export const scaleDown: React.ComponentType<Props>;
  export const scaleRotate: React.ComponentType<Props>;
  export const fallDown: React.ComponentType<Props>;
  export const reveal: React.ComponentType<Props>;
}
