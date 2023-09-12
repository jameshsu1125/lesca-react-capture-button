"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBase64 = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _exifJs = _interopRequireDefault(require("exif-js"));
var _lescaUserAgent = _interopRequireDefault(require("lesca-user-agent"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var toBase64 = function toBase64(_ref) {
  var _canvasRef$current;
  var file = _ref.file,
    maxWidth = _ref.maxWidth,
    compress = _ref.compress,
    type = _ref.type,
    canvasRef = _ref.canvasRef;
  var _ref2 = (0, _toConsumableArray2["default"])(file),
    currentFile = _ref2[0];
  var ctx = (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext('2d');
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(currentFile);
    reader.onload = function (e) {
      var image = new Image();
      image.onload = function (event) {
        var width = image.width,
          height = image.height;
        var result = {
          width: width,
          height: height
        };
        if (width > maxWidth) {
          var scale = maxWidth / width;
          result.width = maxWidth;
          result.height = Math.floor(height * scale);
        }
        canvasRef.current.width = result.width;
        canvasRef.current.height = result.height;

        // @ts-ignore
        var fakeImage = event.currentTarget;
        _exifJs["default"].getData(fakeImage, function () {
          var orientation = _lescaUserAgent["default"].get() === 'mobile' ? _exifJs["default"].getTag(image, 'Orientation') : 1;
          switch (orientation) {
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

            // case 6: // 順時鐘翻轉270度
            // ctx.translate(w / 2, h / 2);
            // ctx.rotate((270 * Math.PI) / 180);
            // ctx.drawImage(image, -w / 2, -h / 2, w, h);
            // break;

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
          var base64 = canvasRef.current.toDataURL("image/".concat(type), compress);
          resolve(_objectSpread({
            image: base64
          }, result));
        });
      };
      image.onerror = function () {
        return reject({
          message: 'load image error'
        });
      };
      image.src = String(e.target.result);
    };
  });
};
exports.toBase64 = toBase64;