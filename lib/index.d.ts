import { DOMString, ProviderProps } from './type';
declare const CaptureProvider: {
    ({ children, maxWidth, compress, type, onCapture }: ProviderProps): import("react/jsx-runtime").JSX.Element[];
    defaultProps: {
        size: number;
        type: DOMString;
        compress: number;
    };
};
export default CaptureProvider;
