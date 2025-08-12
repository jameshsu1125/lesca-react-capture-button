import ReactDOM from 'react-dom/client';
import CaptureProvider from '.';

const App = () => {
  return (
    <CaptureProvider
      onCapture={(e) => {
        console.log(e);
      }}
    >
      <div className='h-5 w-20 bg-red-500'>asd</div>
    </CaptureProvider>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
