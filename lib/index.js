"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _exifJs = _interopRequireDefault(require("exif-js"));

var _lescaUserAgent = _interopRequireDefault(require("lesca-user-agent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CaptureButton = /*#__PURE__*/function (_Component) {
  _inherits(CaptureButton, _Component);

  var _super = _createSuper(CaptureButton);

  function CaptureButton(props) {
    _classCallCheck(this, CaptureButton);

    return _super.call(this, props);
  }

  _createClass(CaptureButton, [{
    key: "set",
    value: function set() {
      var _this = this;

      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        file: file,
        size: size,
        cb: cb
      };
      return function () {
        var file = option.file,
            _option$size = option.size,
            size = _option$size === void 0 ? _this.props.size || 500 : _option$size,
            cb = option.cb;

        var ctx = _this.refs.canvas.getContext('2d');

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (e) {
          var image = new Image();

          image.onload = function () {
            // change width / height
            var root = _this;
            var width = image.width,
                height = image.height;
            var w = width,
                h = height;

            switch (width > height) {
              case true:
                if (w > size) {
                  h = Math.round(h *= size / w);
                  w = size;
                }

                break;

              default:
                if (h > size) {
                  w = Math.round(w *= size / h);
                  h = size;
                }

            }

            _this.refs.canvas.width = w;
            _this.refs.canvas.height = h; // get Exif

            _exifJs["default"].getData(image, function () {
              var ori = _lescaUserAgent["default"].get() === 'mobile' ? _exifJs["default"].getTag(this, 'Orientation') : 1;

              switch (ori) {
                case 1:
                  // 水平(一般)
                  ctx.drawImage(image, 0, 0, w, h);
                  break;

                case 2:
                  // 水平鏡像
                  ctx.translate(w, 0);
                  ctx.scale(-1, 1);
                  ctx.drawImage(image, 0, 0, w, h);
                  break;

                case 3:
                  // 翻轉180度
                  ctx.translate(w / 2, h / 2);
                  ctx.rotate(180 * Math.PI / 180);
                  ctx.drawImage(image, -w / 2, -h / 2, w, h);
                  break;

                case 4:
                  // 垂直鏡像
                  ctx.translate(0, h);
                  ctx.scale(1, -1);
                  ctx.drawImage(image, 0, 0, w, h);
                  break;

                case 5:
                  // 水平鏡像後，順時鐘翻轉270度
                  ctx.translate(w, 0);
                  ctx.scale(-1, 1);
                  ctx.translate(w / 2, h / 2);
                  ctx.rotate(90 * Math.PI / 180);
                  ctx.drawImage(image, -w / 2, -h / 2, w, h);
                  break;

                case 6:
                  // 順時鐘翻轉270度
                  ctx.translate(w / 2, h / 2);
                  ctx.rotate(270 * Math.PI / 180);
                  ctx.drawImage(image, -w / 2, -h / 2, w, h);
                  break;

                case 7:
                  // 水平鏡像後，順時鐘翻轉90度
                  ctx.translate(w, 0);
                  ctx.scale(-1, 1);
                  ctx.translate(w / 2, h / 2);
                  ctx.rotate(270 * Math.PI / 180);
                  ctx.drawImage(image, -w / 2, -h / 2, w, h);
                  break;

                case 8:
                  // 順時鐘翻轉90度
                  ctx.translate(w / 2, h / 2);
                  ctx.rotate(90 * Math.PI / 180);
                  ctx.drawImage(image, -w / 2, -h / 2, w, h);
                  break;

                default:
                  ctx.drawImage(image, 0, 0, w, h);
                  break;
              }

              cb(root.refs.canvas.toDataURL('image/png', root.props.compress || 1.0));
            });
          };

          image.src = e.target.result;
        };
      }();
    }
  }, {
    key: "capture",
    value: function capture() {
      this.refs.input.click();
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var _this2 = this;

      var file = e.target.files[0];
      this.set({
        file: file,
        cb: function cb(e) {
          if (_this2.props.onCapture) _this2.props.onCapture(e);
        }
      });
    }
  }, {
    key: "append",
    value: function append() {
      if (this.props.img) return /*#__PURE__*/_react["default"].createElement("img", {
        onClick: this.capture.bind(this),
        src: this.props.img
      });else return /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.capture.bind(this)
      }, this.props.label ? this.props.label : 'Capture');
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.append(), /*#__PURE__*/_react["default"].createElement("input", {
        style: {
          display: 'none'
        },
        ref: "input",
        onChange: this.onChange.bind(this),
        type: "file",
        accept: "image/*",
        capture: "camera"
      }), /*#__PURE__*/_react["default"].createElement("canvas", {
        ref: "canvas",
        style: {
          display: 'none'
        }
      }));
    }
  }]);

  return CaptureButton;
}(_react.Component);

var _default = CaptureButton;
exports["default"] = _default;