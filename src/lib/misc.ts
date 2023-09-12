import EXIF from 'exif-js';
import UserAgent from 'lesca-user-agent';

export const toBase64 = ({ file, maxWidth, compress, type, canvasRef }) => {
  const [currentFile] = [...file];
  const ctx = canvasRef.current?.getContext('2d');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(currentFile);
    reader.onload = (e) => {
      const image = new Image();
      image.onload = (event) => {
        const { width, height } = image;
        const result = { width, height };

        if (width > maxWidth) {
          const scale = maxWidth / width;
          result.width = maxWidth;
          result.height = Math.floor(height * scale);
        }

        canvasRef.current.width = result.width;
        canvasRef.current.height = result.height;

        // @ts-ignore
        const fakeImage: string = event.currentTarget;

        EXIF.getData(fakeImage, () => {
          const orientation = UserAgent.get() === 'mobile' ? EXIF.getTag(image, 'Orientation') : 1;
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

            // case 6: // 順時鐘翻轉270度
            // ctx.translate(w / 2, h / 2);
            // ctx.rotate((270 * Math.PI) / 180);
            // ctx.drawImage(image, -w / 2, -h / 2, w, h);
            // break;

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

          const base64 = canvasRef.current.toDataURL(`image/${type}`, compress);
          resolve({ image: base64, ...result });
        });
      };

      image.onerror = () => reject({ message: 'load image error' });
      image.src = String(e.target.result);
    };
  });
};
