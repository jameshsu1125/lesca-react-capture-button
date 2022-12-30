[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

get base64 image use local file or mobile camera.

#### [Live Demo](https://jameshsu1125.github.io/lesca-react-capture-button/)

# Installation

```sh
npm install lesca-react-capture-button --save
```

## Usage

```JSX
import CatureButton from 'lesca-react-capture-button';

render() {
    return (
        <CatureButton
            onCapture={(e) => {
              console.log(e);  // output: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
            }}
            compress={1.0}
            size={300}
        >
            Capture
        </CatureButton>
    );
}

```

## Development

### props

| Properties               |     description      | default |
| :----------------------- | :------------------: | ------: |
| **onCapture**:_function_ |       callback       |     log |
| **compress**:_float_     |    image compress    |     1.0 |
| **size**:_int_           |    image max size    |     500 |
| **image**:_string_       | image replace button |         |
| **type**:_string_        |   "png" or "jpeg"    |   "png" |

### Features

- TypeScript
- maintain if necessary
