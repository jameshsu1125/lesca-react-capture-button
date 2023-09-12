import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import { useState } from 'react';
import CaptureProvider from '../../lib/index';
import { DOMString } from '../../lib/type';

const Demo = () => {
  const [base64, setBase64] = useState('');
  const [size, setSize] = useState(320);

  return (
    <div className='Demo'>
      <h2>Demo</h2>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          required
          id='outlined-required'
          label='image max size'
          defaultValue={size}
          type='number'
          onChange={(e) => {
            const { value } = e.target;
            if (value) setSize(parseInt(value));
          }}
        />
      </Box>
      <pre>
        <code>{base64}</code>
      </pre>
      <img src={base64} />
      <br />
      <ButtonGroup variant='contained'>
        <CaptureProvider
          type={DOMString.jpg}
          compress={1}
          maxWidth={size}
          onCapture={(data) => {
            const { image } = data;
            setBase64(image);
          }}
        >
          <Button>capture</Button>
        </CaptureProvider>
      </ButtonGroup>
    </div>
  );
};
export default Demo;
