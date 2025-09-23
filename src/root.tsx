import ReactDOM from 'react-dom/client';
import CaptureProvider from '.';
import { useState } from 'react';

const App = () => {
  const [r, setR] = useState('');
  return (
    <>
      {r && <img src={r} alt='' />}
      <CaptureProvider
        maxWidth={500}
        compress={0.5}
        onCapture={(e) => {
          setR(e.image);
        }}
      >
        <div className='btn btn-primary'>asd</div>
      </CaptureProvider>
    </>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
