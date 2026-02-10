import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import CaptureProvider from '.';
import { DOMString, TResult } from './type';

const App = () => {
  const [r, setR] = useState<TResult[]>([]);
  return (
    <>
      {r && r.map((item, index) => <img key={index} src={item.base64} alt='' />)}
      <CaptureProvider
        maxWidth={768}
        compress={0.7}
        multiple
        type={DOMString.webp}
        onCapture={(e) => {
          console.log(e);

          setR(e);
        }}
      >
        <div className='btn btn-primary'>capture</div>
      </CaptureProvider>
    </>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
