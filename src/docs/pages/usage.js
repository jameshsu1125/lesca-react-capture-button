import { Button, ButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import Code from '../components/code';
import { name } from '../config';

const codes = [
  {
    title: '1. Installation',
    code: `npm install ${name} --save`,
    type: 'text',
  },
  {
    title: '1. Useage',
    code: `import Button from '${name}';
    
<Button
  size={500}
  onCapture={(base64) => {
    console.log(base64)
  }}
  label='get a photo'
  compress={0.5}  // 0 ~ 1
/>
    `,
    type: 'js',
  },
];

const Usage = () => {
  useEffect(() => {}, []);
  return (
    <div className='Usage'>
      <h2>Usage</h2>
      <ButtonGroup variant='contained'>
        <Button>click</Button>
      </ButtonGroup>
    </div>
  );
};
export default Usage;
