import { jsxs as xe, Fragment as Be, jsx as oe } from "react/jsx-runtime";
import { useRef as Re, Children as Ue, cloneElement as Ee } from "react";
function se(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(a);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(a, i).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function F(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? se(Object(t), !0).forEach(function(r) {
      Oe(a, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : se(Object(t)).forEach(function(r) {
      Object.defineProperty(a, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return a;
}
function Te(a, e) {
  if (!(a instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function le(a, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(a, me(r.key), r);
  }
}
function Ae(a, e, t) {
  return e && le(a.prototype, e), t && le(a, t), Object.defineProperty(a, "prototype", {
    writable: !1
  }), a;
}
function Oe(a, e, t) {
  return e = me(e), e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function k() {
  return k = Object.assign ? Object.assign.bind() : function(a) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (a[r] = t[r]);
    }
    return a;
  }, k.apply(this, arguments);
}
function Pe(a, e) {
  if (typeof a != "object" || a === null) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(a, e);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(a);
}
function me(a) {
  var e = Pe(a, "string");
  return typeof e == "symbol" ? e : String(e);
}
var ve = { exports: {} };
(function(a) {
  typeof window > "u" || (function(e) {
    var t = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype, r = e.Blob && (function() {
      try {
        return !!new Blob();
      } catch {
        return !1;
      }
    })(), i = r && e.Uint8Array && (function() {
      try {
        return new Blob([new Uint8Array(100)]).size === 100;
      } catch {
        return !1;
      }
    })(), n = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder, u = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, f = (r || n) && e.atob && e.ArrayBuffer && e.Uint8Array && function(l) {
      var s, c, h, d, v, o, b, m, y;
      if (s = l.match(u), !s)
        throw new Error("invalid data URI");
      for (c = s[2] ? s[1] : "text/plain" + (s[3] || ";charset=US-ASCII"), h = !!s[4], d = l.slice(s[0].length), h ? v = atob(d) : v = decodeURIComponent(d), o = new ArrayBuffer(v.length), b = new Uint8Array(o), m = 0; m < v.length; m += 1)
        b[m] = v.charCodeAt(m);
      return r ? new Blob([i ? b : o], {
        type: c
      }) : (y = new n(), y.append(o), y.getBlob(c));
    };
    e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function(l, s, c) {
      var h = this;
      setTimeout(function() {
        c && t.toDataURL && f ? l(f(h.toDataURL(s, c))) : l(h.mozGetAsFile("blob", s));
      });
    } : t.toDataURL && f && (t.msToBlob ? t.toBlob = function(l, s, c) {
      var h = this;
      setTimeout(function() {
        (s && s !== "image/png" || c) && t.toDataURL && f ? l(f(h.toDataURL(s, c))) : l(h.msToBlob(s));
      });
    } : t.toBlob = function(l, s, c) {
      var h = this;
      setTimeout(function() {
        l(f(h.toDataURL(s, c)));
      });
    })), a.exports ? a.exports = f : e.dataURLtoBlob = f;
  })(window);
})(ve);
var fe = ve.exports, Ce = function(e) {
  return typeof Blob > "u" ? !1 : e instanceof Blob || Object.prototype.toString.call(e) === "[object Blob]";
}, ce = {
  /**
   * Indicates if output the original image instead of the compressed one
   * when the size of the compressed image is greater than the original one's
   * @type {boolean}
   */
  strict: !0,
  /**
   * Indicates if read the image's Exif Orientation information,
   * and then rotate or flip the image automatically.
   * @type {boolean}
   */
  checkOrientation: !0,
  /**
   * Indicates if retain the image's Exif information after compressed.
   * @type {boolean}
  */
  retainExif: !1,
  /**
   * The max width of the output image.
   * @type {number}
   */
  maxWidth: 1 / 0,
  /**
   * The max height of the output image.
   * @type {number}
   */
  maxHeight: 1 / 0,
  /**
   * The min width of the output image.
   * @type {number}
   */
  minWidth: 0,
  /**
   * The min height of the output image.
   * @type {number}
   */
  minHeight: 0,
  /**
   * The width of the output image.
   * If not specified, the natural width of the source image will be used.
   * @type {number}
   */
  width: void 0,
  /**
   * The height of the output image.
   * If not specified, the natural height of the source image will be used.
   * @type {number}
   */
  height: void 0,
  /**
   * Sets how the size of the image should be resized to the container
   * specified by the `width` and `height` options.
   * @type {string}
   */
  resize: "none",
  /**
   * The quality of the output image.
   * It must be a number between `0` and `1`,
   * and only available for `image/jpeg` and `image/webp` images.
   * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
   * @type {number}
   */
  quality: 0.8,
  /**
   * The mime type of the output image.
   * By default, the original mime type of the source image file will be used.
   * @type {string}
   */
  mimeType: "auto",
  /**
   * Files whose file type is included in this list,
   * and whose file size exceeds the `convertSize` value will be converted to JPEGs.
   * @type {string｜Array}
   */
  convertTypes: ["image/png"],
  /**
   * PNG files over this size (5 MB by default) will be converted to JPEGs.
   * To disable this, just set the value to `Infinity`.
   * @type {number}
   */
  convertSize: 5e6,
  /**
   * The hook function to execute before draw the image into the canvas for compression.
   * @type {Function}
   * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
   * @param {HTMLCanvasElement} canvas - The canvas for compression.
   * @example
   * function (context, canvas) {
   *   context.fillStyle = '#fff';
   * }
   */
  beforeDraw: null,
  /**
   * The hook function to execute after drew the image into the canvas for compression.
   * @type {Function}
   * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
   * @param {HTMLCanvasElement} canvas - The canvas for compression.
   * @example
   * function (context, canvas) {
   *   context.filter = 'grayscale(100%)';
   * }
   */
  drew: null,
  /**
   * The hook function to execute when success to compress the image.
   * @type {Function}
   * @param {File} file - The compressed image File object.
   * @example
   * function (file) {
   *   console.log(file);
   * }
   */
  success: null,
  /**
   * The hook function to execute when fail to compress the image.
   * @type {Function}
   * @param {Error} err - An Error object.
   * @example
   * function (err) {
   *   console.log(err.message);
   * }
   */
  error: null
}, je = typeof window < "u" && typeof window.document < "u", w = je ? window : {}, D = function(e) {
  return e > 0 && e < 1 / 0;
}, Fe = Array.prototype.slice;
function S(a) {
  return Array.from ? Array.from(a) : Fe.call(a);
}
var ke = /^image\/.+$/;
function z(a) {
  return ke.test(a);
}
function De(a) {
  var e = z(a) ? a.substr(6) : "";
  return e === "jpeg" && (e = "jpg"), ".".concat(e);
}
var ge = String.fromCharCode;
function Le(a, e, t) {
  var r = "", i;
  for (t += e, i = e; i < t; i += 1)
    r += ge(a.getUint8(i));
  return r;
}
var Ie = w.btoa;
function ue(a, e) {
  for (var t = [], r = 8192, i = new Uint8Array(a); i.length > 0; )
    t.push(ge.apply(null, S(i.subarray(0, r)))), i = i.subarray(r);
  return "data:".concat(e, ";base64,").concat(Ie(t.join("")));
}
function We(a) {
  var e = new DataView(a), t;
  try {
    var r, i, n;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var u = e.byteLength, f = 2; f + 1 < u; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          i = f;
          break;
        }
        f += 1;
      }
    if (i) {
      var l = i + 4, s = i + 10;
      if (Le(e, l, 4) === "Exif") {
        var c = e.getUint16(s);
        if (r = c === 18761, (r || c === 19789) && e.getUint16(s + 2, r) === 42) {
          var h = e.getUint32(s + 4, r);
          h >= 8 && (n = s + h);
        }
      }
    }
    if (n) {
      var d = e.getUint16(n, r), v, o;
      for (o = 0; o < d; o += 1)
        if (v = n + o * 12 + 2, e.getUint16(v, r) === 274) {
          v += 8, t = e.getUint16(v, r), e.setUint16(v, 1, r);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function Me(a) {
  var e = 0, t = 1, r = 1;
  switch (a) {
    // Flip horizontal
    case 2:
      t = -1;
      break;
    // Rotate left 180°
    case 3:
      e = -180;
      break;
    // Flip vertical
    case 4:
      r = -1;
      break;
    // Flip vertical and rotate right 90°
    case 5:
      e = 90, r = -1;
      break;
    // Rotate right 90°
    case 6:
      e = 90;
      break;
    // Flip horizontal and rotate right 90°
    case 7:
      e = 90, t = -1;
      break;
    // Rotate left 90°
    case 8:
      e = -90;
      break;
  }
  return {
    rotate: e,
    scaleX: t,
    scaleY: r
  };
}
var He = /\.\d*(?:0|9){12}\d*$/;
function he(a) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return He.test(a) ? Math.round(a * e) / e : a;
}
function j(a) {
  var e = a.aspectRatio, t = a.height, r = a.width, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "none", n = D(r), u = D(t);
  if (n && u) {
    var f = t * e;
    (i === "contain" || i === "none") && f > r || i === "cover" && f < r ? t = r / e : r = t * e;
  } else n ? t = r / e : u && (r = t * e);
  return {
    width: r,
    height: t
  };
}
function ze(a) {
  for (var e = S(new Uint8Array(a)), t = e.length, r = [], i = 0; i + 3 < t; ) {
    var n = e[i], u = e[i + 1];
    if (n === 255 && u === 218)
      break;
    if (n === 255 && u === 216)
      i += 2;
    else {
      var f = e[i + 2] * 256 + e[i + 3], l = i + f + 2, s = e.slice(i, l);
      r.push(s), i = l;
    }
  }
  return r.reduce(function(c, h) {
    return h[0] === 255 && h[1] === 225 ? c.concat(h) : c;
  }, []);
}
function Se(a, e) {
  var t = S(new Uint8Array(a));
  if (t[2] !== 255 || t[3] !== 224)
    return a;
  var r = t[4] * 256 + t[5], i = [255, 216].concat(e, t.slice(4 + r));
  return new Uint8Array(i);
}
var Ge = w.ArrayBuffer, H = w.FileReader, U = w.URL || w.webkitURL, Xe = /\.\w+$/, Ne = w.Compressor, Ye = /* @__PURE__ */ (function() {
  function a(e, t) {
    Te(this, a), this.file = e, this.exif = [], this.image = new Image(), this.options = F(F({}, ce), t), this.aborted = !1, this.result = null, this.init();
  }
  return Ae(a, [{
    key: "init",
    value: function() {
      var t = this, r = this.file, i = this.options;
      if (!Ce(r)) {
        this.fail(new Error("The first argument must be a File or Blob object."));
        return;
      }
      var n = r.type;
      if (!z(n)) {
        this.fail(new Error("The first argument must be an image File or Blob object."));
        return;
      }
      if (!U || !H) {
        this.fail(new Error("The current browser does not support image compression."));
        return;
      }
      Ge || (i.checkOrientation = !1, i.retainExif = !1);
      var u = n === "image/jpeg", f = u && i.checkOrientation, l = u && i.retainExif;
      if (U && !f && !l)
        this.load({
          url: U.createObjectURL(r)
        });
      else {
        var s = new H();
        this.reader = s, s.onload = function(c) {
          var h = c.target, d = h.result, v = {}, o = 1;
          f && (o = We(d), o > 1 && k(v, Me(o))), l && (t.exif = ze(d)), f || l ? !U || o > 1 ? v.url = ue(d, n) : v.url = U.createObjectURL(r) : v.url = d, t.load(v);
        }, s.onabort = function() {
          t.fail(new Error("Aborted to read the image with FileReader."));
        }, s.onerror = function() {
          t.fail(new Error("Failed to read the image with FileReader."));
        }, s.onloadend = function() {
          t.reader = null;
        }, f || l ? s.readAsArrayBuffer(r) : s.readAsDataURL(r);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var r = this, i = this.file, n = this.image;
      n.onload = function() {
        r.draw(F(F({}, t), {}, {
          naturalWidth: n.naturalWidth,
          naturalHeight: n.naturalHeight
        }));
      }, n.onabort = function() {
        r.fail(new Error("Aborted to load the image."));
      }, n.onerror = function() {
        r.fail(new Error("Failed to load the image."));
      }, w.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(w.navigator.userAgent) && (n.crossOrigin = "anonymous"), n.alt = i.name, n.src = t.url;
    }
  }, {
    key: "draw",
    value: function(t) {
      var r = this, i = t.naturalWidth, n = t.naturalHeight, u = t.rotate, f = u === void 0 ? 0 : u, l = t.scaleX, s = l === void 0 ? 1 : l, c = t.scaleY, h = c === void 0 ? 1 : c, d = this.file, v = this.image, o = this.options, b = document.createElement("canvas"), m = b.getContext("2d"), y = Math.abs(f) % 180 === 90, x = (o.resize === "contain" || o.resize === "cover") && D(o.width) && D(o.height), B = Math.max(o.maxWidth, 0) || 1 / 0, R = Math.max(o.maxHeight, 0) || 1 / 0, A = Math.max(o.minWidth, 0) || 0, O = Math.max(o.minHeight, 0) || 0, E = i / n, g = o.width, p = o.height;
      if (y) {
        var G = [R, B];
        B = G[0], R = G[1];
        var X = [O, A];
        A = X[0], O = X[1];
        var N = [p, g];
        g = N[0], p = N[1];
      }
      x && (E = g / p);
      var Y = j({
        aspectRatio: E,
        width: B,
        height: R
      }, "contain");
      B = Y.width, R = Y.height;
      var $ = j({
        aspectRatio: E,
        width: A,
        height: O
      }, "cover");
      if (A = $.width, O = $.height, x) {
        var V = j({
          aspectRatio: E,
          width: g,
          height: p
        }, o.resize);
        g = V.width, p = V.height;
      } else {
        var q = j({
          aspectRatio: E,
          width: g,
          height: p
        }), K = q.width;
        g = K === void 0 ? i : K;
        var J = q.height;
        p = J === void 0 ? n : J;
      }
      g = Math.floor(he(Math.min(Math.max(g, A), B))), p = Math.floor(he(Math.min(Math.max(p, O), R)));
      var de = -g / 2, be = -p / 2, ye = g, we = p, L = [];
      if (x) {
        var Q = 0, Z = 0, I = i, W = n, _ = j({
          aspectRatio: E,
          width: i,
          height: n
        }, {
          contain: "cover",
          cover: "contain"
        }[o.resize]);
        I = _.width, W = _.height, Q = (i - I) / 2, Z = (n - W) / 2, L.push(Q, Z, I, W);
      }
      if (L.push(de, be, ye, we), y) {
        var ee = [p, g];
        g = ee[0], p = ee[1];
      }
      b.width = g, b.height = p, z(o.mimeType) || (o.mimeType = d.type);
      var te = "transparent";
      d.size > o.convertSize && o.convertTypes.indexOf(o.mimeType) >= 0 && (o.mimeType = "image/jpeg");
      var re = o.mimeType === "image/jpeg";
      if (re && (te = "#fff"), m.fillStyle = te, m.fillRect(0, 0, g, p), o.beforeDraw && o.beforeDraw.call(this, m, b), !this.aborted && (m.save(), m.translate(g / 2, p / 2), m.rotate(f * Math.PI / 180), m.scale(s, h), m.drawImage.apply(m, [v].concat(L)), m.restore(), o.drew && o.drew.call(this, m, b), !this.aborted)) {
        var ae = function(P) {
          if (!r.aborted) {
            var ie = function(C) {
              return r.done({
                naturalWidth: i,
                naturalHeight: n,
                result: C
              });
            };
            if (P && re && o.retainExif && r.exif && r.exif.length > 0) {
              var ne = function(C) {
                return ie(fe(ue(Se(C, r.exif), o.mimeType)));
              };
              if (P.arrayBuffer)
                P.arrayBuffer().then(ne).catch(function() {
                  r.fail(new Error("Failed to read the compressed image with Blob.arrayBuffer()."));
                });
              else {
                var T = new H();
                r.reader = T, T.onload = function(M) {
                  var C = M.target;
                  ne(C.result);
                }, T.onabort = function() {
                  r.fail(new Error("Aborted to read the compressed image with FileReader."));
                }, T.onerror = function() {
                  r.fail(new Error("Failed to read the compressed image with FileReader."));
                }, T.onloadend = function() {
                  r.reader = null;
                }, T.readAsArrayBuffer(P);
              }
            } else
              ie(P);
          }
        };
        b.toBlob ? b.toBlob(ae, o.mimeType, o.quality) : ae(fe(b.toDataURL(o.mimeType, o.quality)));
      }
    }
  }, {
    key: "done",
    value: function(t) {
      var r = t.naturalWidth, i = t.naturalHeight, n = t.result, u = this.file, f = this.image, l = this.options;
      if (U && f.src.indexOf("blob:") === 0 && U.revokeObjectURL(f.src), n)
        if (l.strict && !l.retainExif && n.size > u.size && l.mimeType === u.type && !(l.width > r || l.height > i || l.minWidth > r || l.minHeight > i || l.maxWidth < r || l.maxHeight < i))
          n = u;
        else {
          var s = /* @__PURE__ */ new Date();
          n.lastModified = s.getTime(), n.lastModifiedDate = s, n.name = u.name, n.name && n.type !== u.type && (n.name = n.name.replace(Xe, De(n.type)));
        }
      else
        n = u;
      this.result = n, l.success && l.success.call(this, n);
    }
  }, {
    key: "fail",
    value: function(t) {
      var r = this.options;
      if (r.error)
        r.error.call(this, t);
      else
        throw t;
    }
  }, {
    key: "abort",
    value: function() {
      this.aborted || (this.aborted = !0, this.reader ? this.reader.abort() : this.image.complete ? this.fail(new Error("The compression process has been aborted.")) : (this.image.onload = null, this.image.onabort()));
    }
    /**
     * Get the no conflict compressor class.
     * @returns {Compressor} The compressor class.
     */
  }], [{
    key: "noConflict",
    value: function() {
      return window.Compressor = Ne, a;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
  }, {
    key: "setDefaults",
    value: function(t) {
      k(ce, t);
    }
  }]), a;
})(), pe = /* @__PURE__ */ ((a) => (a.png = "image/png", a.jpg = "image/jpeg", a.webp = "image/webp", a))(pe || {});
const Je = ({
  children: a,
  maxWidth: e = 1024,
  compress: t = 0.7,
  type: r = pe.webp,
  multiple: i = !1,
  onCapture: n
}) => {
  const u = Re(null), f = () => {
    u.current?.click();
  }, l = async (s) => {
    const c = s.target.files;
    if (c) {
      const h = i ? c : { 0: c[0] };
      !i && c.length > 1 && console.warn(
        "[CaptureProvider] multiple is false, but more than one file selected. Only the first file will be processed."
      );
      const d = Object.values(h).map(async (m) => await $e(m, { quality: t, mimeType: r, maxWidth: e })), o = (await Promise.all(d)).map(async (m) => {
        const y = URL.createObjectURL(m), x = new Image();
        x.src = y, await x.decode();
        const { width: B, height: R } = x;
        return {
          width: B,
          height: R,
          url: y
        };
      }), b = await Promise.all(o);
      n?.(b), u.current && (u.current.value = "");
    }
  };
  return Ue.map(a, (s) => {
    const c = s;
    return /* @__PURE__ */ xe(Be, { children: [
      typeof s == "string" ? /* @__PURE__ */ oe(
        "div",
        {
          onClick: () => {
            c.props.onClick?.(), f();
          },
          children: s
        }
      ) : Ee(c, {
        ...c.props,
        onClick: () => {
          c.props.onClick?.(), f();
        }
      }),
      /* @__PURE__ */ oe(
        "input",
        {
          ref: u,
          style: { display: "none" },
          type: "file",
          accept: "image/png,image/jpeg,image/webp;capture=camera",
          onChange: l,
          multiple: i
        }
      )
    ] });
  });
}, $e = (a, e) => new Promise((t, r) => {
  new Ye(a, {
    quality: e.quality,
    mimeType: e.mimeType,
    maxWidth: e.maxWidth,
    success: (i) => t(i),
    error: (i) => r(i)
  });
});
export {
  pe as DOMString,
  Je as default
};
