export type ToastType = 'success' | 'error' | 'warning' | 'info';

export enum ToastPosition {
  TopRight = 'top-right',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left'
}

export interface Toast {
  message: string;
  type: ToastType;
  position: ToastPosition;
  duration?: number;
}