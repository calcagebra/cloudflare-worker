// .wrangler/tmp/bundle-MDz3PB/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// build/worker/shim.mjs
import H from "./345421a8e3def484d1d197ff3e9a0a6b3664efe2-index.wasm";
import Xe from "./345421a8e3def484d1d197ff3e9a0a6b3664efe2-index.wasm";
import { WorkerEntrypoint as De } from "cloudflare:workers";
var I = Object.defineProperty;
var D = (e, t) => {
  for (var n in t)
    I(e, n, { get: t[n], enumerable: true });
};
var m = {};
D(m, { ChromaSampling: () => et, IntoUnderlyingByteSource: () => O, IntoUnderlyingSink: () => z, IntoUnderlyingSource: () => q, MinifyConfig: () => T, PolishConfig: () => Z, R2Range: () => L, RequestRedirect: () => tt, __wbg_append_fcf463f0b4a8f219: () => It, __wbg_body_edb1908d3ceff3a1: () => Lt, __wbg_buffer_12d079cc21e14bdb: () => ke, __wbg_buffer_dd7f74bc60f1faab: () => Oe, __wbg_byobRequest_72fca99f9c32c193: () => Qt, __wbg_byteLength_58f7b4fab1919d44: () => qe, __wbg_byteOffset_81d60f7392524f62: () => Te, __wbg_call_27c0f87801dedf93: () => ce, __wbg_call_b3ca7c6051f9bec1: () => ye, __wbg_cause_3d9c85ebaf6b1155: () => me, __wbg_cf_b1ddc6b9d2f719aa: () => vt, __wbg_close_184931724d961ccc: () => Yt, __wbg_close_a994f9425dab445c: () => ne, __wbg_createElement_8bae7856a4bb7411: () => Ut, __wbg_crypto_1d1f22824a6a080c: () => Rt, __wbg_document_5100775d18896c16: () => Tt, __wbg_enqueue_ea194723156c0cc2: () => re, __wbg_error_8e3928cfb8a43e2b: () => Nt, __wbg_getRandomValues_3aa56aa6edec874c: () => zt, __wbg_getwithrefkey_edc2c8960f0f1191: () => xt, __wbg_globalThis_d1e6af4856ba331b: () => be, __wbg_global_207b558942527489: () => we, __wbg_headers_abb199c3be8d817c: () => Jt, __wbg_instanceof_ArrayBuffer_836825be07d4c9d2: () => de, __wbg_instanceof_Error_e20bb56fd5591a93: () => pe, __wbg_instanceof_HtmlElement_3bcc4ff70cfdcba5: () => Dt, __wbg_instanceof_Uint8Array_2b3bbecd033d19f6: () => Ce, __wbg_instanceof_Window_f401953a2cf86220: () => qt, __wbg_json_a4ff4ba48efc7bb8: () => Xt, __wbg_length_c20a40f15020d68a: () => Se, __wbg_method_83327ed2e3f3229c: () => Pt, __wbg_msCrypto_eb05e62b530a1508: () => Mt, __wbg_new_28c511d9baebfa89: () => le, __wbg_new_63b92bc8671ed464: () => Fe, __wbg_new_72fb9a18b5ae2624: () => fe, __wbg_new_81740750da40724f: () => xe, __wbg_new_ab6fd82b10560829: () => _e, __wbg_newnoargs_e258087cd0daa0ea: () => se, __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: () => Re, __wbg_newwithheaders_16233a08e765c2b0: () => ie, __wbg_newwithlength_e9b4878cebadb3d3: () => Me, __wbg_newwithoptbuffersourceandinit_a4fa81e77259bb96: () => Zt, __wbg_newwithoptreadablestreamandinit_0b825f969ca543d6: () => ee, __wbg_newwithoptstrandinit_219732174c595a25: () => te, __wbg_node_104a2ff8d6ea03a2: () => St, __wbg_offsetHeight_6a4b02ccf09957d7: () => Bt, __wbg_offsetWidth_f7da5da36bd7ebc2: () => Ht, __wbg_process_4a72847cc503995b: () => Ft, __wbg_queueMicrotask_3cbae2ec6b6cd3d6: () => At, __wbg_queueMicrotask_481971b0d87f3dd4: () => Et, __wbg_randomFillSync_5c9c955aa56b6049: () => Ot, __wbg_remove_49b0a5925a04b955: () => Wt, __wbg_require_cca90b1a94a0255b: () => Ct, __wbg_resolve_b0083a7967828ec8: () => ve, __wbg_respond_b1a43b2e3a06d525: () => Kt, __wbg_self_ce0dbfc45cf2f5be: () => ae, __wbg_setAttribute_3c9f6c303b696daa: () => $t, __wbg_set_1f9b04f170055d33: () => Le, __wbg_set_a47bac70306a19a7: () => je, __wbg_set_cb0e7a5c2dd66afd: () => ue, __wbg_settextContent_d271bab459cbb1ba: () => oe, __wbg_subarray_a1f73cd4b5b42fe1: () => ze, __wbg_then_0c86a60e8fcfe9f6: () => Ee, __wbg_then_a73caa9a87991566: () => Ae, __wbg_toString_ffe4c9ea3b3532e9: () => he, __wbg_url_7807f6a1fddc3e23: () => Vt, __wbg_versions_f686565e586dd935: () => jt, __wbg_view_7f0ce470793a340f: () => Gt, __wbg_window_c6fb939a7f436783: () => ge, __wbindgen_boolean_get: () => ft, __wbindgen_cb_drop: () => st, __wbindgen_closure_wrapper2136: () => Ie, __wbindgen_debug_string: () => Ue, __wbindgen_error_new: () => ct, __wbindgen_in: () => wt, __wbindgen_is_function: () => kt, __wbindgen_is_object: () => gt, __wbindgen_is_string: () => ht, __wbindgen_is_undefined: () => bt, __wbindgen_jsval_loose_eq: () => yt, __wbindgen_memory: () => We, __wbindgen_number_get: () => lt, __wbindgen_number_new: () => mt, __wbindgen_object_clone_ref: () => pt, __wbindgen_object_drop_ref: () => ut, __wbindgen_string_get: () => at, __wbindgen_string_new: () => dt, __wbindgen_throw: () => $e, fetch: () => U, getMemory: () => N });
var B = new WebAssembly.Instance(H, { "./index_bg.js": m });
var _ = B.exports;
function N() {
  return _.memory;
}
var h = new Array(128).fill(void 0);
h.push(void 0, null, true, false);
function r(e) {
  return h[e];
}
var v = h.length;
function P(e) {
  e < 132 || (h[e] = v, v = e);
}
function y(e) {
  let t = r(e);
  return P(e), t;
}
function p(e) {
  if (typeof e != "boolean")
    throw new Error(`expected a boolean argument, found ${typeof e}`);
}
var V = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
var W = new V("utf-8", { ignoreBOM: true, fatal: true });
W.decode();
var A = null;
function F() {
  return (A === null || A.byteLength === 0) && (A = new Uint8Array(_.memory.buffer)), A;
}
function l(e, t) {
  return e = e >>> 0, W.decode(F().subarray(e, e + t));
}
function i(e) {
  v === h.length && h.push(h.length + 1);
  let t = v;
  if (v = h[t], typeof v != "number")
    throw new Error("corrupt heap");
  return h[t] = e, t;
}
function c(e) {
  if (typeof e != "number")
    throw new Error(`expected a number argument, found ${typeof e}`);
}
var E = 0;
var J = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
var j = new J("utf-8");
var X = typeof j.encodeInto == "function" ? function(e, t) {
  return j.encodeInto(e, t);
} : function(e, t) {
  let n = j.encode(e);
  return t.set(n), { read: e.length, written: n.length };
};
function S(e, t, n) {
  if (typeof e != "string")
    throw new Error(`expected a string argument, found ${typeof e}`);
  if (n === void 0) {
    let d = j.encode(e), x = t(d.length, 1) >>> 0;
    return F().subarray(x, x + d.length).set(d), E = d.length, x;
  }
  let o = e.length, u = t(o, 1) >>> 0, g = F(), a = 0;
  for (; a < o; a++) {
    let d = e.charCodeAt(a);
    if (d > 127)
      break;
    g[u + a] = d;
  }
  if (a !== o) {
    a !== 0 && (e = e.slice(a)), u = n(u, o, o = a + e.length * 3, 1) >>> 0;
    let d = F().subarray(u + a, u + o), x = X(e, d);
    if (x.read !== e.length)
      throw new Error("failed to pass whole string");
    a += x.written, u = n(u, o, a, 1) >>> 0;
  }
  return E = a, u;
}
function b(e) {
  return e == null;
}
var k = null;
function w() {
  return (k === null || k.byteLength === 0) && (k = new Int32Array(_.memory.buffer)), k;
}
var R = null;
function G() {
  return (R === null || R.byteLength === 0) && (R = new Float64Array(_.memory.buffer)), R;
}
function M(e) {
  let t = typeof e;
  if (t == "number" || t == "boolean" || e == null)
    return `${e}`;
  if (t == "string")
    return `"${e}"`;
  if (t == "symbol") {
    let u = e.description;
    return u == null ? "Symbol" : `Symbol(${u})`;
  }
  if (t == "function") {
    let u = e.name;
    return typeof u == "string" && u.length > 0 ? `Function(${u})` : "Function";
  }
  if (Array.isArray(e)) {
    let u = e.length, g = "[";
    u > 0 && (g += M(e[0]));
    for (let a = 1; a < u; a++)
      g += ", " + M(e[a]);
    return g += "]", g;
  }
  let n = /\[object ([^\]]+)\]/.exec(toString.call(e)), o;
  if (n.length > 1)
    o = n[1];
  else
    return toString.call(e);
  if (o == "Object")
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : o;
}
var $ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => {
  _.__wbindgen_export_2.get(e.dtor)(e.a, e.b);
});
function K(e, t, n, o) {
  let u = { a: e, b: t, cnt: 1, dtor: n }, g = (...a) => {
    u.cnt++;
    let d = u.a;
    u.a = 0;
    try {
      return o(d, u.b, ...a);
    } finally {
      --u.cnt === 0 ? (_.__wbindgen_export_2.get(u.dtor)(d, u.b), $.unregister(u)) : u.a = d;
    }
  };
  return g.original = u, $.register(g, u, u), g;
}
function s(e, t) {
  try {
    return e.apply(this, t);
  } catch (n) {
    let o = function() {
      try {
        return n instanceof Error ? `${n.message}

Stack:
${n.stack}` : n.toString();
      } catch {
        return "<failed to stringify thrown value>";
      }
    }();
    throw console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", o), n;
  }
}
function Q(e, t, n) {
  c(e), c(t), _._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hfd7fc1cefe0a12df(e, t, i(n));
}
function U(e, t, n) {
  let o = _.fetch(i(e), i(t), i(n));
  return y(o);
}
function f(e, t) {
  try {
    return e.apply(this, t);
  } catch (n) {
    _.__wbindgen_exn_store(i(n));
  }
}
function Y(e, t, n, o) {
  c(e), c(t), _.wasm_bindgen__convert__closures__invoke2_mut__h4c8e63f08cabaff7(e, t, i(n), i(o));
}
var Z = Object.freeze({ Off: 0, 0: "Off", Lossy: 1, 1: "Lossy", Lossless: 2, 2: "Lossless" });
var tt = Object.freeze({ Error: 0, 0: "Error", Follow: 1, 1: "Follow", Manual: 2, 2: "Manual" });
var et = Object.freeze({ Cs420: 0, 0: "Cs420", Cs422: 1, 1: "Cs422", Cs444: 2, 2: "Cs444", Cs400: 3, 3: "Cs400" });
var nt = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => _.__wbg_intounderlyingbytesource_free(e >>> 0));
var O = class {
  constructor() {
    throw new Error("cannot invoke `new` directly");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    _.__wbg_intounderlyingbytesource_free(t);
  }
  get type() {
    let t, n;
    try {
      if (this.__wbg_ptr == 0)
        throw new Error("Attempt to use a moved value");
      let g = _.__wbindgen_add_to_stack_pointer(-16);
      c(this.__wbg_ptr), _.intounderlyingbytesource_type(g, this.__wbg_ptr);
      var o = w()[g / 4 + 0], u = w()[g / 4 + 1];
      return t = o, n = u, l(o, u);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, n, 1);
    }
  }
  get autoAllocateChunkSize() {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    return c(this.__wbg_ptr), _.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr) >>> 0;
  }
  start(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr), _.intounderlyingbytesource_start(this.__wbg_ptr, i(t));
  }
  pull(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr);
    let n = _.intounderlyingbytesource_pull(this.__wbg_ptr, i(t));
    return y(n);
  }
  cancel() {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    let t = this.__destroy_into_raw();
    c(t), _.intounderlyingbytesource_cancel(t);
  }
};
var rt = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => _.__wbg_intounderlyingsink_free(e >>> 0));
var z = class {
  constructor() {
    throw new Error("cannot invoke `new` directly");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    _.__wbg_intounderlyingsink_free(t);
  }
  write(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr);
    let n = _.intounderlyingsink_write(this.__wbg_ptr, i(t));
    return y(n);
  }
  close() {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    let t = this.__destroy_into_raw();
    c(t);
    let n = _.intounderlyingsink_close(t);
    return y(n);
  }
  abort(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    let n = this.__destroy_into_raw();
    c(n);
    let o = _.intounderlyingsink_abort(n, i(t));
    return y(o);
  }
};
var ot = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => _.__wbg_intounderlyingsource_free(e >>> 0));
var q = class {
  constructor() {
    throw new Error("cannot invoke `new` directly");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ot.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    _.__wbg_intounderlyingsource_free(t);
  }
  pull(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr);
    let n = _.intounderlyingsource_pull(this.__wbg_ptr, i(t));
    return y(n);
  }
  cancel() {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    let t = this.__destroy_into_raw();
    c(t), _.intounderlyingsource_cancel(t);
  }
};
var _t = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => _.__wbg_minifyconfig_free(e >>> 0));
var T = class {
  constructor() {
    throw new Error("cannot invoke `new` directly");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _t.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    _.__wbg_minifyconfig_free(t);
  }
  get js() {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    return c(this.__wbg_ptr), _.__wbg_get_minifyconfig_js(this.__wbg_ptr) !== 0;
  }
  set js(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr), p(t), _.__wbg_set_minifyconfig_js(this.__wbg_ptr, t);
  }
  get html() {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    return c(this.__wbg_ptr), _.__wbg_get_minifyconfig_html(this.__wbg_ptr) !== 0;
  }
  set html(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr), p(t), _.__wbg_set_minifyconfig_html(this.__wbg_ptr, t);
  }
  get css() {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    return c(this.__wbg_ptr), _.__wbg_get_minifyconfig_css(this.__wbg_ptr) !== 0;
  }
  set css(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr), p(t), _.__wbg_set_minifyconfig_css(this.__wbg_ptr, t);
  }
};
var it = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => _.__wbg_r2range_free(e >>> 0));
var L = class {
  constructor() {
    throw new Error("cannot invoke `new` directly");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, it.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    _.__wbg_r2range_free(t);
  }
  get offset() {
    try {
      if (this.__wbg_ptr == 0)
        throw new Error("Attempt to use a moved value");
      let o = _.__wbindgen_add_to_stack_pointer(-16);
      c(this.__wbg_ptr), _.__wbg_get_r2range_offset(o, this.__wbg_ptr);
      var t = w()[o / 4 + 0], n = w()[o / 4 + 1];
      return t === 0 ? void 0 : n >>> 0;
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set offset(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr), b(t) || c(t), _.__wbg_set_r2range_offset(this.__wbg_ptr, !b(t), b(t) ? 0 : t);
  }
  get length() {
    try {
      if (this.__wbg_ptr == 0)
        throw new Error("Attempt to use a moved value");
      let o = _.__wbindgen_add_to_stack_pointer(-16);
      c(this.__wbg_ptr), _.__wbg_get_r2range_length(o, this.__wbg_ptr);
      var t = w()[o / 4 + 0], n = w()[o / 4 + 1];
      return t === 0 ? void 0 : n >>> 0;
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set length(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr), b(t) || c(t), _.__wbg_set_r2range_length(this.__wbg_ptr, !b(t), b(t) ? 0 : t);
  }
  get suffix() {
    try {
      if (this.__wbg_ptr == 0)
        throw new Error("Attempt to use a moved value");
      let o = _.__wbindgen_add_to_stack_pointer(-16);
      c(this.__wbg_ptr), _.__wbg_get_r2range_suffix(o, this.__wbg_ptr);
      var t = w()[o / 4 + 0], n = w()[o / 4 + 1];
      return t === 0 ? void 0 : n >>> 0;
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set suffix(t) {
    if (this.__wbg_ptr == 0)
      throw new Error("Attempt to use a moved value");
    c(this.__wbg_ptr), b(t) || c(t), _.__wbg_set_r2range_suffix(this.__wbg_ptr, !b(t), b(t) ? 0 : t);
  }
};
function ut(e) {
  y(e);
}
function st(e) {
  let t = y(e).original;
  if (t.cnt-- == 1)
    return t.a = 0, true;
  let n = false;
  return p(n), n;
}
function ct(e, t) {
  let n = new Error(l(e, t));
  return i(n);
}
function ft(e) {
  let t = r(e), n = typeof t == "boolean" ? t ? 1 : 0 : 2;
  return c(n), n;
}
function at(e, t) {
  let n = r(t), o = typeof n == "string" ? n : void 0;
  var u = b(o) ? 0 : S(o, _.__wbindgen_malloc, _.__wbindgen_realloc), g = E;
  w()[e / 4 + 1] = g, w()[e / 4 + 0] = u;
}
function gt(e) {
  let t = r(e), n = typeof t == "object" && t !== null;
  return p(n), n;
}
function bt(e) {
  let t = r(e) === void 0;
  return p(t), t;
}
function wt(e, t) {
  let n = r(e) in r(t);
  return p(n), n;
}
function dt(e, t) {
  let n = l(e, t);
  return i(n);
}
function pt(e) {
  let t = r(e);
  return i(t);
}
function lt(e, t) {
  let n = r(t), o = typeof n == "number" ? n : void 0;
  b(o) || c(o), G()[e / 8 + 1] = b(o) ? 0 : o, w()[e / 4 + 0] = !b(o);
}
function mt(e) {
  return i(e);
}
function ht(e) {
  let t = typeof r(e) == "string";
  return p(t), t;
}
function yt(e, t) {
  let n = r(e) == r(t);
  return p(n), n;
}
function xt() {
  return s(function(e, t) {
    let n = r(e)[r(t)];
    return i(n);
  }, arguments);
}
function vt() {
  return f(function(e) {
    let t = r(e).cf;
    return b(t) ? 0 : i(t);
  }, arguments);
}
function Et() {
  return s(function(e) {
    queueMicrotask(r(e));
  }, arguments);
}
function At() {
  return s(function(e) {
    let t = r(e).queueMicrotask;
    return i(t);
  }, arguments);
}
function kt(e) {
  let t = typeof r(e) == "function";
  return p(t), t;
}
function Rt() {
  return s(function(e) {
    let t = r(e).crypto;
    return i(t);
  }, arguments);
}
function Ft() {
  return s(function(e) {
    let t = r(e).process;
    return i(t);
  }, arguments);
}
function jt() {
  return s(function(e) {
    let t = r(e).versions;
    return i(t);
  }, arguments);
}
function St() {
  return s(function(e) {
    let t = r(e).node;
    return i(t);
  }, arguments);
}
function Ct() {
  return f(function() {
    let e = module.require;
    return i(e);
  }, arguments);
}
function Mt() {
  return s(function(e) {
    let t = r(e).msCrypto;
    return i(t);
  }, arguments);
}
function Ot() {
  return f(function(e, t) {
    r(e).randomFillSync(y(t));
  }, arguments);
}
function zt() {
  return f(function(e, t) {
    r(e).getRandomValues(r(t));
  }, arguments);
}
function qt() {
  return s(function(e) {
    let t;
    try {
      t = r(e) instanceof Window;
    } catch {
      t = false;
    }
    let n = t;
    return p(n), n;
  }, arguments);
}
function Tt() {
  return s(function(e) {
    let t = r(e).document;
    return b(t) ? 0 : i(t);
  }, arguments);
}
function Lt() {
  return s(function(e) {
    let t = r(e).body;
    return b(t) ? 0 : i(t);
  }, arguments);
}
function Ut() {
  return f(function(e, t, n) {
    let o = r(e).createElement(l(t, n));
    return i(o);
  }, arguments);
}
function $t() {
  return f(function(e, t, n, o, u) {
    r(e).setAttribute(l(t, n), l(o, u));
  }, arguments);
}
function Wt() {
  return s(function(e) {
    r(e).remove();
  }, arguments);
}
function It() {
  return f(function(e, t) {
    r(e).append(r(t));
  }, arguments);
}
function Dt() {
  return s(function(e) {
    let t;
    try {
      t = r(e) instanceof HTMLElement;
    } catch {
      t = false;
    }
    let n = t;
    return p(n), n;
  }, arguments);
}
function Ht() {
  return s(function(e) {
    let t = r(e).offsetWidth;
    return c(t), t;
  }, arguments);
}
function Bt() {
  return s(function(e) {
    let t = r(e).offsetHeight;
    return c(t), t;
  }, arguments);
}
function Nt() {
  return s(function(e) {
    console.error(r(e));
  }, arguments);
}
function Pt() {
  return s(function(e, t) {
    let n = r(t).method, o = S(n, _.__wbindgen_malloc, _.__wbindgen_realloc), u = E;
    w()[e / 4 + 1] = u, w()[e / 4 + 0] = o;
  }, arguments);
}
function Vt() {
  return s(function(e, t) {
    let n = r(t).url, o = S(n, _.__wbindgen_malloc, _.__wbindgen_realloc), u = E;
    w()[e / 4 + 1] = u, w()[e / 4 + 0] = o;
  }, arguments);
}
function Jt() {
  return s(function(e) {
    let t = r(e).headers;
    return i(t);
  }, arguments);
}
function Xt() {
  return f(function(e) {
    let t = r(e).json();
    return i(t);
  }, arguments);
}
function Gt() {
  return s(function(e) {
    let t = r(e).view;
    return b(t) ? 0 : i(t);
  }, arguments);
}
function Kt() {
  return f(function(e, t) {
    r(e).respond(t >>> 0);
  }, arguments);
}
function Qt() {
  return s(function(e) {
    let t = r(e).byobRequest;
    return b(t) ? 0 : i(t);
  }, arguments);
}
function Yt() {
  return f(function(e) {
    r(e).close();
  }, arguments);
}
function Zt() {
  return f(function(e, t) {
    let n = new Response(r(e), r(t));
    return i(n);
  }, arguments);
}
function te() {
  return f(function(e, t, n) {
    let o = new Response(e === 0 ? void 0 : l(e, t), r(n));
    return i(o);
  }, arguments);
}
function ee() {
  return f(function(e, t) {
    let n = new Response(r(e), r(t));
    return i(n);
  }, arguments);
}
function ne() {
  return f(function(e) {
    r(e).close();
  }, arguments);
}
function re() {
  return f(function(e, t) {
    r(e).enqueue(r(t));
  }, arguments);
}
function oe() {
  return s(function(e, t, n) {
    r(e).textContent = t === 0 ? void 0 : l(t, n);
  }, arguments);
}
function _e() {
  return f(function() {
    let e = new Headers();
    return i(e);
  }, arguments);
}
function ie() {
  return f(function(e) {
    let t = new Headers(r(e));
    return i(t);
  }, arguments);
}
function ue() {
  return f(function(e, t, n, o, u) {
    r(e).set(l(t, n), l(o, u));
  }, arguments);
}
function se() {
  return s(function(e, t) {
    let n = new Function(l(e, t));
    return i(n);
  }, arguments);
}
function ce() {
  return f(function(e, t) {
    let n = r(e).call(r(t));
    return i(n);
  }, arguments);
}
function fe() {
  return s(function() {
    let e = new Object();
    return i(e);
  }, arguments);
}
function ae() {
  return f(function() {
    let e = self.self;
    return i(e);
  }, arguments);
}
function ge() {
  return f(function() {
    let e = window.window;
    return i(e);
  }, arguments);
}
function be() {
  return f(function() {
    let e = globalThis.globalThis;
    return i(e);
  }, arguments);
}
function we() {
  return f(function() {
    let e = global.global;
    return i(e);
  }, arguments);
}
function de() {
  return s(function(e) {
    let t;
    try {
      t = r(e) instanceof ArrayBuffer;
    } catch {
      t = false;
    }
    let n = t;
    return p(n), n;
  }, arguments);
}
function pe() {
  return s(function(e) {
    let t;
    try {
      t = r(e) instanceof Error;
    } catch {
      t = false;
    }
    let n = t;
    return p(n), n;
  }, arguments);
}
function le() {
  return s(function(e, t) {
    let n = new Error(l(e, t));
    return i(n);
  }, arguments);
}
function me() {
  return s(function(e) {
    let t = r(e).cause;
    return i(t);
  }, arguments);
}
function he() {
  return s(function(e) {
    let t = r(e).toString();
    return i(t);
  }, arguments);
}
function ye() {
  return f(function(e, t, n) {
    let o = r(e).call(r(t), r(n));
    return i(o);
  }, arguments);
}
function xe() {
  return s(function(e, t) {
    try {
      var n = { a: e, b: t }, o = (g, a) => {
        let d = n.a;
        n.a = 0;
        try {
          return Y(d, n.b, g, a);
        } finally {
          n.a = d;
        }
      };
      let u = new Promise(o);
      return i(u);
    } finally {
      n.a = n.b = 0;
    }
  }, arguments);
}
function ve() {
  return s(function(e) {
    let t = Promise.resolve(r(e));
    return i(t);
  }, arguments);
}
function Ee() {
  return s(function(e, t) {
    let n = r(e).then(r(t));
    return i(n);
  }, arguments);
}
function Ae() {
  return s(function(e, t, n) {
    let o = r(e).then(r(t), r(n));
    return i(o);
  }, arguments);
}
function ke() {
  return s(function(e) {
    let t = r(e).buffer;
    return i(t);
  }, arguments);
}
function Re() {
  return s(function(e, t, n) {
    let o = new Uint8Array(r(e), t >>> 0, n >>> 0);
    return i(o);
  }, arguments);
}
function Fe() {
  return s(function(e) {
    let t = new Uint8Array(r(e));
    return i(t);
  }, arguments);
}
function je() {
  return s(function(e, t, n) {
    r(e).set(r(t), n >>> 0);
  }, arguments);
}
function Se() {
  return s(function(e) {
    let t = r(e).length;
    return c(t), t;
  }, arguments);
}
function Ce() {
  return s(function(e) {
    let t;
    try {
      t = r(e) instanceof Uint8Array;
    } catch {
      t = false;
    }
    let n = t;
    return p(n), n;
  }, arguments);
}
function Me() {
  return s(function(e) {
    let t = new Uint8Array(e >>> 0);
    return i(t);
  }, arguments);
}
function Oe() {
  return s(function(e) {
    let t = r(e).buffer;
    return i(t);
  }, arguments);
}
function ze() {
  return s(function(e, t, n) {
    let o = r(e).subarray(t >>> 0, n >>> 0);
    return i(o);
  }, arguments);
}
function qe() {
  return s(function(e) {
    let t = r(e).byteLength;
    return c(t), t;
  }, arguments);
}
function Te() {
  return s(function(e) {
    let t = r(e).byteOffset;
    return c(t), t;
  }, arguments);
}
function Le() {
  return f(function(e, t, n) {
    let o = Reflect.set(r(e), r(t), r(n));
    return p(o), o;
  }, arguments);
}
function Ue(e, t) {
  let n = M(r(t)), o = S(n, _.__wbindgen_malloc, _.__wbindgen_realloc), u = E;
  w()[e / 4 + 1] = u, w()[e / 4 + 0] = o;
}
function $e(e, t) {
  throw new Error(l(e, t));
}
function We() {
  let e = _.memory;
  return i(e);
}
function Ie() {
  return s(function(e, t, n) {
    let o = K(e, t, 536, Q);
    return i(o);
  }, arguments);
}
var C = class extends De {
  async fetch(t) {
    return await U(t, this.env, this.ctx);
  }
  async queue(t) {
    return await (void 0)(t, this.env, this.ctx);
  }
  async scheduled(t) {
    return await (void 0)(t, this.env, this.ctx);
  }
};
var He = ["IntoUnderlyingByteSource", "IntoUnderlyingSink", "IntoUnderlyingSource", "MinifyConfig", "PolishConfig", "R2Range", "RequestRedirect", "fetch", "queue", "scheduled", "getMemory"];
Object.keys(m).map((e) => {
  He.includes(e) | e.startsWith("__") || (C.prototype[e] = m[e]);
});
var Ke = C;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// .wrangler/tmp/bundle-MDz3PB/middleware-insertion-facade.js
Ke.middleware = [
  middleware_ensure_req_body_drained_default,
  ...Ke.middleware ?? []
].filter(Boolean);
var middleware_insertion_facade_default = Ke;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-MDz3PB/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (worker.middleware === void 0 || worker.middleware.length === 0) {
    return worker;
  }
  for (const middleware of worker.middleware) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint(klass) {
  if (klass.middleware === void 0 || klass.middleware.length === 0) {
    return klass;
  }
  for (const middleware of klass.middleware) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  et as ChromaSampling,
  O as IntoUnderlyingByteSource,
  z as IntoUnderlyingSink,
  q as IntoUnderlyingSource,
  T as MinifyConfig,
  Z as PolishConfig,
  L as R2Range,
  tt as RequestRedirect,
  It as __wbg_append_fcf463f0b4a8f219,
  Lt as __wbg_body_edb1908d3ceff3a1,
  ke as __wbg_buffer_12d079cc21e14bdb,
  Oe as __wbg_buffer_dd7f74bc60f1faab,
  Qt as __wbg_byobRequest_72fca99f9c32c193,
  qe as __wbg_byteLength_58f7b4fab1919d44,
  Te as __wbg_byteOffset_81d60f7392524f62,
  ce as __wbg_call_27c0f87801dedf93,
  ye as __wbg_call_b3ca7c6051f9bec1,
  me as __wbg_cause_3d9c85ebaf6b1155,
  vt as __wbg_cf_b1ddc6b9d2f719aa,
  Yt as __wbg_close_184931724d961ccc,
  ne as __wbg_close_a994f9425dab445c,
  Ut as __wbg_createElement_8bae7856a4bb7411,
  Rt as __wbg_crypto_1d1f22824a6a080c,
  Tt as __wbg_document_5100775d18896c16,
  re as __wbg_enqueue_ea194723156c0cc2,
  Nt as __wbg_error_8e3928cfb8a43e2b,
  zt as __wbg_getRandomValues_3aa56aa6edec874c,
  xt as __wbg_getwithrefkey_edc2c8960f0f1191,
  be as __wbg_globalThis_d1e6af4856ba331b,
  we as __wbg_global_207b558942527489,
  Jt as __wbg_headers_abb199c3be8d817c,
  de as __wbg_instanceof_ArrayBuffer_836825be07d4c9d2,
  pe as __wbg_instanceof_Error_e20bb56fd5591a93,
  Dt as __wbg_instanceof_HtmlElement_3bcc4ff70cfdcba5,
  Ce as __wbg_instanceof_Uint8Array_2b3bbecd033d19f6,
  qt as __wbg_instanceof_Window_f401953a2cf86220,
  Xt as __wbg_json_a4ff4ba48efc7bb8,
  Se as __wbg_length_c20a40f15020d68a,
  Pt as __wbg_method_83327ed2e3f3229c,
  Mt as __wbg_msCrypto_eb05e62b530a1508,
  le as __wbg_new_28c511d9baebfa89,
  Fe as __wbg_new_63b92bc8671ed464,
  fe as __wbg_new_72fb9a18b5ae2624,
  xe as __wbg_new_81740750da40724f,
  _e as __wbg_new_ab6fd82b10560829,
  se as __wbg_newnoargs_e258087cd0daa0ea,
  Re as __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb,
  ie as __wbg_newwithheaders_16233a08e765c2b0,
  Me as __wbg_newwithlength_e9b4878cebadb3d3,
  Zt as __wbg_newwithoptbuffersourceandinit_a4fa81e77259bb96,
  ee as __wbg_newwithoptreadablestreamandinit_0b825f969ca543d6,
  te as __wbg_newwithoptstrandinit_219732174c595a25,
  St as __wbg_node_104a2ff8d6ea03a2,
  Bt as __wbg_offsetHeight_6a4b02ccf09957d7,
  Ht as __wbg_offsetWidth_f7da5da36bd7ebc2,
  Ft as __wbg_process_4a72847cc503995b,
  At as __wbg_queueMicrotask_3cbae2ec6b6cd3d6,
  Et as __wbg_queueMicrotask_481971b0d87f3dd4,
  Ot as __wbg_randomFillSync_5c9c955aa56b6049,
  Wt as __wbg_remove_49b0a5925a04b955,
  Ct as __wbg_require_cca90b1a94a0255b,
  ve as __wbg_resolve_b0083a7967828ec8,
  Kt as __wbg_respond_b1a43b2e3a06d525,
  ae as __wbg_self_ce0dbfc45cf2f5be,
  $t as __wbg_setAttribute_3c9f6c303b696daa,
  Le as __wbg_set_1f9b04f170055d33,
  je as __wbg_set_a47bac70306a19a7,
  ue as __wbg_set_cb0e7a5c2dd66afd,
  oe as __wbg_settextContent_d271bab459cbb1ba,
  ze as __wbg_subarray_a1f73cd4b5b42fe1,
  Ee as __wbg_then_0c86a60e8fcfe9f6,
  Ae as __wbg_then_a73caa9a87991566,
  he as __wbg_toString_ffe4c9ea3b3532e9,
  Vt as __wbg_url_7807f6a1fddc3e23,
  jt as __wbg_versions_f686565e586dd935,
  Gt as __wbg_view_7f0ce470793a340f,
  ge as __wbg_window_c6fb939a7f436783,
  ft as __wbindgen_boolean_get,
  st as __wbindgen_cb_drop,
  Ie as __wbindgen_closure_wrapper2136,
  Ue as __wbindgen_debug_string,
  ct as __wbindgen_error_new,
  wt as __wbindgen_in,
  kt as __wbindgen_is_function,
  gt as __wbindgen_is_object,
  ht as __wbindgen_is_string,
  bt as __wbindgen_is_undefined,
  yt as __wbindgen_jsval_loose_eq,
  We as __wbindgen_memory,
  lt as __wbindgen_number_get,
  mt as __wbindgen_number_new,
  pt as __wbindgen_object_clone_ref,
  ut as __wbindgen_object_drop_ref,
  at as __wbindgen_string_get,
  dt as __wbindgen_string_new,
  $e as __wbindgen_throw,
  middleware_loader_entry_default as default,
  U as fetch,
  N as getMemory,
  Xe as wasmModule
};
//# sourceMappingURL=shim.js.map
