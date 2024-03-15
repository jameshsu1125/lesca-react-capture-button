import { ChangeEvent, Children, cloneElement, useRef } from 'react';
import EXIF from './exif';
import { toBase64 } from './misc';
import { DOMString, ProviderProps } from './type';
import UserAgent, { UserAgentType } from 'lesca-user-agent';

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
        accept='image/png,image/jpeg,image/webp;capture=camera'
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

type FileToBase64Props = {
  file: File;
  canvas: HTMLCanvasElement;
  maxWidth: number;
  compress?: number;
  type?: DOMString;
};

const FileToBase64 = ({ file, maxWidth, compress, type, canvas }: FileToBase64Props) => {
  const ctx = canvas.getContext('2d');
  return new Promise((resolve, reject) => {
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
        const fakeImage: string = r.currentTarget;
        EXIF.getData(fakeImage, () => {
          const orientation =
            UserAgent.get() === UserAgentType.Mobile ? EXIF.getTag(image, 'Orientation') : 1;
          switch (orientation) {
            case 1: // 水平(一般)
            case 6:
              ctx.drawImage(image, 0, 0, result.width, result.height);
              break;

            case 2: // 水平鏡像
              ctx.translate(result.width, 0);
              ctx.scale(-1, 1);
              ctx.drawImage(image, 0, 0, result.width, result.height);
              break;

            case 3: // 翻轉180度
              ctx.translate(result.width / 2, result.height / 2);
              ctx.rotate((180 * Math.PI) / 180);
              ctx.drawImage(
                image,
                -result.width / 2,
                -result.height / 2,
                result.width,
                result.height,
              );
              break;

            case 4: // 垂直鏡像
              ctx.translate(0, result.height);
              ctx.scale(1, -1);
              ctx.drawImage(image, 0, 0, result.width, result.height);
              break;

            case 5: // 水平鏡像後，順時鐘翻轉270度
              ctx.translate(result.width, 0);
              ctx.scale(-1, 1);
              ctx.translate(result.width / 2, result.height / 2);
              ctx.rotate((90 * Math.PI) / 180);
              ctx.drawImage(
                image,
                -result.width / 2,
                -result.height / 2,
                result.width,
                result.height,
              );
              break;

            case 7: // 水平鏡像後，順時鐘翻轉90度
              ctx.translate(result.width, 0);
              ctx.scale(-1, 1);
              ctx.translate(result.width / 2, result.height / 2);
              ctx.rotate((270 * Math.PI) / 180);
              ctx.drawImage(
                image,
                -result.width / 2,
                -result.height / 2,
                result.width,
                result.height,
              );
              break;

            case 8: // 順時鐘翻轉90度
              ctx.translate(result.width / 2, result.height / 2);
              ctx.rotate((90 * Math.PI) / 180);
              ctx.drawImage(
                image,
                -result.width / 2,
                -result.height / 2,
                result.width,
                result.height,
              );
              break;

            default:
              ctx.drawImage(image, 0, 0, result.width, result.height);
              break;
          }

          const base64 = canvas.toDataURL(`image/${type || DOMString.jpg}`, compress | 0.7);
          resolve({ image: base64, ...result });
        });
      };
      image.onerror = () => reject({ message: 'load image error' });
      image.src = String(r.target.result);
    };
  });
};

export { DOMString, FileToBase64 };
