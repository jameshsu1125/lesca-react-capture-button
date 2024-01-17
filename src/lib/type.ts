import { ReactElement } from 'react';

export enum DOMString {
  png = 'image/png',
  jpg = 'image/jpeg',
  webp = 'image/webp',
}

export type TResult = {
  image: string;
  width: number;
  height: number;
};

export interface ProviderProps {
  children: ReactElement;
  maxWidth?: number;
  type?: DOMString;
  compress?: number;
  onCapture?: (e: TResult) => void;
}
