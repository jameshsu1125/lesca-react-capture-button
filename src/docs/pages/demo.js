import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import Button from '../../lib/index';

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
      <Button
        size={size}
        onCapture={(e) => {
          setBase64(e);
        }}
        label='get a photo'
      >
        capture
      </Button>
    </div>
  );
};
export default Demo;
