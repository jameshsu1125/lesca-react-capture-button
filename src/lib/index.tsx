import { ChangeEvent, Children, cloneElement, useRef } from 'react';
import { DOMString, ProviderProps } from './type';
import { toBase64 } from './misc';

const CaptureProvider = ({ children, maxWidth, compress, type, onCapture }: ProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await toBase64({ file: e.target.files, maxWidth, compress, type, canvasRef });
    inputRef.current.value = '';
    onCapture?.(result);
  };

  return Children.map(children, (child) => (
    <>
      {cloneElement(child, {
        ...child.props,
        onClick: () => {
          child.props.onClick?.();
          onClick();
        },
      })}
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type='file'
        accept='image/png,image/jpg,image/webp;capture=camera'
        onChange={onChange}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  ));
};

CaptureProvider.defaultProps = {
  size: 1024,
  type: DOMString.png,
  compress: 0.7,
};

export default CaptureProvider;
