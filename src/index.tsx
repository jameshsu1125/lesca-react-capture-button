import Compressor from 'compressorjs';
import { ChangeEvent, Children, useId } from 'react';
import { DOMString, ProviderProps } from './type';

const CaptureProvider = ({
  children,
  maxWidth = 1024,
  compress = 0.7,
  type = DOMString.webp,
  multiple = false,
  onCapture,
}: ProviderProps) => {
  const id = useId();

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
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        return {
          blob,
          width,
          height,
          base64,
          url,
        };
      });

      const results = await Promise.all(promisesImage);
      onCapture?.(results);
      e.target.value = '';
    }
  };

  return (
    <>
      {Children.map(children, (child) => (
        <label htmlFor={id} style={typeof child !== 'string' ? { display: 'contents' } : undefined}>
          {child}
        </label>
      ))}
      <input
        id={id}
        style={{ display: 'none' }}
        type='file'
        accept='image/png,image/jpeg,image/webp;capture=camera'
        onChange={onChange}
        multiple={multiple}
      />
    </>
  );
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
