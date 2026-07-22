import { DOMString, ProviderProps } from './type';
export type TResult = {
    url: string;
    blob: Blob;
    base64: string;
    width: number;
    height: number;
};
declare const CaptureProvider: ({ children, maxWidth, compress, type, multiple, onCapture, }: ProviderProps) => import("react").JSX.Element;
export default CaptureProvider;
export { DOMString };
