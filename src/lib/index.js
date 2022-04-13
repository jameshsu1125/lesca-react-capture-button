import EXIF from 'exif-js';
import UserAgent from 'lesca-user-agent';
import { useCallback, useRef } from 'react';

const ToBase64 = ({ file, size, canvasRef, compress }) => {
  return new Promise((res) => {
    const ctx = canvasRef.current?.getContext('2d');

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const image = new Image();

      image.onload = () => {
        // resize canvas
        const { width, height } = image;
        const result = { width, height };

        if (width > height && width > size) {
          const scale = size / width;
          result.width = size;
          result.height = Math.floor(height * scale);
        } else if (width < height && height > size) {
          const scale = size / height;
          result.width = Math.floor(width * scale);
          result.height = size;
        }

        canvasRef.current.width = result.width;
        canvasRef.current.height = result.height;

        // get Exif
        EXIF.getData(image, () => {
          const ori = UserAgent.get() === 'mobile' ? EXIF.getTag(image, 'Orientation') : 1;

          switch (ori) {
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
            //case 6: // 順時鐘翻轉270度
            // ctx.translate(w / 2, h / 2);
            // ctx.rotate((270 * Math.PI) / 180);
            // ctx.drawImage(image, -w / 2, -h / 2, w, h);
            //break;
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
          res(canvasRef.current.toDataURL('image/png', compress));
        });
      };

      image.src = e.target.result;
    };
  });
};

ToBase64.defaultProps = {
  size: 500,
  compress: 1.0,
};

const Button = ({ image, onClick, buttonRef, label, className }) => {
  return image ? (
    <img ref={buttonRef} src={image} onClick={onClick} className={className} />
  ) : (
    <button ref={buttonRef} onClick={onClick} className={className} role='none'>
      {label}
    </button>
  );
};

const CatureButton = ({ image, label, className, onCapture, compress, size }) => {
  const inputRef = useRef();
  const canvasRef = useRef();
  const buttonRef = useRef();

  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onChange = (e) => {
    const [file] = e.target.files;
    ToBase64({ file, canvasRef, size }).then((e) => {
      onCapture(e);
      inputRef.current.value = '';
    });
  };

  return (
    <>
      <Button {...{ image, buttonRef, onClick, label, className, compress, size }} />
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onChange}
        type='file'
        accept='image/*;capture=camera'
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
};

CatureButton.defaultProps = {
  image: '',
  label: 'Capture',
  className: '',
};

export default CatureButton;
