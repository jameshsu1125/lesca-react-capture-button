"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileToBase64 = exports.DOMString = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var exif_1 = __importDefault(require("./exif"));
var misc_1 = require("./misc");
var type_1 = require("./type");
Object.defineProperty(exports, "DOMString", { enumerable: true, get: function () { return type_1.DOMString; } });
var lesca_user_agent_1 = __importStar(require("lesca-user-agent"));
var CaptureProvider = function (_a) {
    var children = _a.children, _b = _a.maxWidth, maxWidth = _b === void 0 ? 1024 : _b, _c = _a.compress, compress = _c === void 0 ? 0.7 : _c, _d = _a.type, type = _d === void 0 ? type_1.DOMString.png : _d, onCapture = _a.onCapture;
    var inputRef = (0, react_1.useRef)(null);
    var canvasRef = (0, react_1.useRef)(null);
    var onClick = function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var onChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, misc_1.toBase64)({ file: e.target.files, maxWidth: maxWidth, compress: compress, type: type, canvasRef: canvasRef })];
                case 1:
                    result = _a.sent();
                    inputRef.current.value = '';
                    onCapture === null || onCapture === void 0 ? void 0 : onCapture(result);
                    return [2 /*return*/];
            }
        });
    }); };
    return react_1.Children.map(children, function (child) { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, react_1.cloneElement)(child, __assign(__assign({}, child.props), { onClick: function () {
                    var _a, _b;
                    (_b = (_a = child.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a);
                    onClick();
                } })), (0, jsx_runtime_1.jsx)("input", { ref: inputRef, style: { display: 'none' }, type: 'file', accept: 'image/png,image/jpeg,image/webp;capture=camera', onChange: onChange }), (0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, style: { display: 'none' } })] })); });
};
exports.default = CaptureProvider;
var FileToBase64 = function (_a) {
    var file = _a.file, maxWidth = _a.maxWidth, compress = _a.compress, type = _a.type, canvas = _a.canvas;
    var ctx = canvas.getContext('2d');
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (r) {
            var image = new Image();
            image.onload = function (e) {
                var width = image.width, height = image.height;
                var result = { width: width, height: height };
                if (width > maxWidth) {
                    var scale = maxWidth / width;
                    result.width = maxWidth;
                    result.height = Math.floor(height * scale);
                }
                canvas.width = result.width;
                canvas.height = result.height;
                // @ts-ignore
                var fakeImage = e.currentTarget;
                exif_1.default.getData(fakeImage, function () {
                    var orientation = lesca_user_agent_1.default.get() === lesca_user_agent_1.UserAgentType.Mobile ? exif_1.default.getTag(image, 'Orientation') : 1;
                    switch (orientation) {
                        case 1: // 水平(一般)
                        case 6:
                            ctx.drawImage(image, 0, 0, result.width, result.height);
                            break;
                        case 2: // 水平鏡像
                            ctx.translate(result.width, 0);
                            ctx.scale(-1, 1);
                            ctx.drawImage(image, 0, 0, result.width, result.height);
                            break;
                        case 3: // 翻轉180度
                            ctx.translate(result.width / 2, result.height / 2);
                            ctx.rotate((180 * Math.PI) / 180);
                            ctx.drawImage(image, -result.width / 2, -result.height / 2, result.width, result.height);
                            break;
                        case 4: // 垂直鏡像
                            ctx.translate(0, result.height);
                            ctx.scale(1, -1);
                            ctx.drawImage(image, 0, 0, result.width, result.height);
                            break;
                        case 5: // 水平鏡像後，順時鐘翻轉270度
                            ctx.translate(result.width, 0);
                            ctx.scale(-1, 1);
                            ctx.translate(result.width / 2, result.height / 2);
                            ctx.rotate((90 * Math.PI) / 180);
                            ctx.drawImage(image, -result.width / 2, -result.height / 2, result.width, result.height);
                            break;
                        case 7: // 水平鏡像後，順時鐘翻轉90度
                            ctx.translate(result.width, 0);
                            ctx.scale(-1, 1);
                            ctx.translate(result.width / 2, result.height / 2);
                            ctx.rotate((270 * Math.PI) / 180);
                            ctx.drawImage(image, -result.width / 2, -result.height / 2, result.width, result.height);
                            break;
                        case 8: // 順時鐘翻轉90度
                            ctx.translate(result.width / 2, result.height / 2);
                            ctx.rotate((90 * Math.PI) / 180);
                            ctx.drawImage(image, -result.width / 2, -result.height / 2, result.width, result.height);
                            break;
                        default:
                            ctx.drawImage(image, 0, 0, result.width, result.height);
                            break;
                    }
                    var base64 = canvas.toDataURL("image/".concat(type || type_1.DOMString.jpg), compress | 0.7);
                    resolve(__assign({ image: base64 }, result));
                });
            };
            image.onerror = function () { return reject({ message: 'load image error' }); };
            image.src = String(r.target.result);
        };
    });
};
exports.FileToBase64 = FileToBase64;
