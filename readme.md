[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
$ npm install lesca-react-capture-button --save
```

# Usage

```javascript
import Button from 'lesca-react-capture-button';

render() {
    return (
        <Button
            onCapture={(e) => {
              console.log(e);  // output: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
            }}
            compress={1.0}
            size={300}
        />
    );
}

```

# Properties

| Properties |   type   |   description    | default |
| :--------- | :------: | :--------------: | ------: |
| onCapture  |   fun    |     callback     |         |
| compress   |  number  |  image compress  |     1.0 |
| size       |  number  | image width size |     500 |
| image      | url path | image as button  |         |
