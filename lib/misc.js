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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "exif-js", "lesca-user-agent"], function (require, exports, exif_js_1, lesca_user_agent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toBase64 = void 0;
    exif_js_1 = __importDefault(exif_js_1);
    lesca_user_agent_1 = __importStar(lesca_user_agent_1);
    var toBase64 = function (_a) {
        var _b;
        var file = _a.file, maxWidth = _a.maxWidth, compress = _a.compress, type = _a.type, canvasRef = _a.canvasRef;
        var currentFile = __spreadArray([], file, true)[0];
        var ctx = (_b = canvasRef.current) === null || _b === void 0 ? void 0 : _b.getContext('2d');
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(currentFile);
            reader.onload = function (e) {
                var image = new Image();
                image.onload = function (event) {
                    var width = image.width, height = image.height;
                    var result = { width: width, height: height };
                    if (width > maxWidth) {
                        var scale = maxWidth / width;
                        result.width = maxWidth;
                        result.height = Math.floor(height * scale);
                    }
                    canvasRef.current.width = result.width;
                    canvasRef.current.height = result.height;
                    // @ts-ignore
                    var fakeImage = event.currentTarget;
                    exif_js_1.default.getData(fakeImage, function () {
                        var orientation = lesca_user_agent_1.default.get() === lesca_user_agent_1.UserAgentType.Mobile ? exif_js_1.default.getTag(image, 'Orientation') : 1;
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
                            // case 6: // 順時鐘翻轉270度
                            // ctx.translate(w / 2, h / 2);
                            // ctx.rotate((270 * Math.PI) / 180);
                            // ctx.drawImage(image, -w / 2, -h / 2, w, h);
                            // break;
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
                        var base64 = canvasRef.current.toDataURL("image/".concat(type), compress);
                        resolve(__assign({ image: base64 }, result));
                    });
                };
                image.onerror = function () { return reject({ message: 'load image error' }); };
                image.src = String(e.target.result);
            };
        });
    };
    exports.toBase64 = toBase64;
});
