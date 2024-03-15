import { DOMString, ProviderProps, TResult } from './type';
declare const CaptureProvider: {
    ({ children, maxWidth, compress, type, onCapture }: ProviderProps): import("react/jsx-runtime").JSX.Element[];
    defaultProps: {
        size: number;
        type: DOMString;
        compress: number;
    };
};
export default CaptureProvider;
type FileToBase64Props = {
    file: File;
    canvas: HTMLCanvasElement;
    maxWidth: number;
    compress?: number;
    type?: DOMString;
};
declare const FileToBase64: ({ file, maxWidth, compress, type, canvas }: FileToBase64Props) => Promise<TResult>;
export { DOMString, FileToBase64 };
