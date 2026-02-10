import Compressor from 'compressorjs';
import { ChangeEvent, Children, cloneElement, useRef } from 'react';
import { DOMString, ProviderProps } from './type';

const CaptureProvider = ({
  children,
  maxWidth = 1024,
  compress = 0.7,
  type = DOMString.webp,
  multiple = false,
  onCapture,
}: ProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const currentFiles = multiple ? files : { 0: files[0] };
      if (!multiple && files.length > 1) {
        console.warn(
          '[CaptureProvider] multiple is false, but more than one file selected. Only the first file will be processed.',
        );
      }

      const promises = Object.values(currentFiles).map(async (file) => {
        return await compressImage(file, { quality: compress, mimeType: type, maxWidth });
      });

      const compressedBlobs = await Promise.all(promises);
      const promisesImage = compressedBlobs.map(async (blob) => {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.src = url;
        await img.decode();
        const { width, height } = img;
        return {
          width,
          height,
          url,
        };
      });

      const results = await Promise.all(promisesImage);
      onCapture?.(results);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return Children.map(children, (child) => {
    const element = child as React.ReactElement<any>;
    return (
      <>
        {typeof child === 'string' ? (
          <div
            onClick={() => {
              element.props.onClick?.();
              onClick();
            }}
          >
            {child}
          </div>
        ) : (
          cloneElement(element, {
            ...element.props,
            onClick: () => {
              element.props.onClick?.();
              onClick();
            },
          })
        )}
        <input
          ref={inputRef}
          style={{ display: 'none' }}
          type='file'
          accept='image/png,image/jpeg,image/webp;capture=camera'
          onChange={onChange}
          multiple={multiple}
        />
      </>
    );
  });
};

export default CaptureProvider;

const compressImage = (
  file: File,
  options: { quality: number; mimeType: string; maxWidth: number },
) => {
  return new Promise<Blob>((resolve, reject) => {
    new Compressor(file, {
      quality: options.quality,
      mimeType: options.mimeType,
      maxWidth: options.maxWidth,
      success: (compressedBlob) => resolve(compressedBlob),
      error: (err) => reject(err),
    });
  });
};

export { DOMString };
