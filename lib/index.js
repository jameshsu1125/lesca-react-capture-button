"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _react = require("react");
var _type = require("./type");
var _misc = require("./misc");
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var CaptureProvider = function CaptureProvider(_ref) {
  var _ref2;
  var children = _ref.children,
    maxWidth = _ref.maxWidth,
    compress = _ref.compress,
    type = _ref.type,
    onCapture = _ref.onCapture;
  var inputRef = (0, _react.useRef)(null);
  var canvasRef = (0, _react.useRef)(null);
  var _onClick = function onClick() {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.click();
  };
  var onChange = function onChange(_x) {
    return (_ref2 = _ref2 || (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
      var result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _misc.toBase64)({
              file: e.target.files,
              maxWidth: maxWidth,
              compress: compress,
              type: type,
              canvasRef: canvasRef
            });
          case 2:
            result = _context.sent;
            inputRef.current.value = '';
            onCapture === null || onCapture === void 0 || onCapture(result);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))).apply(this, arguments);
  };
  return _react.Children.map(children, function (child) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _react.cloneElement)(child, _objectSpread(_objectSpread({}, child.props), {}, {
        onClick: function onClick() {
          var _child$props$onClick, _child$props;
          (_child$props$onClick = (_child$props = child.props).onClick) === null || _child$props$onClick === void 0 || _child$props$onClick.call(_child$props);
          _onClick();
        }
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        ref: inputRef,
        style: {
          display: 'none'
        },
        type: "file",
        accept: "image/png,image/jpg,image/webp;capture=camera",
        onChange: onChange
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("canvas", {
        ref: canvasRef,
        style: {
          display: 'none'
        }
      })]
    });
  });
};
CaptureProvider.defaultProps = {
  size: 1024,
  type: _type.DOMString.png,
  compress: 0.7
};
var _default = CaptureProvider;
exports["default"] = _default;