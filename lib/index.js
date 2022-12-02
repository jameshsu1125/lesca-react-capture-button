"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _exifJs = _interopRequireDefault(require("exif-js"));
var _lescaUserAgent = _interopRequireDefault(require("lesca-user-agent"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var ToBase64 = function ToBase64(_ref) {
  var file = _ref.file,
    size = _ref.size,
    canvasRef = _ref.canvasRef,
    compress = _ref.compress;
  return new Promise(function (res) {
    var _canvasRef$current;
    var ctx = (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext('2d');
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var image = new Image();
      image.onload = function () {
        // resize canvas
        var width = image.width,
          height = image.height;
        var result = {
          width: width,
          height: height
        };
        if (width > height && width > size) {
          var scale = size / width;
          result.width = size;
          result.height = Math.floor(height * scale);
        } else if (width < height && height > size) {
          var _scale = size / height;
          result.width = Math.floor(width * _scale);
          result.height = size;
        }
        canvasRef.current.width = result.width;
        canvasRef.current.height = result.height;

        // get Exif
        _exifJs["default"].getData(image, function () {
          var ori = _lescaUserAgent["default"].get() === 'mobile' ? _exifJs["default"].getTag(image, 'Orientation') : 1;
          switch (ori) {
            case 1: // 水平(一般)
            case 6:
              ctx.drawImage(image, 0, 0, result.width, result.height);
              break;
            case 2:
              // 水平鏡像
              ctx.translate(result.width, 0);
              ctx.scale(-1, 1);
              ctx.drawImage(image, 0, 0, result.width, result.height);
              break;
            case 3:
              // 翻轉180度
              ctx.translate(result.width / 2, result.height / 2);
              ctx.rotate(180 * Math.PI / 180);
              ctx.drawImage(image, -result.width / 2, -result.height / 2, result.width, result.height);
              break;
            case 4:
              // 垂直鏡像
              ctx.translate(0, result.height);
              ctx.scale(1, -1);
              ctx.drawImage(image, 0, 0, result.width, result.height);
              break;
            case 5:
              // 水平鏡像後，順時鐘翻轉270度
              ctx.translate(result.width, 0);
              ctx.scale(-1, 1);
              ctx.translate(result.width / 2, result.height / 2);
              ctx.rotate(90 * Math.PI / 180);
              ctx.drawImage(image, -result.width / 2, -result.height / 2, result.width, result.height);
              break;
            //case 6: // 順時鐘翻轉270度
            // ctx.translate(w / 2, h / 2);
            // ctx.rotate((270 * Math.PI) / 180);
            // ctx.drawImage(image, -w / 2, -h / 2, w, h);
            //break;
            case 7:
              // 水平鏡像後，順時鐘翻轉90度
              ctx.translate(result.width, 0);
              ctx.scale(-1, 1);
              ctx.translate(result.width / 2, result.height / 2);
              ctx.rotate(270 * Math.PI / 180);
              ctx.drawImage(image, -result.width / 2, -result.height / 2, result.width, result.height);
              break;
            case 8:
              // 順時鐘翻轉90度
              ctx.translate(result.width / 2, result.height / 2);
              ctx.rotate(90 * Math.PI / 180);
              ctx.drawImage(image, -result.width / 2, -result.height / 2, result.width, result.height);
              break;
            default:
              ctx.drawImage(image, 0, 0, result.width, result.height);
              break;
          }
          res(canvasRef.current.toDataURL('image/png', compress));
        });
      };
      image.src = e.target.result;
    };
  });
};
ToBase64.defaultProps = {
  size: 500,
  compress: 1.0
};
var Button = function Button(_ref2) {
  var image = _ref2.image,
    onClick = _ref2.onClick,
    buttonRef = _ref2.buttonRef,
    className = _ref2.className,
    children = _ref2.children;
  return image ? /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
    ref: buttonRef,
    src: image,
    onClick: onClick,
    className: className
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ref: buttonRef,
    onClick: onClick,
    className: className,
    role: "none",
    children: children
  });
};
var CatureButton = function CatureButton(_ref3) {
  var image = _ref3.image,
    className = _ref3.className,
    onCapture = _ref3.onCapture,
    compress = _ref3.compress,
    size = _ref3.size,
    children = _ref3.children;
  var inputRef = (0, _react.useRef)();
  var canvasRef = (0, _react.useRef)();
  var buttonRef = (0, _react.useRef)();
  var onClick = (0, _react.useCallback)(function () {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.click();
  }, []);
  var onChange = function onChange(e) {
    var _e$target$files = (0, _slicedToArray2["default"])(e.target.files, 1),
      file = _e$target$files[0];
    ToBase64({
      file: file,
      canvasRef: canvasRef,
      size: size
    }).then(function (e) {
      onCapture(e);
      inputRef.current.value = '';
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Button, {
      image: image,
      buttonRef: buttonRef,
      onClick: onClick,
      className: className,
      compress: compress,
      size: size,
      children: children
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      style: {
        display: 'none'
      },
      ref: inputRef,
      onChange: onChange,
      type: "file",
      accept: "image/*;capture=camera"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("canvas", {
      ref: canvasRef,
      style: {
        display: 'none'
      }
    })]
  });
};
CatureButton.defaultProps = {
  image: '',
  className: ''
};
var _default = CatureButton;
exports["default"] = _default;