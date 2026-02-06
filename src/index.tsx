import UserAgent, { UserAgentType } from 'lesca-user-agent';
import { ChangeEvent, Children, cloneElement, useRef } from 'react';
import EXIF from './exif';
import { DOMString, ProviderProps, TResult } from './type';

const CaptureProvider = ({
  children,
  maxWidth = 1024,
  compress = 0.7,
  type = DOMString.png,
  multiple = false,
  onCapture,
}: ProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (canvasRef.current) {
      const files = e.target.files;
      if (files) {
        const currentFiles = multiple ? files : { 0: files[0] };
        if (!multiple && files.length > 1) {
          console.warn(
            '[CaptureProvider] multiple is false, but more than one file selected. Only the first file will be processed.',
          );
        }
        const results = Object.values(currentFiles).map(
          async (file) =>
            await FileToBase64({
              file,
              maxWidth,
              compress,
              type,
              canvas: canvasRef.current!,
            }),
        );
        const resolvedResults = await Promise.all(results);
        onCapture?.(resolvedResults);
        if (inputRef.current) inputRef.current.value = '';
      }
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
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </>
    );
  });
};

export default CaptureProvider;

type FileToBase64Props = {
  file: File;
  canvas: HTMLCanvasElement;
  maxWidth: number;
  compress?: number;
  type?: DOMString;
};

const FileToBase64 = ({ file, maxWidth, compress, type, canvas }: FileToBase64Props) => {
  const ctx = canvas.getContext('2d');

  return new Promise<TResult>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (r) => {
      const image = new Image();
      image.onload = (e) => {
        const { width, height } = image;
        const result = { width, height };
        if (width > maxWidth) {
          const scale = maxWidth / width;
          result.width = maxWidth;
          result.height = Math.floor(height * scale);
        }
        canvas.width = result.width;
        canvas.height = result.height;

        // @ts-ignore
        const fakeImage: string = e.currentTarget;
        EXIF.getData(fakeImage, () => {
          const orientation =
            UserAgent.get() === UserAgentType.Mobile ? EXIF.getTag(image, 'Orientation') : 1;
          switch (orientation) {
            case 1: // 水平(一般)
            case 6:
              ctx?.drawImage(image, 0, 0, result.width, result.height);
              break;

            case 2: // 水平鏡像
              ctx?.translate(result.width, 0);
              ctx?.scale(-1, 1);
              ctx?.drawImage(image, 0, 0, result.width, result.height);
              break;

            case 3: // 翻轉180度
              ctx?.translate(result.width / 2, result.height / 2);
              ctx?.rotate((180 * Math.PI) / 180);
              ctx?.drawImage(
                image,
                -result.width / 2,
                -result.height / 2,
                result.width,
                result.height,
              );
              break;

            case 4: // 垂直鏡像
              ctx?.translate(0, result.height);
              ctx?.scale(1, -1);
              ctx?.drawImage(image, 0, 0, result.width, result.height);
              break;

            case 5: // 水平鏡像後，順時鐘翻轉270度
              ctx?.translate(result.width, 0);
              ctx?.scale(-1, 1);
              ctx?.translate(result.width / 2, result.height / 2);
              ctx?.rotate((90 * Math.PI) / 180);
              ctx?.drawImage(
                image,
                -result.width / 2,
                -result.height / 2,
                result.width,
                result.height,
              );
              break;

            case 7: // 水平鏡像後，順時鐘翻轉90度
              ctx?.translate(result.width, 0);
              ctx?.scale(-1, 1);
              ctx?.translate(result.width / 2, result.height / 2);
              ctx?.rotate((270 * Math.PI) / 180);
              ctx?.drawImage(
                image,
                -result.width / 2,
                -result.height / 2,
                result.width,
                result.height,
              );
              break;

            case 8: // 順時鐘翻轉90度
              ctx?.translate(result.width / 2, result.height / 2);
              ctx?.rotate((90 * Math.PI) / 180);
              ctx?.drawImage(
                image,
                -result.width / 2,
                -result.height / 2,
                result.width,
                result.height,
              );
              break;

            default:
              ctx?.drawImage(image, 0, 0, result.width, result.height);
              break;
          }

          const base64 = canvas.toDataURL(`image/${type || DOMString.jpg}`, compress || 0.7);
          resolve({ image: base64, ...result });
        });
      };
      image.onerror = () => reject({ message: 'load image error' });
      image.src = String(r.target?.result);
    };
  });
};

export { DOMString, FileToBase64 };
