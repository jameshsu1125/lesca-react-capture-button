import { ReactElement } from 'react';
export declare enum DOMString {
    png = "image/png",
    jpg = "image/jpeg",
    webp = "image/webp"
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
    multiple?: boolean;
    onCapture?: (e: TResult[]) => void;
}
