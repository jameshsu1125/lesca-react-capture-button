import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import CaptureProvider from '.';
import { TResult } from './type';

const App = () => {
  const [r, setR] = useState<TResult[]>([]);
  return (
    <>
      {r && r.map((item, index) => <img key={index} src={item.image} alt='' />)}
      <CaptureProvider
        maxWidth={500}
        compress={0.5}
        onCapture={(e) => {
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
