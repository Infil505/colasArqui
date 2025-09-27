var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port) return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  }
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode(part[1]), value = decode(part[2]);
        if (key === null || value === null || key in result) continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix) prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode(key);
          value = encode(value);
          if (key === null || value === null) continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports2.stringify = querystringify;
    exports2.parse = querystring;
  }
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports2, module2) {
    "use strict";
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined") globalVar = window;
      else if (typeof global !== "undefined") globalVar = global;
      else if (typeof self !== "undefined") globalVar = self;
      else globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore) delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore) continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve(relative, base) {
      if (relative === "") return base;
      var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path[i] === ".") {
          path.splice(i, 1);
        } else if (path[i] === "..") {
          path.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0) unshift = true;
          path.splice(i, 1);
          up--;
        }
      }
      if (unshift) path.unshift("");
      if (last === "." || last === "..") path.push("");
      return path.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser) parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url[key] = address;
        } else if ("string" === typeof parse) {
          index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4]) url[key] = url[key].toLowerCase();
      }
      if (parser) url.query = parser(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port) value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify) stringify = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":") protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password) result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify(url.query) : url.query;
      if (query) result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash) result += url.hash;
      return result;
    }
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  }
});

// node_modules/buffer-more-ints/buffer-more-ints.js
var require_buffer_more_ints = __commonJS({
  "node_modules/buffer-more-ints/buffer-more-ints.js"(exports2, module2) {
    "use strict";
    var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
    var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
    var MAX_INT = 9007199254740991;
    function isContiguousInt(val) {
      return val <= MAX_INT && val >= -MAX_INT;
    }
    function assertContiguousInt(val) {
      if (!isContiguousInt(val)) {
        throw new TypeError("number cannot be represented as a contiguous integer");
      }
    }
    module2.exports.isContiguousInt = isContiguousInt;
    module2.exports.assertContiguousInt = assertContiguousInt;
    ["UInt", "Int"].forEach(function(sign) {
      var suffix = sign + "8";
      module2.exports["read" + suffix] = Buffer.prototype["read" + suffix].call;
      module2.exports["write" + suffix] = Buffer.prototype["write" + suffix].call;
      ["16", "32"].forEach(function(size) {
        ["LE", "BE"].forEach(function(endian) {
          var suffix2 = sign + size + endian;
          var read = Buffer.prototype["read" + suffix2];
          module2.exports["read" + suffix2] = function(buf, offset) {
            return read.call(buf, offset);
          };
          var write = Buffer.prototype["write" + suffix2];
          module2.exports["write" + suffix2] = function(buf, val, offset) {
            return write.call(buf, val, offset);
          };
        });
      });
    });
    function check_value(val, min, max) {
      val = +val;
      if (typeof val != "number" || val < min || val > max || Math.floor(val) !== val) {
        throw new TypeError('"value" argument is out of bounds');
      }
      return val;
    }
    function check_bounds(buf, offset, len) {
      if (offset < 0 || offset + len > buf.length) {
        throw new RangeError("Index out of range");
      }
    }
    function readUInt24BE(buf, offset) {
      return buf.readUInt8(offset) << 16 | buf.readUInt16BE(offset + 1);
    }
    module2.exports.readUInt24BE = readUInt24BE;
    function writeUInt24BE(buf, val, offset) {
      val = check_value(val, 0, 16777215);
      check_bounds(buf, offset, 3);
      buf.writeUInt8(val >>> 16, offset);
      buf.writeUInt16BE(val & 65535, offset + 1);
    }
    module2.exports.writeUInt24BE = writeUInt24BE;
    function readUInt40BE(buf, offset) {
      return (buf.readUInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
    }
    module2.exports.readUInt40BE = readUInt40BE;
    function writeUInt40BE(buf, val, offset) {
      val = check_value(val, 0, 1099511627775);
      check_bounds(buf, offset, 5);
      buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 1);
    }
    module2.exports.writeUInt40BE = writeUInt40BE;
    function readUInt48BE(buf, offset) {
      return buf.readUInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
    }
    module2.exports.readUInt48BE = readUInt48BE;
    function writeUInt48BE(buf, val, offset) {
      val = check_value(val, 0, 281474976710655);
      check_bounds(buf, offset, 6);
      buf.writeUInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 2);
    }
    module2.exports.writeUInt48BE = writeUInt48BE;
    function readUInt56BE(buf, offset) {
      return ((buf.readUInt8(offset) || 0) << 16 | buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
    }
    module2.exports.readUInt56BE = readUInt56BE;
    function writeUInt56BE(buf, val, offset) {
      val = check_value(val, 0, 72057594037927940);
      check_bounds(buf, offset, 7);
      if (val < 72057594037927940) {
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt8(hi >>> 16, offset);
        buf.writeUInt16BE(hi & 65535, offset + 1);
        buf.writeInt32BE(val & -1, offset + 3);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module2.exports.writeUInt56BE = writeUInt56BE;
    function readUInt64BE(buf, offset) {
      return buf.readUInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
    }
    module2.exports.readUInt64BE = readUInt64BE;
    function writeUInt64BE(buf, val, offset) {
      val = check_value(val, 0, 18446744073709552e3);
      check_bounds(buf, offset, 8);
      if (val < 18446744073709552e3) {
        buf.writeUInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module2.exports.writeUInt64BE = writeUInt64BE;
    function readUInt24LE(buf, offset) {
      return buf.readUInt8(offset + 2) << 16 | buf.readUInt16LE(offset);
    }
    module2.exports.readUInt24LE = readUInt24LE;
    function writeUInt24LE(buf, val, offset) {
      val = check_value(val, 0, 16777215);
      check_bounds(buf, offset, 3);
      buf.writeUInt16LE(val & 65535, offset);
      buf.writeUInt8(val >>> 16, offset + 2);
    }
    module2.exports.writeUInt24LE = writeUInt24LE;
    function readUInt40LE(buf, offset) {
      return (buf.readUInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readUInt40LE = readUInt40LE;
    function writeUInt40LE(buf, val, offset) {
      val = check_value(val, 0, 1099511627775);
      check_bounds(buf, offset, 5);
      buf.writeInt32LE(val & -1, offset);
      buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module2.exports.writeUInt40LE = writeUInt40LE;
    function readUInt48LE(buf, offset) {
      return buf.readUInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readUInt48LE = readUInt48LE;
    function writeUInt48LE(buf, val, offset) {
      val = check_value(val, 0, 281474976710655);
      check_bounds(buf, offset, 6);
      buf.writeInt32LE(val & -1, offset);
      buf.writeUInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module2.exports.writeUInt48LE = writeUInt48LE;
    function readUInt56LE(buf, offset) {
      return ((buf.readUInt8(offset + 6) || 0) << 16 | buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readUInt56LE = readUInt56LE;
    function writeUInt56LE(buf, val, offset) {
      val = check_value(val, 0, 72057594037927940);
      check_bounds(buf, offset, 7);
      if (val < 72057594037927940) {
        buf.writeInt32LE(val & -1, offset);
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt16LE(hi & 65535, offset + 4);
        buf.writeUInt8(hi >>> 16, offset + 6);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module2.exports.writeUInt56LE = writeUInt56LE;
    function readUInt64LE(buf, offset) {
      return buf.readUInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readUInt64LE = readUInt64LE;
    function writeUInt64LE(buf, val, offset) {
      val = check_value(val, 0, 18446744073709552e3);
      check_bounds(buf, offset, 8);
      if (val < 18446744073709552e3) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeUInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module2.exports.writeUInt64LE = writeUInt64LE;
    function readInt24BE(buf, offset) {
      return (buf.readInt8(offset) << 16) + buf.readUInt16BE(offset + 1);
    }
    module2.exports.readInt24BE = readInt24BE;
    function writeInt24BE(buf, val, offset) {
      val = check_value(val, -8388608, 8388607);
      check_bounds(buf, offset, 3);
      buf.writeInt8(val >> 16, offset);
      buf.writeUInt16BE(val & 65535, offset + 1);
    }
    module2.exports.writeInt24BE = writeInt24BE;
    function readInt40BE(buf, offset) {
      return (buf.readInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
    }
    module2.exports.readInt40BE = readInt40BE;
    function writeInt40BE(buf, val, offset) {
      val = check_value(val, -549755813888, 549755813887);
      check_bounds(buf, offset, 5);
      buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 1);
    }
    module2.exports.writeInt40BE = writeInt40BE;
    function readInt48BE(buf, offset) {
      return buf.readInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
    }
    module2.exports.readInt48BE = readInt48BE;
    function writeInt48BE(buf, val, offset) {
      val = check_value(val, -140737488355328, 140737488355327);
      check_bounds(buf, offset, 6);
      buf.writeInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 2);
    }
    module2.exports.writeInt48BE = writeInt48BE;
    function readInt56BE(buf, offset) {
      return (((buf.readInt8(offset) || 0) << 16) + buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
    }
    module2.exports.readInt56BE = readInt56BE;
    function writeInt56BE(buf, val, offset) {
      val = check_value(val, -576460752303423500, 36028797018963970);
      check_bounds(buf, offset, 7);
      if (val < 36028797018963970) {
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeInt8(hi >> 16, offset);
        buf.writeUInt16BE(hi & 65535, offset + 1);
        buf.writeInt32BE(val & -1, offset + 3);
      } else {
        buf[offset] = 127;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
      }
    }
    module2.exports.writeInt56BE = writeInt56BE;
    function readInt64BE(buf, offset) {
      return buf.readInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
    }
    module2.exports.readInt64BE = readInt64BE;
    function writeInt64BE(buf, val, offset) {
      val = check_value(val, -23611832414348226e5, 9223372036854776e3);
      check_bounds(buf, offset, 8);
      if (val < 9223372036854776e3) {
        buf.writeInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
      } else {
        buf[offset] = 127;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 255;
      }
    }
    module2.exports.writeInt64BE = writeInt64BE;
    function readInt24LE(buf, offset) {
      return (buf.readInt8(offset + 2) << 16) + buf.readUInt16LE(offset);
    }
    module2.exports.readInt24LE = readInt24LE;
    function writeInt24LE(buf, val, offset) {
      val = check_value(val, -8388608, 8388607);
      check_bounds(buf, offset, 3);
      buf.writeUInt16LE(val & 65535, offset);
      buf.writeInt8(val >> 16, offset + 2);
    }
    module2.exports.writeInt24LE = writeInt24LE;
    function readInt40LE(buf, offset) {
      return (buf.readInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readInt40LE = readInt40LE;
    function writeInt40LE(buf, val, offset) {
      val = check_value(val, -549755813888, 549755813887);
      check_bounds(buf, offset, 5);
      buf.writeInt32LE(val & -1, offset);
      buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module2.exports.writeInt40LE = writeInt40LE;
    function readInt48LE(buf, offset) {
      return buf.readInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readInt48LE = readInt48LE;
    function writeInt48LE(buf, val, offset) {
      val = check_value(val, -140737488355328, 140737488355327);
      check_bounds(buf, offset, 6);
      buf.writeInt32LE(val & -1, offset);
      buf.writeInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    }
    module2.exports.writeInt48LE = writeInt48LE;
    function readInt56LE(buf, offset) {
      return (((buf.readInt8(offset + 6) || 0) << 16) + buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readInt56LE = readInt56LE;
    function writeInt56LE(buf, val, offset) {
      val = check_value(val, -36028797018963970, 36028797018963970);
      check_bounds(buf, offset, 7);
      if (val < 36028797018963970) {
        buf.writeInt32LE(val & -1, offset);
        var hi = Math.floor(val * SHIFT_RIGHT_32);
        buf.writeUInt16LE(hi & 65535, offset + 4);
        buf.writeInt8(hi >> 16, offset + 6);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 127;
      }
    }
    module2.exports.writeInt56LE = writeInt56LE;
    function readInt64LE(buf, offset) {
      return buf.readInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
    }
    module2.exports.readInt64LE = readInt64LE;
    function writeInt64LE(buf, val, offset) {
      val = check_value(val, -9223372036854776e3, 9223372036854776e3);
      check_bounds(buf, offset, 8);
      if (val < 9223372036854776e3) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
      } else {
        buf[offset] = 255;
        buf[offset + 1] = 255;
        buf[offset + 2] = 255;
        buf[offset + 3] = 255;
        buf[offset + 4] = 255;
        buf[offset + 5] = 255;
        buf[offset + 6] = 255;
        buf[offset + 7] = 127;
      }
    }
    module2.exports.writeInt64LE = writeInt64LE;
  }
});

// node_modules/amqplib/lib/codec.js
var require_codec = __commonJS({
  "node_modules/amqplib/lib/codec.js"(exports2, module2) {
    "use strict";
    var ints = require_buffer_more_ints();
    function isFloatingPoint(n) {
      return n >= 9223372036854776e3 || Math.abs(n) < 1125899906842624 && Math.floor(n) !== n;
    }
    function encodeTable(buffer, val, offset) {
      var start = offset;
      offset += 4;
      for (var key in val) {
        if (val[key] !== void 0) {
          var len = Buffer.byteLength(key);
          buffer.writeUInt8(len, offset);
          offset++;
          buffer.write(key, offset, "utf8");
          offset += len;
          offset += encodeFieldValue(buffer, val[key], offset);
        }
      }
      var size = offset - start;
      buffer.writeUInt32BE(size - 4, start);
      return size;
    }
    function encodeArray(buffer, val, offset) {
      var start = offset;
      offset += 4;
      for (var i = 0, num = val.length; i < num; i++) {
        offset += encodeFieldValue(buffer, val[i], offset);
      }
      var size = offset - start;
      buffer.writeUInt32BE(size - 4, start);
      return size;
    }
    function encodeFieldValue(buffer, value, offset) {
      var start = offset;
      var type = typeof value, val = value;
      if (value && type === "object" && value.hasOwnProperty("!")) {
        val = value.value;
        type = value["!"];
      }
      if (type == "number") {
        if (isFloatingPoint(val)) {
          type = "double";
        } else {
          if (val < 128 && val >= -128) {
            type = "byte";
          } else if (val >= -32768 && val < 32768) {
            type = "short";
          } else if (val >= -2147483648 && val < 2147483648) {
            type = "int";
          } else {
            type = "long";
          }
        }
      }
      function tag(t) {
        buffer.write(t, offset);
        offset++;
      }
      switch (type) {
        case "string":
          var len = Buffer.byteLength(val, "utf8");
          tag("S");
          buffer.writeUInt32BE(len, offset);
          offset += 4;
          buffer.write(val, offset, "utf8");
          offset += len;
          break;
        case "object":
          if (val === null) {
            tag("V");
          } else if (Array.isArray(val)) {
            tag("A");
            offset += encodeArray(buffer, val, offset);
          } else if (Buffer.isBuffer(val)) {
            tag("x");
            buffer.writeUInt32BE(val.length, offset);
            offset += 4;
            val.copy(buffer, offset);
            offset += val.length;
          } else {
            tag("F");
            offset += encodeTable(buffer, val, offset);
          }
          break;
        case "boolean":
          tag("t");
          buffer.writeUInt8(val ? 1 : 0, offset);
          offset++;
          break;
        // These are the types that are either guessed above, or
        // explicitly given using the {'!': type} notation.
        case "double":
        case "float64":
          tag("d");
          buffer.writeDoubleBE(val, offset);
          offset += 8;
          break;
        case "byte":
        case "int8":
          tag("b");
          buffer.writeInt8(val, offset);
          offset++;
          break;
        case "unsignedbyte":
        case "uint8":
          tag("B");
          buffer.writeUInt8(val, offset);
          offset++;
          break;
        case "short":
        case "int16":
          tag("s");
          buffer.writeInt16BE(val, offset);
          offset += 2;
          break;
        case "unsignedshort":
        case "uint16":
          tag("u");
          buffer.writeUInt16BE(val, offset);
          offset += 2;
          break;
        case "int":
        case "int32":
          tag("I");
          buffer.writeInt32BE(val, offset);
          offset += 4;
          break;
        case "unsignedint":
        case "uint32":
          tag("i");
          buffer.writeUInt32BE(val, offset);
          offset += 4;
          break;
        case "long":
        case "int64":
          tag("l");
          ints.writeInt64BE(buffer, val, offset);
          offset += 8;
          break;
        // Now for exotic types, those can _only_ be denoted by using
        // `{'!': type, value: val}
        case "timestamp":
          tag("T");
          ints.writeUInt64BE(buffer, val, offset);
          offset += 8;
          break;
        case "float":
          tag("f");
          buffer.writeFloatBE(val, offset);
          offset += 4;
          break;
        case "decimal":
          tag("D");
          if (val.hasOwnProperty("places") && val.hasOwnProperty("digits") && val.places >= 0 && val.places < 256) {
            buffer[offset] = val.places;
            offset++;
            buffer.writeUInt32BE(val.digits, offset);
            offset += 4;
          } else throw new TypeError(
            "Decimal value must be {'places': 0..255, 'digits': uint32}, got " + JSON.stringify(val)
          );
          break;
        default:
          throw new TypeError("Unknown type to encode: " + type);
      }
      return offset - start;
    }
    function decodeFields(slice) {
      var fields = {}, offset = 0, size = slice.length;
      var len, key, val;
      function decodeFieldValue() {
        var tag = String.fromCharCode(slice[offset]);
        offset++;
        switch (tag) {
          case "b":
            val = slice.readInt8(offset);
            offset++;
            break;
          case "B":
            val = slice.readUInt8(offset);
            offset++;
            break;
          case "S":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = slice.toString("utf8", offset, offset + len);
            offset += len;
            break;
          case "I":
            val = slice.readInt32BE(offset);
            offset += 4;
            break;
          case "i":
            val = slice.readUInt32BE(offset);
            offset += 4;
            break;
          case "D":
            var places = slice[offset];
            offset++;
            var digits = slice.readUInt32BE(offset);
            offset += 4;
            val = { "!": "decimal", value: { places, digits } };
            break;
          case "T":
            val = ints.readUInt64BE(slice, offset);
            offset += 8;
            val = { "!": "timestamp", value: val };
            break;
          case "F":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = decodeFields(slice.subarray(offset, offset + len));
            offset += len;
            break;
          case "A":
            len = slice.readUInt32BE(offset);
            offset += 4;
            decodeArray(offset + len);
            break;
          case "d":
            val = slice.readDoubleBE(offset);
            offset += 8;
            break;
          case "f":
            val = slice.readFloatBE(offset);
            offset += 4;
            break;
          case "l":
            val = ints.readInt64BE(slice, offset);
            offset += 8;
            break;
          case "s":
            val = slice.readInt16BE(offset);
            offset += 2;
            break;
          case "u":
            val = slice.readUInt16BE(offset);
            offset += 2;
            break;
          case "t":
            val = slice[offset] != 0;
            offset++;
            break;
          case "V":
            val = null;
            break;
          case "x":
            len = slice.readUInt32BE(offset);
            offset += 4;
            val = slice.subarray(offset, offset + len);
            offset += len;
            break;
          default:
            throw new TypeError('Unexpected type tag "' + tag + '"');
        }
      }
      function decodeArray(until) {
        var vals = [];
        while (offset < until) {
          decodeFieldValue();
          vals.push(val);
        }
        val = vals;
      }
      while (offset < size) {
        len = slice.readUInt8(offset);
        offset++;
        key = slice.toString("utf8", offset, offset + len);
        offset += len;
        decodeFieldValue();
        fields[key] = val;
      }
      return fields;
    }
    module2.exports.encodeTable = encodeTable;
    module2.exports.decodeFields = decodeFields;
  }
});

// node_modules/amqplib/lib/defs.js
var require_defs = __commonJS({
  "node_modules/amqplib/lib/defs.js"(exports2, module2) {
    "use strict";
    function decodeBasicQos(buffer) {
      var val, offset = 0, fields = {
        prefetchSize: void 0,
        prefetchCount: void 0,
        global: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.prefetchSize = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.prefetchCount = val;
      val = !!(1 & buffer[offset]);
      fields.global = val;
      return fields;
    }
    function encodeBasicQos(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(19);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932170, 7);
      offset = 11;
      val = fields.prefetchSize;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'prefetchSize' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.prefetchCount;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'prefetchCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.global;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicQosOk(buffer) {
      return {};
    }
    function encodeBasicQosOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932171, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicConsume(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        consumerTag: void 0,
        noLocal: void 0,
        noAck: void 0,
        exclusive: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = !!(1 & buffer[offset]);
      fields.noLocal = val;
      val = !!(2 & buffer[offset]);
      fields.noAck = val;
      val = !!(4 & buffer[offset]);
      fields.exclusive = val;
      val = !!(8 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeBasicConsume(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.consumerTag;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932180, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.consumerTag;
      void 0 === val && (val = "");
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.noLocal;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.noAck;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 8);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicConsumeOk(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      return fields;
    }
    function encodeBasicConsumeOk(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932181, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicCancel(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0,
        nowait: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeBasicCancel(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(14 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932190, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicCancelOk(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      return fields;
    }
    function encodeBasicCancelOk(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932191, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicPublish(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        routingKey: void 0,
        mandatory: void 0,
        immediate: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.mandatory = val;
      val = !!(2 & buffer[offset]);
      fields.immediate = val;
      return fields;
    }
    function encodeBasicPublish(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932200, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = "");
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.mandatory;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.immediate;
      void 0 === val && (val = false);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicReturn(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        exchange: void 0,
        routingKey: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      return fields;
    }
    function encodeBasicReturn(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932210, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicDeliver(buffer) {
      var val, len, offset = 0, fields = {
        consumerTag: void 0,
        deliveryTag: void 0,
        redelivered: void 0,
        exchange: void 0,
        routingKey: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.consumerTag = val;
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.redelivered = val;
      offset++;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      return fields;
    }
    function encodeBasicDeliver(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.consumerTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerTag'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
      var consumerTag_len = Buffer.byteLength(val, "utf8");
      varyingSize += consumerTag_len;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(24 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932220, 7);
      offset = 11;
      val = fields.consumerTag;
      void 0 === val && (val = void 0);
      buffer[offset] = consumerTag_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += consumerTag_len;
      val = fields.deliveryTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.redelivered;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGet(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        noAck: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.noAck = val;
      return fields;
    }
    function encodeBasicGet(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932230, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.noAck;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGetOk(buffer) {
      var val, len, offset = 0, fields = {
        deliveryTag: void 0,
        redelivered: void 0,
        exchange: void 0,
        routingKey: void 0,
        messageCount: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.redelivered = val;
      offset++;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeBasicGetOk(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'routingKey'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      var buffer = Buffer.alloc(27 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932231, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.redelivered;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = void 0);
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.messageCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicGetEmpty(buffer) {
      var val, len, offset = 0, fields = {
        clusterId: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.clusterId = val;
      return fields;
    }
    function encodeBasicGetEmpty(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.clusterId;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
      var clusterId_len = Buffer.byteLength(val, "utf8");
      varyingSize += clusterId_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932232, 7);
      offset = 11;
      val = fields.clusterId;
      void 0 === val && (val = "");
      buffer[offset] = clusterId_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += clusterId_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicAck(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        multiple: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.multiple = val;
      return fields;
    }
    function encodeBasicAck(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932240, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.multiple;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicReject(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        requeue: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicReject(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932250, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'deliveryTag'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.requeue;
      void 0 === val && (val = true);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecoverAsync(buffer) {
      var val, fields = {
        requeue: void 0
      };
      val = !!(1 & buffer[0]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicRecoverAsync(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932260, 7);
      offset = 11;
      val = fields.requeue;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecover(buffer) {
      var val, fields = {
        requeue: void 0
      };
      val = !!(1 & buffer[0]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicRecover(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932270, 7);
      offset = 11;
      val = fields.requeue;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicRecoverOk(buffer) {
      return {};
    }
    function encodeBasicRecoverOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932271, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeBasicNack(buffer) {
      var val, offset = 0, fields = {
        deliveryTag: void 0,
        multiple: void 0,
        requeue: void 0
      };
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.deliveryTag = val;
      val = !!(1 & buffer[offset]);
      fields.multiple = val;
      val = !!(2 & buffer[offset]);
      fields.requeue = val;
      return fields;
    }
    function encodeBasicNack(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932280, 7);
      offset = 11;
      val = fields.deliveryTag;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
      val = fields.multiple;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.requeue;
      void 0 === val && (val = true);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionStart(buffer) {
      var val, len, offset = 0, fields = {
        versionMajor: void 0,
        versionMinor: void 0,
        serverProperties: void 0,
        mechanisms: void 0,
        locales: void 0
      };
      val = buffer[offset];
      offset++;
      fields.versionMajor = val;
      val = buffer[offset];
      offset++;
      fields.versionMinor = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.serverProperties = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.mechanisms = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.locales = val;
      return fields;
    }
    function encodeConnectionStart(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.serverProperties;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'serverProperties'");
      if ("object" != typeof val) throw new TypeError("Field 'serverProperties' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var serverProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += serverProperties_encoded.length;
      val = fields.mechanisms;
      if (void 0 === val) val = Buffer.from("PLAIN");
      else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'mechanisms' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      val = fields.locales;
      if (void 0 === val) val = Buffer.from("en_US");
      else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'locales' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(22 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655370, 7);
      offset = 11;
      val = fields.versionMajor;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'versionMajor' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt8(val, offset);
      offset++;
      val = fields.versionMinor;
      if (void 0 === val) val = 9;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'versionMinor' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt8(val, offset);
      offset++;
      offset += serverProperties_encoded.copy(buffer, offset);
      val = fields.mechanisms;
      void 0 === val && (val = Buffer.from("PLAIN"));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      val = fields.locales;
      void 0 === val && (val = Buffer.from("en_US"));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionStartOk(buffer) {
      var val, len, offset = 0, fields = {
        clientProperties: void 0,
        mechanism: void 0,
        response: void 0,
        locale: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.clientProperties = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.mechanism = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.response = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.locale = val;
      return fields;
    }
    function encodeConnectionStartOk(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.clientProperties;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'clientProperties'");
      if ("object" != typeof val) throw new TypeError("Field 'clientProperties' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var clientProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += clientProperties_encoded.length;
      val = fields.mechanism;
      if (void 0 === val) val = "PLAIN";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'mechanism' is the wrong type; must be a string (up to 255 chars)");
      var mechanism_len = Buffer.byteLength(val, "utf8");
      varyingSize += mechanism_len;
      val = fields.response;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'response'");
      if (!Buffer.isBuffer(val)) throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      val = fields.locale;
      if (void 0 === val) val = "en_US";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'locale' is the wrong type; must be a string (up to 255 chars)");
      var locale_len = Buffer.byteLength(val, "utf8");
      varyingSize += locale_len;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655371, 7);
      offset = 11;
      offset += clientProperties_encoded.copy(buffer, offset);
      val = fields.mechanism;
      void 0 === val && (val = "PLAIN");
      buffer[offset] = mechanism_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += mechanism_len;
      val = fields.response;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      val = fields.locale;
      void 0 === val && (val = "en_US");
      buffer[offset] = locale_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += locale_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionSecure(buffer) {
      var val, len, offset = 0, fields = {
        challenge: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.challenge = val;
      return fields;
    }
    function encodeConnectionSecure(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.challenge;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'challenge'");
      if (!Buffer.isBuffer(val)) throw new TypeError("Field 'challenge' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655380, 7);
      offset = 11;
      val = fields.challenge;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionSecureOk(buffer) {
      var val, len, offset = 0, fields = {
        response: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.response = val;
      return fields;
    }
    function encodeConnectionSecureOk(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.response;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'response'");
      if (!Buffer.isBuffer(val)) throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655381, 7);
      offset = 11;
      val = fields.response;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionTune(buffer) {
      var val, offset = 0, fields = {
        channelMax: void 0,
        frameMax: void 0,
        heartbeat: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.channelMax = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.frameMax = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.heartbeat = val;
      return fields;
    }
    function encodeConnectionTune(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(20);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655390, 7);
      offset = 11;
      val = fields.channelMax;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.frameMax;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.heartbeat;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionTuneOk(buffer) {
      var val, offset = 0, fields = {
        channelMax: void 0,
        frameMax: void 0,
        heartbeat: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.channelMax = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.frameMax = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.heartbeat = val;
      return fields;
    }
    function encodeConnectionTuneOk(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(20);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655391, 7);
      offset = 11;
      val = fields.channelMax;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.frameMax;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.heartbeat;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionOpen(buffer) {
      var val, len, offset = 0, fields = {
        virtualHost: void 0,
        capabilities: void 0,
        insist: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.virtualHost = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.capabilities = val;
      val = !!(1 & buffer[offset]);
      fields.insist = val;
      return fields;
    }
    function encodeConnectionOpen(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.virtualHost;
      if (void 0 === val) val = "/";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'virtualHost' is the wrong type; must be a string (up to 255 chars)");
      var virtualHost_len = Buffer.byteLength(val, "utf8");
      varyingSize += virtualHost_len;
      val = fields.capabilities;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'capabilities' is the wrong type; must be a string (up to 255 chars)");
      var capabilities_len = Buffer.byteLength(val, "utf8");
      varyingSize += capabilities_len;
      var buffer = Buffer.alloc(15 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655400, 7);
      offset = 11;
      val = fields.virtualHost;
      void 0 === val && (val = "/");
      buffer[offset] = virtualHost_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += virtualHost_len;
      val = fields.capabilities;
      void 0 === val && (val = "");
      buffer[offset] = capabilities_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += capabilities_len;
      val = fields.insist;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionOpenOk(buffer) {
      var val, len, offset = 0, fields = {
        knownHosts: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.knownHosts = val;
      return fields;
    }
    function encodeConnectionOpenOk(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.knownHosts;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'knownHosts' is the wrong type; must be a string (up to 255 chars)");
      var knownHosts_len = Buffer.byteLength(val, "utf8");
      varyingSize += knownHosts_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655401, 7);
      offset = 11;
      val = fields.knownHosts;
      void 0 === val && (val = "");
      buffer[offset] = knownHosts_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += knownHosts_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionClose(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        classId: void 0,
        methodId: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.classId = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.methodId = val;
      return fields;
    }
    function encodeConnectionClose(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      var buffer = Buffer.alloc(19 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655410, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.classId;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'classId'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.methodId;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'methodId'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionCloseOk(buffer) {
      return {};
    }
    function encodeConnectionCloseOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655411, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionBlocked(buffer) {
      var val, len, offset = 0, fields = {
        reason: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.reason = val;
      return fields;
    }
    function encodeConnectionBlocked(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.reason;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'reason' is the wrong type; must be a string (up to 255 chars)");
      var reason_len = Buffer.byteLength(val, "utf8");
      varyingSize += reason_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655420, 7);
      offset = 11;
      val = fields.reason;
      void 0 === val && (val = "");
      buffer[offset] = reason_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += reason_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionUnblocked(buffer) {
      return {};
    }
    function encodeConnectionUnblocked(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655421, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionUpdateSecret(buffer) {
      var val, len, offset = 0, fields = {
        newSecret: void 0,
        reason: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.newSecret = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.reason = val;
      return fields;
    }
    function encodeConnectionUpdateSecret(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.newSecret;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'newSecret'");
      if (!Buffer.isBuffer(val)) throw new TypeError("Field 'newSecret' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      val = fields.reason;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'reason'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'reason' is the wrong type; must be a string (up to 255 chars)");
      var reason_len = Buffer.byteLength(val, "utf8");
      varyingSize += reason_len;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655430, 7);
      offset = 11;
      val = fields.newSecret;
      void 0 === val && (val = Buffer.from(void 0));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      val = fields.reason;
      void 0 === val && (val = void 0);
      buffer[offset] = reason_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += reason_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConnectionUpdateSecretOk(buffer) {
      return {};
    }
    function encodeConnectionUpdateSecretOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(655431, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelOpen(buffer) {
      var val, len, offset = 0, fields = {
        outOfBand: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.outOfBand = val;
      return fields;
    }
    function encodeChannelOpen(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.outOfBand;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'outOfBand' is the wrong type; must be a string (up to 255 chars)");
      var outOfBand_len = Buffer.byteLength(val, "utf8");
      varyingSize += outOfBand_len;
      var buffer = Buffer.alloc(13 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310730, 7);
      offset = 11;
      val = fields.outOfBand;
      void 0 === val && (val = "");
      buffer[offset] = outOfBand_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += outOfBand_len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelOpenOk(buffer) {
      var val, len, offset = 0, fields = {
        channelId: void 0
      };
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = buffer.subarray(offset, offset + len);
      offset += len;
      fields.channelId = val;
      return fields;
    }
    function encodeChannelOpenOk(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0;
      val = fields.channelId;
      if (void 0 === val) val = Buffer.from("");
      else if (!Buffer.isBuffer(val)) throw new TypeError("Field 'channelId' is the wrong type; must be a Buffer");
      varyingSize += val.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310731, 7);
      offset = 11;
      val = fields.channelId;
      void 0 === val && (val = Buffer.from(""));
      len = val.length;
      buffer.writeUInt32BE(len, offset);
      offset += 4;
      val.copy(buffer, offset);
      offset += len;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelFlow(buffer) {
      var val, fields = {
        active: void 0
      };
      val = !!(1 & buffer[0]);
      fields.active = val;
      return fields;
    }
    function encodeChannelFlow(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310740, 7);
      offset = 11;
      val = fields.active;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'active'");
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelFlowOk(buffer) {
      var val, fields = {
        active: void 0
      };
      val = !!(1 & buffer[0]);
      fields.active = val;
      return fields;
    }
    function encodeChannelFlowOk(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310741, 7);
      offset = 11;
      val = fields.active;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'active'");
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelClose(buffer) {
      var val, len, offset = 0, fields = {
        replyCode: void 0,
        replyText: void 0,
        classId: void 0,
        methodId: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.replyCode = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyText = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.classId = val;
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.methodId = val;
      return fields;
    }
    function encodeChannelClose(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.replyText;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
      var replyText_len = Buffer.byteLength(val, "utf8");
      varyingSize += replyText_len;
      var buffer = Buffer.alloc(19 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310760, 7);
      offset = 11;
      val = fields.replyCode;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'replyCode'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.replyText;
      void 0 === val && (val = "");
      buffer[offset] = replyText_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyText_len;
      val = fields.classId;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'classId'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.methodId;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'methodId'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeChannelCloseOk(buffer) {
      return {};
    }
    function encodeChannelCloseOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1310761, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeAccessRequest(buffer) {
      var val, len, offset = 0, fields = {
        realm: void 0,
        exclusive: void 0,
        passive: void 0,
        active: void 0,
        write: void 0,
        read: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.realm = val;
      val = !!(1 & buffer[offset]);
      fields.exclusive = val;
      val = !!(2 & buffer[offset]);
      fields.passive = val;
      val = !!(4 & buffer[offset]);
      fields.active = val;
      val = !!(8 & buffer[offset]);
      fields.write = val;
      val = !!(16 & buffer[offset]);
      fields.read = val;
      return fields;
    }
    function encodeAccessRequest(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.realm;
      if (void 0 === val) val = "/data";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'realm' is the wrong type; must be a string (up to 255 chars)");
      var realm_len = Buffer.byteLength(val, "utf8");
      varyingSize += realm_len;
      var buffer = Buffer.alloc(14 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1966090, 7);
      offset = 11;
      val = fields.realm;
      void 0 === val && (val = "/data");
      buffer[offset] = realm_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += realm_len;
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.passive;
      void 0 === val && (val = true);
      val && (bits += 2);
      val = fields.active;
      void 0 === val && (val = true);
      val && (bits += 4);
      val = fields.write;
      void 0 === val && (val = true);
      val && (bits += 8);
      val = fields.read;
      void 0 === val && (val = true);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeAccessRequestOk(buffer) {
      var val, offset = 0, fields = {
        ticket: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      return fields;
    }
    function encodeAccessRequestOk(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(14);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(1966091, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 1;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeclare(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        type: void 0,
        passive: void 0,
        durable: void 0,
        autoDelete: void 0,
        internal: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.type = val;
      val = !!(1 & buffer[offset]);
      fields.passive = val;
      val = !!(2 & buffer[offset]);
      fields.durable = val;
      val = !!(4 & buffer[offset]);
      fields.autoDelete = val;
      val = !!(8 & buffer[offset]);
      fields.internal = val;
      val = !!(16 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeDeclare(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.type;
      if (void 0 === val) val = "direct";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
      var type_len = Buffer.byteLength(val, "utf8");
      varyingSize += type_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621450, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.type;
      void 0 === val && (val = "direct");
      buffer[offset] = type_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += type_len;
      val = fields.passive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.durable;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.autoDelete;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.internal;
      void 0 === val && (val = false);
      val && (bits += 8);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeclareOk(buffer) {
      return {};
    }
    function encodeExchangeDeclareOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621451, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDelete(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        exchange: void 0,
        ifUnused: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      val = !!(1 & buffer[offset]);
      fields.ifUnused = val;
      val = !!(2 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeExchangeDelete(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621460, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.ifUnused;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 2);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeDeleteOk(buffer) {
      return {};
    }
    function encodeExchangeDeleteOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621461, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeBind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        destination: void 0,
        source: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.destination = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.source = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeBind(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.destination;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'destination'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
      var destination_len = Buffer.byteLength(val, "utf8");
      varyingSize += destination_len;
      val = fields.source;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'source'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
      var source_len = Buffer.byteLength(val, "utf8");
      varyingSize += source_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621470, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.destination;
      void 0 === val && (val = void 0);
      buffer[offset] = destination_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += destination_len;
      val = fields.source;
      void 0 === val && (val = void 0);
      buffer[offset] = source_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += source_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeBindOk(buffer) {
      return {};
    }
    function encodeExchangeBindOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621471, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeUnbind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        destination: void 0,
        source: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.destination = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.source = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeExchangeUnbind(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.destination;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'destination'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
      var destination_len = Buffer.byteLength(val, "utf8");
      varyingSize += destination_len;
      val = fields.source;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'source'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
      var source_len = Buffer.byteLength(val, "utf8");
      varyingSize += source_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621480, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.destination;
      void 0 === val && (val = void 0);
      buffer[offset] = destination_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += destination_len;
      val = fields.source;
      void 0 === val && (val = void 0);
      buffer[offset] = source_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += source_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeExchangeUnbindOk(buffer) {
      return {};
    }
    function encodeExchangeUnbindOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(2621491, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeclare(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        passive: void 0,
        durable: void 0,
        exclusive: void 0,
        autoDelete: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.passive = val;
      val = !!(2 & buffer[offset]);
      fields.durable = val;
      val = !!(4 & buffer[offset]);
      fields.exclusive = val;
      val = !!(8 & buffer[offset]);
      fields.autoDelete = val;
      val = !!(16 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueDeclare(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276810, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.passive;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.durable;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.exclusive;
      void 0 === val && (val = false);
      val && (bits += 4);
      val = fields.autoDelete;
      void 0 === val && (val = false);
      val && (bits += 8);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 16);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeclareOk(buffer) {
      var val, len, offset = 0, fields = {
        queue: void 0,
        messageCount: void 0,
        consumerCount: void 0
      };
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.consumerCount = val;
      return fields;
    }
    function encodeQueueDeclareOk(channel, fields) {
      var offset = 0, val = null, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'queue'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(21 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276811, 7);
      offset = 11;
      val = fields.queue;
      void 0 === val && (val = void 0);
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.messageCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      val = fields.consumerCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'consumerCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'consumerCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueBind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        exchange: void 0,
        routingKey: void 0,
        nowait: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      offset++;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueBind(channel, fields) {
      var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(18 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276820, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      bits = 0;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueBindOk(buffer) {
      return {};
    }
    function encodeQueueBindOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276821, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueuePurge(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeQueuePurge(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276830, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueuePurgeOk(buffer) {
      var val, offset = 0, fields = {
        messageCount: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeQueuePurgeOk(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(16);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276831, 7);
      offset = 11;
      val = fields.messageCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDelete(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        ifUnused: void 0,
        ifEmpty: void 0,
        nowait: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      val = !!(1 & buffer[offset]);
      fields.ifUnused = val;
      val = !!(2 & buffer[offset]);
      fields.ifEmpty = val;
      val = !!(4 & buffer[offset]);
      fields.nowait = val;
      return fields;
    }
    function encodeQueueDelete(channel, fields) {
      var offset = 0, val = null, bits = 0, varyingSize = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      var buffer = Buffer.alloc(16 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276840, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.ifUnused;
      void 0 === val && (val = false);
      val && (bits += 1);
      val = fields.ifEmpty;
      void 0 === val && (val = false);
      val && (bits += 2);
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 4);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueDeleteOk(buffer) {
      var val, offset = 0, fields = {
        messageCount: void 0
      };
      val = buffer.readUInt32BE(offset);
      offset += 4;
      fields.messageCount = val;
      return fields;
    }
    function encodeQueueDeleteOk(channel, fields) {
      var offset = 0, val = null, buffer = Buffer.alloc(16);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276841, 7);
      offset = 11;
      val = fields.messageCount;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'messageCount'");
      if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt32BE(val, offset);
      offset += 4;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueUnbind(buffer) {
      var val, len, offset = 0, fields = {
        ticket: void 0,
        queue: void 0,
        exchange: void 0,
        routingKey: void 0,
        arguments: void 0
      };
      val = buffer.readUInt16BE(offset);
      offset += 2;
      fields.ticket = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.queue = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.exchange = val;
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.routingKey = val;
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.subarray(offset, offset + len));
      offset += len;
      fields.arguments = val;
      return fields;
    }
    function encodeQueueUnbind(channel, fields) {
      var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
      val = fields.queue;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
      var queue_len = Buffer.byteLength(val, "utf8");
      varyingSize += queue_len;
      val = fields.exchange;
      if (void 0 === val) throw new Error("Missing value for mandatory field 'exchange'");
      if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
      var exchange_len = Buffer.byteLength(val, "utf8");
      varyingSize += exchange_len;
      val = fields.routingKey;
      if (void 0 === val) val = "";
      else if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
      var routingKey_len = Buffer.byteLength(val, "utf8");
      varyingSize += routingKey_len;
      val = fields.arguments;
      if (void 0 === val) val = {};
      else if ("object" != typeof val) throw new TypeError("Field 'arguments' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += arguments_encoded.length;
      var buffer = Buffer.alloc(17 + varyingSize);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276850, 7);
      offset = 11;
      val = fields.ticket;
      if (void 0 === val) val = 0;
      else if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
      buffer.writeUInt16BE(val, offset);
      offset += 2;
      val = fields.queue;
      void 0 === val && (val = "");
      buffer[offset] = queue_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += queue_len;
      val = fields.exchange;
      void 0 === val && (val = void 0);
      buffer[offset] = exchange_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += exchange_len;
      val = fields.routingKey;
      void 0 === val && (val = "");
      buffer[offset] = routingKey_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += routingKey_len;
      offset += arguments_encoded.copy(buffer, offset);
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeQueueUnbindOk(buffer) {
      return {};
    }
    function encodeQueueUnbindOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3276851, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxSelect(buffer) {
      return {};
    }
    function encodeTxSelect(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898250, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxSelectOk(buffer) {
      return {};
    }
    function encodeTxSelectOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898251, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxCommit(buffer) {
      return {};
    }
    function encodeTxCommit(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898260, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxCommitOk(buffer) {
      return {};
    }
    function encodeTxCommitOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898261, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxRollback(buffer) {
      return {};
    }
    function encodeTxRollback(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898270, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeTxRollbackOk(buffer) {
      return {};
    }
    function encodeTxRollbackOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5898271, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConfirmSelect(buffer) {
      var val, fields = {
        nowait: void 0
      };
      val = !!(1 & buffer[0]);
      fields.nowait = val;
      return fields;
    }
    function encodeConfirmSelect(channel, fields) {
      var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5570570, 7);
      offset = 11;
      val = fields.nowait;
      void 0 === val && (val = false);
      val && (bits += 1);
      buffer[offset] = bits;
      offset++;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function decodeConfirmSelectOk(buffer) {
      return {};
    }
    function encodeConfirmSelectOk(channel, fields) {
      var offset = 0, buffer = Buffer.alloc(12);
      buffer[0] = 1;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(5570571, 7);
      offset = 11;
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      return buffer;
    }
    function encodeBasicProperties(channel, size, fields) {
      var val, len, offset = 0, flags = 0, scratchOffset = 0, varyingSize = 0;
      val = fields.contentType;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'contentType' is the wrong type; must be a string (up to 255 chars)");
        var contentType_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += contentType_len;
      }
      val = fields.contentEncoding;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'contentEncoding' is the wrong type; must be a string (up to 255 chars)");
        var contentEncoding_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += contentEncoding_len;
      }
      val = fields.headers;
      if (void 0 != val) {
        if ("object" != typeof val) throw new TypeError("Field 'headers' is the wrong type; must be an object");
        len = encodeTable(SCRATCH, val, scratchOffset);
        var headers_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
        scratchOffset += len;
        varyingSize += headers_encoded.length;
      }
      val = fields.deliveryMode;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'deliveryMode' is the wrong type; must be a number (but not NaN)");
        varyingSize += 1;
      }
      val = fields.priority;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'priority' is the wrong type; must be a number (but not NaN)");
        varyingSize += 1;
      }
      val = fields.correlationId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'correlationId' is the wrong type; must be a string (up to 255 chars)");
        var correlationId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += correlationId_len;
      }
      val = fields.replyTo;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'replyTo' is the wrong type; must be a string (up to 255 chars)");
        var replyTo_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += replyTo_len;
      }
      val = fields.expiration;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'expiration' is the wrong type; must be a string (up to 255 chars)");
        var expiration_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += expiration_len;
      }
      val = fields.messageId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'messageId' is the wrong type; must be a string (up to 255 chars)");
        var messageId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += messageId_len;
      }
      val = fields.timestamp;
      if (void 0 != val) {
        if ("number" != typeof val || isNaN(val)) throw new TypeError("Field 'timestamp' is the wrong type; must be a number (but not NaN)");
        varyingSize += 8;
      }
      val = fields.type;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
        var type_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += type_len;
      }
      val = fields.userId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'userId' is the wrong type; must be a string (up to 255 chars)");
        var userId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += userId_len;
      }
      val = fields.appId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'appId' is the wrong type; must be a string (up to 255 chars)");
        var appId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += appId_len;
      }
      val = fields.clusterId;
      if (void 0 != val) {
        if (!("string" == typeof val && Buffer.byteLength(val) < 256)) throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
        var clusterId_len = Buffer.byteLength(val, "utf8");
        varyingSize += 1;
        varyingSize += clusterId_len;
      }
      var buffer = Buffer.alloc(22 + varyingSize);
      buffer[0] = 2;
      buffer.writeUInt16BE(channel, 1);
      buffer.writeUInt32BE(3932160, 7);
      ints.writeUInt64BE(buffer, size, 11);
      flags = 0;
      offset = 21;
      val = fields.contentType;
      if (void 0 != val) {
        flags += 32768;
        buffer[offset] = contentType_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += contentType_len;
      }
      val = fields.contentEncoding;
      if (void 0 != val) {
        flags += 16384;
        buffer[offset] = contentEncoding_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += contentEncoding_len;
      }
      val = fields.headers;
      if (void 0 != val) {
        flags += 8192;
        offset += headers_encoded.copy(buffer, offset);
      }
      val = fields.deliveryMode;
      if (void 0 != val) {
        flags += 4096;
        buffer.writeUInt8(val, offset);
        offset++;
      }
      val = fields.priority;
      if (void 0 != val) {
        flags += 2048;
        buffer.writeUInt8(val, offset);
        offset++;
      }
      val = fields.correlationId;
      if (void 0 != val) {
        flags += 1024;
        buffer[offset] = correlationId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += correlationId_len;
      }
      val = fields.replyTo;
      if (void 0 != val) {
        flags += 512;
        buffer[offset] = replyTo_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += replyTo_len;
      }
      val = fields.expiration;
      if (void 0 != val) {
        flags += 256;
        buffer[offset] = expiration_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += expiration_len;
      }
      val = fields.messageId;
      if (void 0 != val) {
        flags += 128;
        buffer[offset] = messageId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += messageId_len;
      }
      val = fields.timestamp;
      if (void 0 != val) {
        flags += 64;
        ints.writeUInt64BE(buffer, val, offset);
        offset += 8;
      }
      val = fields.type;
      if (void 0 != val) {
        flags += 32;
        buffer[offset] = type_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += type_len;
      }
      val = fields.userId;
      if (void 0 != val) {
        flags += 16;
        buffer[offset] = userId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += userId_len;
      }
      val = fields.appId;
      if (void 0 != val) {
        flags += 8;
        buffer[offset] = appId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += appId_len;
      }
      val = fields.clusterId;
      if (void 0 != val) {
        flags += 4;
        buffer[offset] = clusterId_len;
        offset++;
        buffer.write(val, offset, "utf8");
        offset += clusterId_len;
      }
      buffer[offset] = 206;
      buffer.writeUInt32BE(offset - 7, 3);
      buffer.writeUInt16BE(flags, 19);
      return buffer.subarray(0, offset + 1);
    }
    function decodeBasicProperties(buffer) {
      var flags, val, len, offset = 2;
      flags = buffer.readUInt16BE(0);
      if (0 === flags) return {};
      var fields = {
        contentType: void 0,
        contentEncoding: void 0,
        headers: void 0,
        deliveryMode: void 0,
        priority: void 0,
        correlationId: void 0,
        replyTo: void 0,
        expiration: void 0,
        messageId: void 0,
        timestamp: void 0,
        type: void 0,
        userId: void 0,
        appId: void 0,
        clusterId: void 0
      };
      if (32768 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.contentType = val;
      }
      if (16384 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.contentEncoding = val;
      }
      if (8192 & flags) {
        len = buffer.readUInt32BE(offset);
        offset += 4;
        val = decodeFields(buffer.subarray(offset, offset + len));
        offset += len;
        fields.headers = val;
      }
      if (4096 & flags) {
        val = buffer[offset];
        offset++;
        fields.deliveryMode = val;
      }
      if (2048 & flags) {
        val = buffer[offset];
        offset++;
        fields.priority = val;
      }
      if (1024 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.correlationId = val;
      }
      if (512 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.replyTo = val;
      }
      if (256 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.expiration = val;
      }
      if (128 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.messageId = val;
      }
      if (64 & flags) {
        val = ints.readUInt64BE(buffer, offset);
        offset += 8;
        fields.timestamp = val;
      }
      if (32 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.type = val;
      }
      if (16 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.userId = val;
      }
      if (8 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.appId = val;
      }
      if (4 & flags) {
        len = buffer.readUInt8(offset);
        offset++;
        val = buffer.toString("utf8", offset, offset + len);
        offset += len;
        fields.clusterId = val;
      }
      return fields;
    }
    var codec = require_codec();
    var ints = require_buffer_more_ints();
    var encodeTable = codec.encodeTable;
    var decodeFields = codec.decodeFields;
    var SCRATCH = Buffer.alloc(65536);
    var EMPTY_OBJECT = Object.freeze({});
    module2.exports.constants = {
      FRAME_METHOD: 1,
      FRAME_HEADER: 2,
      FRAME_BODY: 3,
      FRAME_HEARTBEAT: 8,
      FRAME_MIN_SIZE: 4096,
      FRAME_END: 206,
      REPLY_SUCCESS: 200,
      CONTENT_TOO_LARGE: 311,
      NO_ROUTE: 312,
      NO_CONSUMERS: 313,
      ACCESS_REFUSED: 403,
      NOT_FOUND: 404,
      RESOURCE_LOCKED: 405,
      PRECONDITION_FAILED: 406,
      CONNECTION_FORCED: 320,
      INVALID_PATH: 402,
      FRAME_ERROR: 501,
      SYNTAX_ERROR: 502,
      COMMAND_INVALID: 503,
      CHANNEL_ERROR: 504,
      UNEXPECTED_FRAME: 505,
      RESOURCE_ERROR: 506,
      NOT_ALLOWED: 530,
      NOT_IMPLEMENTED: 540,
      INTERNAL_ERROR: 541
    };
    module2.exports.constant_strs = {
      "1": "FRAME-METHOD",
      "2": "FRAME-HEADER",
      "3": "FRAME-BODY",
      "8": "FRAME-HEARTBEAT",
      "200": "REPLY-SUCCESS",
      "206": "FRAME-END",
      "311": "CONTENT-TOO-LARGE",
      "312": "NO-ROUTE",
      "313": "NO-CONSUMERS",
      "320": "CONNECTION-FORCED",
      "402": "INVALID-PATH",
      "403": "ACCESS-REFUSED",
      "404": "NOT-FOUND",
      "405": "RESOURCE-LOCKED",
      "406": "PRECONDITION-FAILED",
      "501": "FRAME-ERROR",
      "502": "SYNTAX-ERROR",
      "503": "COMMAND-INVALID",
      "504": "CHANNEL-ERROR",
      "505": "UNEXPECTED-FRAME",
      "506": "RESOURCE-ERROR",
      "530": "NOT-ALLOWED",
      "540": "NOT-IMPLEMENTED",
      "541": "INTERNAL-ERROR",
      "4096": "FRAME-MIN-SIZE"
    };
    module2.exports.FRAME_OVERHEAD = 8;
    module2.exports.decode = function(id, buf) {
      switch (id) {
        case 3932170:
          return decodeBasicQos(buf);
        case 3932171:
          return decodeBasicQosOk(buf);
        case 3932180:
          return decodeBasicConsume(buf);
        case 3932181:
          return decodeBasicConsumeOk(buf);
        case 3932190:
          return decodeBasicCancel(buf);
        case 3932191:
          return decodeBasicCancelOk(buf);
        case 3932200:
          return decodeBasicPublish(buf);
        case 3932210:
          return decodeBasicReturn(buf);
        case 3932220:
          return decodeBasicDeliver(buf);
        case 3932230:
          return decodeBasicGet(buf);
        case 3932231:
          return decodeBasicGetOk(buf);
        case 3932232:
          return decodeBasicGetEmpty(buf);
        case 3932240:
          return decodeBasicAck(buf);
        case 3932250:
          return decodeBasicReject(buf);
        case 3932260:
          return decodeBasicRecoverAsync(buf);
        case 3932270:
          return decodeBasicRecover(buf);
        case 3932271:
          return decodeBasicRecoverOk(buf);
        case 3932280:
          return decodeBasicNack(buf);
        case 655370:
          return decodeConnectionStart(buf);
        case 655371:
          return decodeConnectionStartOk(buf);
        case 655380:
          return decodeConnectionSecure(buf);
        case 655381:
          return decodeConnectionSecureOk(buf);
        case 655390:
          return decodeConnectionTune(buf);
        case 655391:
          return decodeConnectionTuneOk(buf);
        case 655400:
          return decodeConnectionOpen(buf);
        case 655401:
          return decodeConnectionOpenOk(buf);
        case 655410:
          return decodeConnectionClose(buf);
        case 655411:
          return decodeConnectionCloseOk(buf);
        case 655420:
          return decodeConnectionBlocked(buf);
        case 655421:
          return decodeConnectionUnblocked(buf);
        case 655430:
          return decodeConnectionUpdateSecret(buf);
        case 655431:
          return decodeConnectionUpdateSecretOk(buf);
        case 1310730:
          return decodeChannelOpen(buf);
        case 1310731:
          return decodeChannelOpenOk(buf);
        case 1310740:
          return decodeChannelFlow(buf);
        case 1310741:
          return decodeChannelFlowOk(buf);
        case 1310760:
          return decodeChannelClose(buf);
        case 1310761:
          return decodeChannelCloseOk(buf);
        case 1966090:
          return decodeAccessRequest(buf);
        case 1966091:
          return decodeAccessRequestOk(buf);
        case 2621450:
          return decodeExchangeDeclare(buf);
        case 2621451:
          return decodeExchangeDeclareOk(buf);
        case 2621460:
          return decodeExchangeDelete(buf);
        case 2621461:
          return decodeExchangeDeleteOk(buf);
        case 2621470:
          return decodeExchangeBind(buf);
        case 2621471:
          return decodeExchangeBindOk(buf);
        case 2621480:
          return decodeExchangeUnbind(buf);
        case 2621491:
          return decodeExchangeUnbindOk(buf);
        case 3276810:
          return decodeQueueDeclare(buf);
        case 3276811:
          return decodeQueueDeclareOk(buf);
        case 3276820:
          return decodeQueueBind(buf);
        case 3276821:
          return decodeQueueBindOk(buf);
        case 3276830:
          return decodeQueuePurge(buf);
        case 3276831:
          return decodeQueuePurgeOk(buf);
        case 3276840:
          return decodeQueueDelete(buf);
        case 3276841:
          return decodeQueueDeleteOk(buf);
        case 3276850:
          return decodeQueueUnbind(buf);
        case 3276851:
          return decodeQueueUnbindOk(buf);
        case 5898250:
          return decodeTxSelect(buf);
        case 5898251:
          return decodeTxSelectOk(buf);
        case 5898260:
          return decodeTxCommit(buf);
        case 5898261:
          return decodeTxCommitOk(buf);
        case 5898270:
          return decodeTxRollback(buf);
        case 5898271:
          return decodeTxRollbackOk(buf);
        case 5570570:
          return decodeConfirmSelect(buf);
        case 5570571:
          return decodeConfirmSelectOk(buf);
        case 60:
          return decodeBasicProperties(buf);
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module2.exports.encodeMethod = function(id, channel, fields) {
      switch (id) {
        case 3932170:
          return encodeBasicQos(channel, fields);
        case 3932171:
          return encodeBasicQosOk(channel, fields);
        case 3932180:
          return encodeBasicConsume(channel, fields);
        case 3932181:
          return encodeBasicConsumeOk(channel, fields);
        case 3932190:
          return encodeBasicCancel(channel, fields);
        case 3932191:
          return encodeBasicCancelOk(channel, fields);
        case 3932200:
          return encodeBasicPublish(channel, fields);
        case 3932210:
          return encodeBasicReturn(channel, fields);
        case 3932220:
          return encodeBasicDeliver(channel, fields);
        case 3932230:
          return encodeBasicGet(channel, fields);
        case 3932231:
          return encodeBasicGetOk(channel, fields);
        case 3932232:
          return encodeBasicGetEmpty(channel, fields);
        case 3932240:
          return encodeBasicAck(channel, fields);
        case 3932250:
          return encodeBasicReject(channel, fields);
        case 3932260:
          return encodeBasicRecoverAsync(channel, fields);
        case 3932270:
          return encodeBasicRecover(channel, fields);
        case 3932271:
          return encodeBasicRecoverOk(channel, fields);
        case 3932280:
          return encodeBasicNack(channel, fields);
        case 655370:
          return encodeConnectionStart(channel, fields);
        case 655371:
          return encodeConnectionStartOk(channel, fields);
        case 655380:
          return encodeConnectionSecure(channel, fields);
        case 655381:
          return encodeConnectionSecureOk(channel, fields);
        case 655390:
          return encodeConnectionTune(channel, fields);
        case 655391:
          return encodeConnectionTuneOk(channel, fields);
        case 655400:
          return encodeConnectionOpen(channel, fields);
        case 655401:
          return encodeConnectionOpenOk(channel, fields);
        case 655410:
          return encodeConnectionClose(channel, fields);
        case 655411:
          return encodeConnectionCloseOk(channel, fields);
        case 655420:
          return encodeConnectionBlocked(channel, fields);
        case 655421:
          return encodeConnectionUnblocked(channel, fields);
        case 655430:
          return encodeConnectionUpdateSecret(channel, fields);
        case 655431:
          return encodeConnectionUpdateSecretOk(channel, fields);
        case 1310730:
          return encodeChannelOpen(channel, fields);
        case 1310731:
          return encodeChannelOpenOk(channel, fields);
        case 1310740:
          return encodeChannelFlow(channel, fields);
        case 1310741:
          return encodeChannelFlowOk(channel, fields);
        case 1310760:
          return encodeChannelClose(channel, fields);
        case 1310761:
          return encodeChannelCloseOk(channel, fields);
        case 1966090:
          return encodeAccessRequest(channel, fields);
        case 1966091:
          return encodeAccessRequestOk(channel, fields);
        case 2621450:
          return encodeExchangeDeclare(channel, fields);
        case 2621451:
          return encodeExchangeDeclareOk(channel, fields);
        case 2621460:
          return encodeExchangeDelete(channel, fields);
        case 2621461:
          return encodeExchangeDeleteOk(channel, fields);
        case 2621470:
          return encodeExchangeBind(channel, fields);
        case 2621471:
          return encodeExchangeBindOk(channel, fields);
        case 2621480:
          return encodeExchangeUnbind(channel, fields);
        case 2621491:
          return encodeExchangeUnbindOk(channel, fields);
        case 3276810:
          return encodeQueueDeclare(channel, fields);
        case 3276811:
          return encodeQueueDeclareOk(channel, fields);
        case 3276820:
          return encodeQueueBind(channel, fields);
        case 3276821:
          return encodeQueueBindOk(channel, fields);
        case 3276830:
          return encodeQueuePurge(channel, fields);
        case 3276831:
          return encodeQueuePurgeOk(channel, fields);
        case 3276840:
          return encodeQueueDelete(channel, fields);
        case 3276841:
          return encodeQueueDeleteOk(channel, fields);
        case 3276850:
          return encodeQueueUnbind(channel, fields);
        case 3276851:
          return encodeQueueUnbindOk(channel, fields);
        case 5898250:
          return encodeTxSelect(channel, fields);
        case 5898251:
          return encodeTxSelectOk(channel, fields);
        case 5898260:
          return encodeTxCommit(channel, fields);
        case 5898261:
          return encodeTxCommitOk(channel, fields);
        case 5898270:
          return encodeTxRollback(channel, fields);
        case 5898271:
          return encodeTxRollbackOk(channel, fields);
        case 5570570:
          return encodeConfirmSelect(channel, fields);
        case 5570571:
          return encodeConfirmSelectOk(channel, fields);
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module2.exports.encodeProperties = function(id, channel, size, fields) {
      switch (id) {
        case 60:
          return encodeBasicProperties(channel, size, fields);
        default:
          throw new Error("Unknown class/properties ID");
      }
    };
    module2.exports.info = function(id) {
      switch (id) {
        case 3932170:
          return methodInfoBasicQos;
        case 3932171:
          return methodInfoBasicQosOk;
        case 3932180:
          return methodInfoBasicConsume;
        case 3932181:
          return methodInfoBasicConsumeOk;
        case 3932190:
          return methodInfoBasicCancel;
        case 3932191:
          return methodInfoBasicCancelOk;
        case 3932200:
          return methodInfoBasicPublish;
        case 3932210:
          return methodInfoBasicReturn;
        case 3932220:
          return methodInfoBasicDeliver;
        case 3932230:
          return methodInfoBasicGet;
        case 3932231:
          return methodInfoBasicGetOk;
        case 3932232:
          return methodInfoBasicGetEmpty;
        case 3932240:
          return methodInfoBasicAck;
        case 3932250:
          return methodInfoBasicReject;
        case 3932260:
          return methodInfoBasicRecoverAsync;
        case 3932270:
          return methodInfoBasicRecover;
        case 3932271:
          return methodInfoBasicRecoverOk;
        case 3932280:
          return methodInfoBasicNack;
        case 655370:
          return methodInfoConnectionStart;
        case 655371:
          return methodInfoConnectionStartOk;
        case 655380:
          return methodInfoConnectionSecure;
        case 655381:
          return methodInfoConnectionSecureOk;
        case 655390:
          return methodInfoConnectionTune;
        case 655391:
          return methodInfoConnectionTuneOk;
        case 655400:
          return methodInfoConnectionOpen;
        case 655401:
          return methodInfoConnectionOpenOk;
        case 655410:
          return methodInfoConnectionClose;
        case 655411:
          return methodInfoConnectionCloseOk;
        case 655420:
          return methodInfoConnectionBlocked;
        case 655421:
          return methodInfoConnectionUnblocked;
        case 655430:
          return methodInfoConnectionUpdateSecret;
        case 655431:
          return methodInfoConnectionUpdateSecretOk;
        case 1310730:
          return methodInfoChannelOpen;
        case 1310731:
          return methodInfoChannelOpenOk;
        case 1310740:
          return methodInfoChannelFlow;
        case 1310741:
          return methodInfoChannelFlowOk;
        case 1310760:
          return methodInfoChannelClose;
        case 1310761:
          return methodInfoChannelCloseOk;
        case 1966090:
          return methodInfoAccessRequest;
        case 1966091:
          return methodInfoAccessRequestOk;
        case 2621450:
          return methodInfoExchangeDeclare;
        case 2621451:
          return methodInfoExchangeDeclareOk;
        case 2621460:
          return methodInfoExchangeDelete;
        case 2621461:
          return methodInfoExchangeDeleteOk;
        case 2621470:
          return methodInfoExchangeBind;
        case 2621471:
          return methodInfoExchangeBindOk;
        case 2621480:
          return methodInfoExchangeUnbind;
        case 2621491:
          return methodInfoExchangeUnbindOk;
        case 3276810:
          return methodInfoQueueDeclare;
        case 3276811:
          return methodInfoQueueDeclareOk;
        case 3276820:
          return methodInfoQueueBind;
        case 3276821:
          return methodInfoQueueBindOk;
        case 3276830:
          return methodInfoQueuePurge;
        case 3276831:
          return methodInfoQueuePurgeOk;
        case 3276840:
          return methodInfoQueueDelete;
        case 3276841:
          return methodInfoQueueDeleteOk;
        case 3276850:
          return methodInfoQueueUnbind;
        case 3276851:
          return methodInfoQueueUnbindOk;
        case 5898250:
          return methodInfoTxSelect;
        case 5898251:
          return methodInfoTxSelectOk;
        case 5898260:
          return methodInfoTxCommit;
        case 5898261:
          return methodInfoTxCommitOk;
        case 5898270:
          return methodInfoTxRollback;
        case 5898271:
          return methodInfoTxRollbackOk;
        case 5570570:
          return methodInfoConfirmSelect;
        case 5570571:
          return methodInfoConfirmSelectOk;
        case 60:
          return propertiesInfoBasicProperties;
        default:
          throw new Error("Unknown class/method ID");
      }
    };
    module2.exports.BasicQos = 3932170;
    var methodInfoBasicQos = module2.exports.methodInfoBasicQos = {
      id: 3932170,
      classId: 60,
      methodId: 10,
      name: "BasicQos",
      args: [{
        type: "long",
        name: "prefetchSize",
        default: 0
      }, {
        type: "short",
        name: "prefetchCount",
        default: 0
      }, {
        type: "bit",
        name: "global",
        default: false
      }]
    };
    module2.exports.BasicQosOk = 3932171;
    var methodInfoBasicQosOk = module2.exports.methodInfoBasicQosOk = {
      id: 3932171,
      classId: 60,
      methodId: 11,
      name: "BasicQosOk",
      args: []
    };
    module2.exports.BasicConsume = 3932180;
    var methodInfoBasicConsume = module2.exports.methodInfoBasicConsume = {
      id: 3932180,
      classId: 60,
      methodId: 20,
      name: "BasicConsume",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "consumerTag",
        default: ""
      }, {
        type: "bit",
        name: "noLocal",
        default: false
      }, {
        type: "bit",
        name: "noAck",
        default: false
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.BasicConsumeOk = 3932181;
    var methodInfoBasicConsumeOk = module2.exports.methodInfoBasicConsumeOk = {
      id: 3932181,
      classId: 60,
      methodId: 21,
      name: "BasicConsumeOk",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }]
    };
    module2.exports.BasicCancel = 3932190;
    var methodInfoBasicCancel = module2.exports.methodInfoBasicCancel = {
      id: 3932190,
      classId: 60,
      methodId: 30,
      name: "BasicCancel",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.BasicCancelOk = 3932191;
    var methodInfoBasicCancelOk = module2.exports.methodInfoBasicCancelOk = {
      id: 3932191,
      classId: 60,
      methodId: 31,
      name: "BasicCancelOk",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }]
    };
    module2.exports.BasicPublish = 3932200;
    var methodInfoBasicPublish = module2.exports.methodInfoBasicPublish = {
      id: 3932200,
      classId: 60,
      methodId: 40,
      name: "BasicPublish",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange",
        default: ""
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "mandatory",
        default: false
      }, {
        type: "bit",
        name: "immediate",
        default: false
      }]
    };
    module2.exports.BasicReturn = 3932210;
    var methodInfoBasicReturn = module2.exports.methodInfoBasicReturn = {
      id: 3932210,
      classId: 60,
      methodId: 50,
      name: "BasicReturn",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }]
    };
    module2.exports.BasicDeliver = 3932220;
    var methodInfoBasicDeliver = module2.exports.methodInfoBasicDeliver = {
      id: 3932220,
      classId: 60,
      methodId: 60,
      name: "BasicDeliver",
      args: [{
        type: "shortstr",
        name: "consumerTag"
      }, {
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "redelivered",
        default: false
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }]
    };
    module2.exports.BasicGet = 3932230;
    var methodInfoBasicGet = module2.exports.methodInfoBasicGet = {
      id: 3932230,
      classId: 60,
      methodId: 70,
      name: "BasicGet",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "noAck",
        default: false
      }]
    };
    module2.exports.BasicGetOk = 3932231;
    var methodInfoBasicGetOk = module2.exports.methodInfoBasicGetOk = {
      id: 3932231,
      classId: 60,
      methodId: 71,
      name: "BasicGetOk",
      args: [{
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "redelivered",
        default: false
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey"
      }, {
        type: "long",
        name: "messageCount"
      }]
    };
    module2.exports.BasicGetEmpty = 3932232;
    var methodInfoBasicGetEmpty = module2.exports.methodInfoBasicGetEmpty = {
      id: 3932232,
      classId: 60,
      methodId: 72,
      name: "BasicGetEmpty",
      args: [{
        type: "shortstr",
        name: "clusterId",
        default: ""
      }]
    };
    module2.exports.BasicAck = 3932240;
    var methodInfoBasicAck = module2.exports.methodInfoBasicAck = {
      id: 3932240,
      classId: 60,
      methodId: 80,
      name: "BasicAck",
      args: [{
        type: "longlong",
        name: "deliveryTag",
        default: 0
      }, {
        type: "bit",
        name: "multiple",
        default: false
      }]
    };
    module2.exports.BasicReject = 3932250;
    var methodInfoBasicReject = module2.exports.methodInfoBasicReject = {
      id: 3932250,
      classId: 60,
      methodId: 90,
      name: "BasicReject",
      args: [{
        type: "longlong",
        name: "deliveryTag"
      }, {
        type: "bit",
        name: "requeue",
        default: true
      }]
    };
    module2.exports.BasicRecoverAsync = 3932260;
    var methodInfoBasicRecoverAsync = module2.exports.methodInfoBasicRecoverAsync = {
      id: 3932260,
      classId: 60,
      methodId: 100,
      name: "BasicRecoverAsync",
      args: [{
        type: "bit",
        name: "requeue",
        default: false
      }]
    };
    module2.exports.BasicRecover = 3932270;
    var methodInfoBasicRecover = module2.exports.methodInfoBasicRecover = {
      id: 3932270,
      classId: 60,
      methodId: 110,
      name: "BasicRecover",
      args: [{
        type: "bit",
        name: "requeue",
        default: false
      }]
    };
    module2.exports.BasicRecoverOk = 3932271;
    var methodInfoBasicRecoverOk = module2.exports.methodInfoBasicRecoverOk = {
      id: 3932271,
      classId: 60,
      methodId: 111,
      name: "BasicRecoverOk",
      args: []
    };
    module2.exports.BasicNack = 3932280;
    var methodInfoBasicNack = module2.exports.methodInfoBasicNack = {
      id: 3932280,
      classId: 60,
      methodId: 120,
      name: "BasicNack",
      args: [{
        type: "longlong",
        name: "deliveryTag",
        default: 0
      }, {
        type: "bit",
        name: "multiple",
        default: false
      }, {
        type: "bit",
        name: "requeue",
        default: true
      }]
    };
    module2.exports.ConnectionStart = 655370;
    var methodInfoConnectionStart = module2.exports.methodInfoConnectionStart = {
      id: 655370,
      classId: 10,
      methodId: 10,
      name: "ConnectionStart",
      args: [{
        type: "octet",
        name: "versionMajor",
        default: 0
      }, {
        type: "octet",
        name: "versionMinor",
        default: 9
      }, {
        type: "table",
        name: "serverProperties"
      }, {
        type: "longstr",
        name: "mechanisms",
        default: "PLAIN"
      }, {
        type: "longstr",
        name: "locales",
        default: "en_US"
      }]
    };
    module2.exports.ConnectionStartOk = 655371;
    var methodInfoConnectionStartOk = module2.exports.methodInfoConnectionStartOk = {
      id: 655371,
      classId: 10,
      methodId: 11,
      name: "ConnectionStartOk",
      args: [{
        type: "table",
        name: "clientProperties"
      }, {
        type: "shortstr",
        name: "mechanism",
        default: "PLAIN"
      }, {
        type: "longstr",
        name: "response"
      }, {
        type: "shortstr",
        name: "locale",
        default: "en_US"
      }]
    };
    module2.exports.ConnectionSecure = 655380;
    var methodInfoConnectionSecure = module2.exports.methodInfoConnectionSecure = {
      id: 655380,
      classId: 10,
      methodId: 20,
      name: "ConnectionSecure",
      args: [{
        type: "longstr",
        name: "challenge"
      }]
    };
    module2.exports.ConnectionSecureOk = 655381;
    var methodInfoConnectionSecureOk = module2.exports.methodInfoConnectionSecureOk = {
      id: 655381,
      classId: 10,
      methodId: 21,
      name: "ConnectionSecureOk",
      args: [{
        type: "longstr",
        name: "response"
      }]
    };
    module2.exports.ConnectionTune = 655390;
    var methodInfoConnectionTune = module2.exports.methodInfoConnectionTune = {
      id: 655390,
      classId: 10,
      methodId: 30,
      name: "ConnectionTune",
      args: [{
        type: "short",
        name: "channelMax",
        default: 0
      }, {
        type: "long",
        name: "frameMax",
        default: 0
      }, {
        type: "short",
        name: "heartbeat",
        default: 0
      }]
    };
    module2.exports.ConnectionTuneOk = 655391;
    var methodInfoConnectionTuneOk = module2.exports.methodInfoConnectionTuneOk = {
      id: 655391,
      classId: 10,
      methodId: 31,
      name: "ConnectionTuneOk",
      args: [{
        type: "short",
        name: "channelMax",
        default: 0
      }, {
        type: "long",
        name: "frameMax",
        default: 0
      }, {
        type: "short",
        name: "heartbeat",
        default: 0
      }]
    };
    module2.exports.ConnectionOpen = 655400;
    var methodInfoConnectionOpen = module2.exports.methodInfoConnectionOpen = {
      id: 655400,
      classId: 10,
      methodId: 40,
      name: "ConnectionOpen",
      args: [{
        type: "shortstr",
        name: "virtualHost",
        default: "/"
      }, {
        type: "shortstr",
        name: "capabilities",
        default: ""
      }, {
        type: "bit",
        name: "insist",
        default: false
      }]
    };
    module2.exports.ConnectionOpenOk = 655401;
    var methodInfoConnectionOpenOk = module2.exports.methodInfoConnectionOpenOk = {
      id: 655401,
      classId: 10,
      methodId: 41,
      name: "ConnectionOpenOk",
      args: [{
        type: "shortstr",
        name: "knownHosts",
        default: ""
      }]
    };
    module2.exports.ConnectionClose = 655410;
    var methodInfoConnectionClose = module2.exports.methodInfoConnectionClose = {
      id: 655410,
      classId: 10,
      methodId: 50,
      name: "ConnectionClose",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "short",
        name: "classId"
      }, {
        type: "short",
        name: "methodId"
      }]
    };
    module2.exports.ConnectionCloseOk = 655411;
    var methodInfoConnectionCloseOk = module2.exports.methodInfoConnectionCloseOk = {
      id: 655411,
      classId: 10,
      methodId: 51,
      name: "ConnectionCloseOk",
      args: []
    };
    module2.exports.ConnectionBlocked = 655420;
    var methodInfoConnectionBlocked = module2.exports.methodInfoConnectionBlocked = {
      id: 655420,
      classId: 10,
      methodId: 60,
      name: "ConnectionBlocked",
      args: [{
        type: "shortstr",
        name: "reason",
        default: ""
      }]
    };
    module2.exports.ConnectionUnblocked = 655421;
    var methodInfoConnectionUnblocked = module2.exports.methodInfoConnectionUnblocked = {
      id: 655421,
      classId: 10,
      methodId: 61,
      name: "ConnectionUnblocked",
      args: []
    };
    module2.exports.ConnectionUpdateSecret = 655430;
    var methodInfoConnectionUpdateSecret = module2.exports.methodInfoConnectionUpdateSecret = {
      id: 655430,
      classId: 10,
      methodId: 70,
      name: "ConnectionUpdateSecret",
      args: [{
        type: "longstr",
        name: "newSecret"
      }, {
        type: "shortstr",
        name: "reason"
      }]
    };
    module2.exports.ConnectionUpdateSecretOk = 655431;
    var methodInfoConnectionUpdateSecretOk = module2.exports.methodInfoConnectionUpdateSecretOk = {
      id: 655431,
      classId: 10,
      methodId: 71,
      name: "ConnectionUpdateSecretOk",
      args: []
    };
    module2.exports.ChannelOpen = 1310730;
    var methodInfoChannelOpen = module2.exports.methodInfoChannelOpen = {
      id: 1310730,
      classId: 20,
      methodId: 10,
      name: "ChannelOpen",
      args: [{
        type: "shortstr",
        name: "outOfBand",
        default: ""
      }]
    };
    module2.exports.ChannelOpenOk = 1310731;
    var methodInfoChannelOpenOk = module2.exports.methodInfoChannelOpenOk = {
      id: 1310731,
      classId: 20,
      methodId: 11,
      name: "ChannelOpenOk",
      args: [{
        type: "longstr",
        name: "channelId",
        default: ""
      }]
    };
    module2.exports.ChannelFlow = 1310740;
    var methodInfoChannelFlow = module2.exports.methodInfoChannelFlow = {
      id: 1310740,
      classId: 20,
      methodId: 20,
      name: "ChannelFlow",
      args: [{
        type: "bit",
        name: "active"
      }]
    };
    module2.exports.ChannelFlowOk = 1310741;
    var methodInfoChannelFlowOk = module2.exports.methodInfoChannelFlowOk = {
      id: 1310741,
      classId: 20,
      methodId: 21,
      name: "ChannelFlowOk",
      args: [{
        type: "bit",
        name: "active"
      }]
    };
    module2.exports.ChannelClose = 1310760;
    var methodInfoChannelClose = module2.exports.methodInfoChannelClose = {
      id: 1310760,
      classId: 20,
      methodId: 40,
      name: "ChannelClose",
      args: [{
        type: "short",
        name: "replyCode"
      }, {
        type: "shortstr",
        name: "replyText",
        default: ""
      }, {
        type: "short",
        name: "classId"
      }, {
        type: "short",
        name: "methodId"
      }]
    };
    module2.exports.ChannelCloseOk = 1310761;
    var methodInfoChannelCloseOk = module2.exports.methodInfoChannelCloseOk = {
      id: 1310761,
      classId: 20,
      methodId: 41,
      name: "ChannelCloseOk",
      args: []
    };
    module2.exports.AccessRequest = 1966090;
    var methodInfoAccessRequest = module2.exports.methodInfoAccessRequest = {
      id: 1966090,
      classId: 30,
      methodId: 10,
      name: "AccessRequest",
      args: [{
        type: "shortstr",
        name: "realm",
        default: "/data"
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "passive",
        default: true
      }, {
        type: "bit",
        name: "active",
        default: true
      }, {
        type: "bit",
        name: "write",
        default: true
      }, {
        type: "bit",
        name: "read",
        default: true
      }]
    };
    module2.exports.AccessRequestOk = 1966091;
    var methodInfoAccessRequestOk = module2.exports.methodInfoAccessRequestOk = {
      id: 1966091,
      classId: 30,
      methodId: 11,
      name: "AccessRequestOk",
      args: [{
        type: "short",
        name: "ticket",
        default: 1
      }]
    };
    module2.exports.ExchangeDeclare = 2621450;
    var methodInfoExchangeDeclare = module2.exports.methodInfoExchangeDeclare = {
      id: 2621450,
      classId: 40,
      methodId: 10,
      name: "ExchangeDeclare",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "type",
        default: "direct"
      }, {
        type: "bit",
        name: "passive",
        default: false
      }, {
        type: "bit",
        name: "durable",
        default: false
      }, {
        type: "bit",
        name: "autoDelete",
        default: false
      }, {
        type: "bit",
        name: "internal",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.ExchangeDeclareOk = 2621451;
    var methodInfoExchangeDeclareOk = module2.exports.methodInfoExchangeDeclareOk = {
      id: 2621451,
      classId: 40,
      methodId: 11,
      name: "ExchangeDeclareOk",
      args: []
    };
    module2.exports.ExchangeDelete = 2621460;
    var methodInfoExchangeDelete = module2.exports.methodInfoExchangeDelete = {
      id: 2621460,
      classId: 40,
      methodId: 20,
      name: "ExchangeDelete",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "bit",
        name: "ifUnused",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.ExchangeDeleteOk = 2621461;
    var methodInfoExchangeDeleteOk = module2.exports.methodInfoExchangeDeleteOk = {
      id: 2621461,
      classId: 40,
      methodId: 21,
      name: "ExchangeDeleteOk",
      args: []
    };
    module2.exports.ExchangeBind = 2621470;
    var methodInfoExchangeBind = module2.exports.methodInfoExchangeBind = {
      id: 2621470,
      classId: 40,
      methodId: 30,
      name: "ExchangeBind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "destination"
      }, {
        type: "shortstr",
        name: "source"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.ExchangeBindOk = 2621471;
    var methodInfoExchangeBindOk = module2.exports.methodInfoExchangeBindOk = {
      id: 2621471,
      classId: 40,
      methodId: 31,
      name: "ExchangeBindOk",
      args: []
    };
    module2.exports.ExchangeUnbind = 2621480;
    var methodInfoExchangeUnbind = module2.exports.methodInfoExchangeUnbind = {
      id: 2621480,
      classId: 40,
      methodId: 40,
      name: "ExchangeUnbind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "destination"
      }, {
        type: "shortstr",
        name: "source"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.ExchangeUnbindOk = 2621491;
    var methodInfoExchangeUnbindOk = module2.exports.methodInfoExchangeUnbindOk = {
      id: 2621491,
      classId: 40,
      methodId: 51,
      name: "ExchangeUnbindOk",
      args: []
    };
    module2.exports.QueueDeclare = 3276810;
    var methodInfoQueueDeclare = module2.exports.methodInfoQueueDeclare = {
      id: 3276810,
      classId: 50,
      methodId: 10,
      name: "QueueDeclare",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "passive",
        default: false
      }, {
        type: "bit",
        name: "durable",
        default: false
      }, {
        type: "bit",
        name: "exclusive",
        default: false
      }, {
        type: "bit",
        name: "autoDelete",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.QueueDeclareOk = 3276811;
    var methodInfoQueueDeclareOk = module2.exports.methodInfoQueueDeclareOk = {
      id: 3276811,
      classId: 50,
      methodId: 11,
      name: "QueueDeclareOk",
      args: [{
        type: "shortstr",
        name: "queue"
      }, {
        type: "long",
        name: "messageCount"
      }, {
        type: "long",
        name: "consumerCount"
      }]
    };
    module2.exports.QueueBind = 3276820;
    var methodInfoQueueBind = module2.exports.methodInfoQueueBind = {
      id: 3276820,
      classId: 50,
      methodId: 20,
      name: "QueueBind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.QueueBindOk = 3276821;
    var methodInfoQueueBindOk = module2.exports.methodInfoQueueBindOk = {
      id: 3276821,
      classId: 50,
      methodId: 21,
      name: "QueueBindOk",
      args: []
    };
    module2.exports.QueuePurge = 3276830;
    var methodInfoQueuePurge = module2.exports.methodInfoQueuePurge = {
      id: 3276830,
      classId: 50,
      methodId: 30,
      name: "QueuePurge",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.QueuePurgeOk = 3276831;
    var methodInfoQueuePurgeOk = module2.exports.methodInfoQueuePurgeOk = {
      id: 3276831,
      classId: 50,
      methodId: 31,
      name: "QueuePurgeOk",
      args: [{
        type: "long",
        name: "messageCount"
      }]
    };
    module2.exports.QueueDelete = 3276840;
    var methodInfoQueueDelete = module2.exports.methodInfoQueueDelete = {
      id: 3276840,
      classId: 50,
      methodId: 40,
      name: "QueueDelete",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "bit",
        name: "ifUnused",
        default: false
      }, {
        type: "bit",
        name: "ifEmpty",
        default: false
      }, {
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.QueueDeleteOk = 3276841;
    var methodInfoQueueDeleteOk = module2.exports.methodInfoQueueDeleteOk = {
      id: 3276841,
      classId: 50,
      methodId: 41,
      name: "QueueDeleteOk",
      args: [{
        type: "long",
        name: "messageCount"
      }]
    };
    module2.exports.QueueUnbind = 3276850;
    var methodInfoQueueUnbind = module2.exports.methodInfoQueueUnbind = {
      id: 3276850,
      classId: 50,
      methodId: 50,
      name: "QueueUnbind",
      args: [{
        type: "short",
        name: "ticket",
        default: 0
      }, {
        type: "shortstr",
        name: "queue",
        default: ""
      }, {
        type: "shortstr",
        name: "exchange"
      }, {
        type: "shortstr",
        name: "routingKey",
        default: ""
      }, {
        type: "table",
        name: "arguments",
        default: {}
      }]
    };
    module2.exports.QueueUnbindOk = 3276851;
    var methodInfoQueueUnbindOk = module2.exports.methodInfoQueueUnbindOk = {
      id: 3276851,
      classId: 50,
      methodId: 51,
      name: "QueueUnbindOk",
      args: []
    };
    module2.exports.TxSelect = 5898250;
    var methodInfoTxSelect = module2.exports.methodInfoTxSelect = {
      id: 5898250,
      classId: 90,
      methodId: 10,
      name: "TxSelect",
      args: []
    };
    module2.exports.TxSelectOk = 5898251;
    var methodInfoTxSelectOk = module2.exports.methodInfoTxSelectOk = {
      id: 5898251,
      classId: 90,
      methodId: 11,
      name: "TxSelectOk",
      args: []
    };
    module2.exports.TxCommit = 5898260;
    var methodInfoTxCommit = module2.exports.methodInfoTxCommit = {
      id: 5898260,
      classId: 90,
      methodId: 20,
      name: "TxCommit",
      args: []
    };
    module2.exports.TxCommitOk = 5898261;
    var methodInfoTxCommitOk = module2.exports.methodInfoTxCommitOk = {
      id: 5898261,
      classId: 90,
      methodId: 21,
      name: "TxCommitOk",
      args: []
    };
    module2.exports.TxRollback = 5898270;
    var methodInfoTxRollback = module2.exports.methodInfoTxRollback = {
      id: 5898270,
      classId: 90,
      methodId: 30,
      name: "TxRollback",
      args: []
    };
    module2.exports.TxRollbackOk = 5898271;
    var methodInfoTxRollbackOk = module2.exports.methodInfoTxRollbackOk = {
      id: 5898271,
      classId: 90,
      methodId: 31,
      name: "TxRollbackOk",
      args: []
    };
    module2.exports.ConfirmSelect = 5570570;
    var methodInfoConfirmSelect = module2.exports.methodInfoConfirmSelect = {
      id: 5570570,
      classId: 85,
      methodId: 10,
      name: "ConfirmSelect",
      args: [{
        type: "bit",
        name: "nowait",
        default: false
      }]
    };
    module2.exports.ConfirmSelectOk = 5570571;
    var methodInfoConfirmSelectOk = module2.exports.methodInfoConfirmSelectOk = {
      id: 5570571,
      classId: 85,
      methodId: 11,
      name: "ConfirmSelectOk",
      args: []
    };
    module2.exports.BasicProperties = 60;
    var propertiesInfoBasicProperties = module2.exports.propertiesInfoBasicProperties = {
      id: 60,
      name: "BasicProperties",
      args: [{
        type: "shortstr",
        name: "contentType"
      }, {
        type: "shortstr",
        name: "contentEncoding"
      }, {
        type: "table",
        name: "headers"
      }, {
        type: "octet",
        name: "deliveryMode"
      }, {
        type: "octet",
        name: "priority"
      }, {
        type: "shortstr",
        name: "correlationId"
      }, {
        type: "shortstr",
        name: "replyTo"
      }, {
        type: "shortstr",
        name: "expiration"
      }, {
        type: "shortstr",
        name: "messageId"
      }, {
        type: "timestamp",
        name: "timestamp"
      }, {
        type: "shortstr",
        name: "type"
      }, {
        type: "shortstr",
        name: "userId"
      }, {
        type: "shortstr",
        name: "appId"
      }, {
        type: "shortstr",
        name: "clusterId"
      }]
    };
  }
});

// node_modules/amqplib/lib/frame.js
var require_frame = __commonJS({
  "node_modules/amqplib/lib/frame.js"(exports2, module2) {
    "use strict";
    var ints = require_buffer_more_ints();
    var defs = require_defs();
    var constants = defs.constants;
    var decode = defs.decode;
    module2.exports.PROTOCOL_HEADER = "AMQP" + String.fromCharCode(0, 0, 9, 1);
    var FRAME_METHOD = constants.FRAME_METHOD;
    var FRAME_HEARTBEAT = constants.FRAME_HEARTBEAT;
    var FRAME_HEADER = constants.FRAME_HEADER;
    var FRAME_BODY = constants.FRAME_BODY;
    var FRAME_END = constants.FRAME_END;
    var TYPE_BYTES = 1;
    var CHANNEL_BYTES = 2;
    var SIZE_BYTES = 4;
    var FRAME_HEADER_BYTES = TYPE_BYTES + CHANNEL_BYTES + SIZE_BYTES;
    var FRAME_END_BYTES = 1;
    function readInt64BE(buffer, offset) {
      if (typeof Buffer.prototype.readBigInt64BE === "function") {
        return Number(buffer.readBigInt64BE(offset));
      }
      return ints.readInt64BE(buffer, offset);
    }
    module2.exports.makeBodyFrame = function(channel, payload) {
      const frameSize = FRAME_HEADER_BYTES + payload.length + FRAME_END_BYTES;
      const frame = Buffer.alloc(frameSize);
      let offset = 0;
      offset = frame.writeUInt8(FRAME_BODY, offset);
      offset = frame.writeUInt16BE(channel, offset);
      offset = frame.writeInt32BE(payload.length, offset);
      payload.copy(frame, offset);
      offset += payload.length;
      frame.writeUInt8(FRAME_END, offset);
      return frame;
    };
    function parseFrame(bin) {
      if (bin.length < FRAME_HEADER_BYTES) {
        return false;
      }
      const type = bin.readUInt8(0);
      const channel = bin.readUInt16BE(1);
      const size = bin.readUInt32BE(3);
      const totalSize = FRAME_HEADER_BYTES + size + FRAME_END_BYTES;
      if (bin.length < totalSize) {
        return false;
      }
      const frameEnd = bin.readUInt8(FRAME_HEADER_BYTES + size);
      if (frameEnd !== FRAME_END) {
        throw new Error("Invalid frame");
      }
      return {
        type,
        channel,
        size,
        payload: bin.subarray(FRAME_HEADER_BYTES, FRAME_HEADER_BYTES + size),
        rest: bin.subarray(totalSize)
      };
    }
    module2.exports.parseFrame = parseFrame;
    var HEARTBEAT = { channel: 0 };
    module2.exports.decodeFrame = (frame) => {
      const payload = frame.payload;
      const channel = frame.channel;
      switch (frame.type) {
        case FRAME_METHOD: {
          const id = payload.readUInt32BE(0);
          const args = payload.subarray(4);
          const fields = decode(id, args);
          return { id, channel, fields };
        }
        case FRAME_HEADER: {
          const id = payload.readUInt16BE(0);
          const size = readInt64BE(payload, 4);
          const flagsAndfields = payload.subarray(12);
          const fields = decode(id, flagsAndfields);
          return { id, channel, size, fields };
        }
        case FRAME_BODY:
          return { channel, content: payload };
        case FRAME_HEARTBEAT:
          return HEARTBEAT;
        default:
          throw new Error("Unknown frame type " + frame.type);
      }
    };
    module2.exports.HEARTBEAT_BUF = Buffer.from([
      constants.FRAME_HEARTBEAT,
      0,
      0,
      0,
      0,
      // size = 0
      0,
      0,
      // channel = 0
      constants.FRAME_END
    ]);
    module2.exports.HEARTBEAT = HEARTBEAT;
  }
});

// node_modules/amqplib/lib/mux.js
var require_mux = __commonJS({
  "node_modules/amqplib/lib/mux.js"(exports2, module2) {
    "use strict";
    var assert = require("assert");
    var schedule = typeof setImmediate === "function" ? setImmediate : process.nextTick;
    var Mux = class {
      constructor(downstream) {
        this.newStreams = [];
        this.oldStreams = [];
        this.blocked = false;
        this.scheduledRead = false;
        this.out = downstream;
        var self2 = this;
        downstream.on("drain", function() {
          self2.blocked = false;
          self2._readIncoming();
        });
      }
      // There are 2 states we can be in:
      // - waiting for outbound capacity, which will be signalled by a
      // - 'drain' event on the downstream; or,
      // - no packets to send, waiting for an inbound buffer to have
      //   packets, which will be signalled by a 'readable' event
      // If we write all packets available whenever there is outbound
      // capacity, we will either run out of outbound capacity (`#write`
      // returns false), or run out of packets (all calls to an
      // `inbound.read()` have returned null).
      _readIncoming() {
        if (this.blocked) return;
        var accepting = true;
        var out = this.out;
        function roundrobin(streams) {
          var s;
          while (accepting && (s = streams.shift())) {
            var chunk = s.read();
            if (chunk !== null) {
              accepting = out.write(chunk);
              streams.push(s);
            }
          }
        }
        roundrobin(this.newStreams);
        if (accepting) {
          assert.equal(0, this.newStreams.length);
          roundrobin(this.oldStreams);
        } else {
          assert(this.newStreams.length > 0, "Expect some new streams to remain");
          Array.prototype.push.apply(this.oldStreams, this.newStreams);
          this.newStreams = [];
        }
        this.blocked = !accepting;
      }
      _scheduleRead() {
        var self2 = this;
        if (!self2.scheduledRead) {
          schedule(function() {
            self2.scheduledRead = false;
            self2._readIncoming();
          });
          self2.scheduledRead = true;
        }
      }
      pipeFrom(readable) {
        var self2 = this;
        function enqueue() {
          self2.newStreams.push(readable);
          self2._scheduleRead();
        }
        function cleanup() {
          readable.removeListener("readable", enqueue);
          readable.removeListener("error", cleanup);
          readable.removeListener("end", cleanup);
          readable.removeListener("unpipeFrom", cleanupIfMe);
        }
        function cleanupIfMe(dest) {
          if (dest === self2) cleanup();
        }
        readable.on("unpipeFrom", cleanupIfMe);
        readable.on("end", cleanup);
        readable.on("error", cleanup);
        readable.on("readable", enqueue);
      }
      unpipeFrom(readable) {
        readable.emit("unpipeFrom", this);
      }
    };
    module2.exports.Mux = Mux;
  }
});

// node_modules/amqplib/lib/heartbeat.js
var require_heartbeat = __commonJS({
  "node_modules/amqplib/lib/heartbeat.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    module2.exports.UNITS_TO_MS = 1e3;
    var Heart = class extends EventEmitter {
      constructor(interval, checkSend, checkRecv) {
        super();
        this.interval = interval;
        var intervalMs = interval * module2.exports.UNITS_TO_MS;
        var beat = this.emit.bind(this, "beat");
        var timeout = this.emit.bind(this, "timeout");
        this.sendTimer = setInterval(
          this.runHeartbeat.bind(this, checkSend, beat),
          intervalMs / 2
        );
        var recvMissed = 0;
        function missedTwo() {
          if (!checkRecv())
            return ++recvMissed < 2;
          else {
            recvMissed = 0;
            return true;
          }
        }
        this.recvTimer = setInterval(
          this.runHeartbeat.bind(this, missedTwo, timeout),
          intervalMs
        );
      }
      clear() {
        clearInterval(this.sendTimer);
        clearInterval(this.recvTimer);
      }
      runHeartbeat(check, fail) {
        if (!check())
          fail();
      }
    };
    module2.exports.Heart = Heart;
  }
});

// node_modules/amqplib/lib/format.js
var require_format = __commonJS({
  "node_modules/amqplib/lib/format.js"(exports2, module2) {
    "use strict";
    var defs = require_defs();
    var format = require("util").format;
    var HEARTBEAT = require_frame().HEARTBEAT;
    module2.exports.closeMessage = function(close) {
      var code = close.fields.replyCode;
      return format(
        '%d (%s) with message "%s"',
        code,
        defs.constant_strs[code],
        close.fields.replyText
      );
    };
    module2.exports.methodName = function(id) {
      return defs.info(id).name;
    };
    module2.exports.inspect = function(frame, showFields) {
      if (frame === HEARTBEAT) {
        return "<Heartbeat>";
      } else if (!frame.id) {
        return format(
          "<Content channel:%d size:%d>",
          frame.channel,
          frame.size
        );
      } else {
        var info = defs.info(frame.id);
        return format(
          "<%s channel:%d%s>",
          info.name,
          frame.channel,
          showFields ? " " + JSON.stringify(frame.fields, void 0, 2) : ""
        );
      }
    };
  }
});

// node_modules/amqplib/lib/bitset.js
var require_bitset = __commonJS({
  "node_modules/amqplib/lib/bitset.js"(exports2, module2) {
    "use strict";
    var BitSet = class {
      /**
       * @param {number} [size]
       */
      constructor(size) {
        if (size) {
          const numWords = Math.ceil(size / 32);
          this.words = new Array(numWords);
        } else {
          this.words = [];
        }
        this.wordsInUse = 0;
      }
      /**
       * @param {number} numWords
       */
      ensureSize(numWords) {
        const wordsPresent = this.words.length;
        if (wordsPresent < numWords) {
          this.words = this.words.concat(new Array(numWords - wordsPresent));
        }
      }
      /**
       * @param {number} bitIndex
       */
      set(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse) {
          this.ensureSize(w + 1);
          this.wordsInUse = w + 1;
        }
        const bit = 1 << bitIndex;
        this.words[w] |= bit;
      }
      /**
       * @param {number} bitIndex
       */
      clear(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse) return;
        const mask = ~(1 << bitIndex);
        this.words[w] &= mask;
      }
      /**
       * @param {number} bitIndex
       */
      get(bitIndex) {
        const w = wordIndex(bitIndex);
        if (w >= this.wordsInUse) return false;
        const bit = 1 << bitIndex;
        return !!(this.words[w] & bit);
      }
      /**
       * Give the next bit that is set on or after fromIndex, or -1 if no such bit
       *
       * @param {number} fromIndex
       */
      nextSetBit(fromIndex) {
        let w = wordIndex(fromIndex);
        if (w >= this.wordsInUse) return -1;
        let word = this.words[w] & 4294967295 << fromIndex;
        while (true) {
          if (word) return w * 32 + trailingZeros(word);
          w++;
          if (w === this.wordsInUse) return -1;
          word = this.words[w];
        }
      }
      /**
       * @param {number} fromIndex
       */
      nextClearBit(fromIndex) {
        let w = wordIndex(fromIndex);
        if (w >= this.wordsInUse) return fromIndex;
        let word = ~this.words[w] & 4294967295 << fromIndex;
        while (true) {
          if (word) return w * 32 + trailingZeros(word);
          w++;
          if (w == this.wordsInUse) return w * 32;
          word = ~this.words[w];
        }
      }
    };
    function wordIndex(bitIndex) {
      return Math.floor(bitIndex / 32);
    }
    function trailingZeros(i) {
      if (i === 0) return 32;
      let y, n = 31;
      y = i << 16;
      if (y != 0) {
        n = n - 16;
        i = y;
      }
      y = i << 8;
      if (y != 0) {
        n = n - 8;
        i = y;
      }
      y = i << 4;
      if (y != 0) {
        n = n - 4;
        i = y;
      }
      y = i << 2;
      if (y != 0) {
        n = n - 2;
        i = y;
      }
      return n - (i << 1 >>> 31);
    }
    module2.exports.BitSet = BitSet;
  }
});

// node_modules/amqplib/lib/error.js
var require_error = __commonJS({
  "node_modules/amqplib/lib/error.js"(exports2, module2) {
    var inherits = require("util").inherits;
    function trimStack(stack, num) {
      return stack && stack.split("\n").slice(num).join("\n");
    }
    function IllegalOperationError(msg, stack) {
      var tmp = new Error();
      this.message = msg;
      this.stack = this.toString() + "\n" + trimStack(tmp.stack, 2);
      this.stackAtStateChange = stack;
    }
    inherits(IllegalOperationError, Error);
    IllegalOperationError.prototype.name = "IllegalOperationError";
    function stackCapture(reason) {
      var e = new Error();
      return "Stack capture: " + reason + "\n" + trimStack(e.stack, 2);
    }
    module2.exports.IllegalOperationError = IllegalOperationError;
    module2.exports.stackCapture = stackCapture;
  }
});

// node_modules/amqplib/lib/connection.js
var require_connection = __commonJS({
  "node_modules/amqplib/lib/connection.js"(exports2, module2) {
    "use strict";
    var defs = require_defs();
    var constants = defs.constants;
    var frame = require_frame();
    var HEARTBEAT = frame.HEARTBEAT;
    var Mux = require_mux().Mux;
    var Duplex = require("stream").Duplex;
    var EventEmitter = require("events");
    var Heart = require_heartbeat().Heart;
    var methodName = require_format().methodName;
    var closeMsg = require_format().closeMessage;
    var inspect = require_format().inspect;
    var BitSet = require_bitset().BitSet;
    var fmt = require("util").format;
    var PassThrough = require("stream").PassThrough;
    var IllegalOperationError = require_error().IllegalOperationError;
    var stackCapture = require_error().stackCapture;
    var DEFAULT_WRITE_HWM = 1024;
    var SINGLE_CHUNK_THRESHOLD = 2048;
    var Connection = class extends EventEmitter {
      constructor(underlying) {
        super();
        var stream = this.stream = wrapStream(underlying);
        this.muxer = new Mux(stream);
        this.rest = Buffer.alloc(0);
        this.frameMax = constants.FRAME_MIN_SIZE;
        this.sentSinceLastCheck = false;
        this.recvSinceLastCheck = false;
        this.expectSocketClose = false;
        this.freeChannels = new BitSet();
        this.channels = [{
          channel: { accept: channel0(this) },
          buffer: underlying
        }];
      }
      // This changed between versions, as did the codec, methods, etc. AMQP
      // 0-9-1 is fairly similar to 0.8, but better, and nothing implements
      // 0.8 that doesn't implement 0-9-1. In other words, it doesn't make
      // much sense to generalise here.
      sendProtocolHeader() {
        this.sendBytes(frame.PROTOCOL_HEADER);
      }
      /*
          The frighteningly complicated opening protocol (spec section 2.2.4):
      
             Client -> Server
      
               protocol header ->
                 <- start
               start-ok ->
             .. next two zero or more times ..
                 <- secure
               secure-ok ->
                 <- tune
               tune-ok ->
               open ->
                 <- open-ok
      
        If I'm only supporting SASL's PLAIN mechanism (which I am for the time
        being), it gets a bit easier since the server won't in general send
        back a `secure`, it'll just send `tune` after the `start-ok`.
        (SASL PLAIN: http://tools.ietf.org/html/rfc4616)
      
        */
      open(allFields, openCallback0) {
        var self2 = this;
        var openCallback = openCallback0 || function() {
        };
        var tunedOptions = Object.create(allFields);
        function wait(k) {
          self2.step(function(err, frame2) {
            if (err !== null)
              bail(err);
            else if (frame2.channel !== 0) {
              bail(new Error(
                fmt(
                  "Frame on channel != 0 during handshake: %s",
                  inspect(frame2, false)
                )
              ));
            } else
              k(frame2);
          });
        }
        function expect(Method, k) {
          wait(function(frame2) {
            if (frame2.id === Method)
              k(frame2);
            else {
              bail(new Error(
                fmt(
                  "Expected %s; got %s",
                  methodName(Method),
                  inspect(frame2, false)
                )
              ));
            }
          });
        }
        function bail(err) {
          openCallback(err);
        }
        function send(Method) {
          self2.sendMethod(0, Method, tunedOptions);
        }
        function negotiate(server, desired) {
          if (server === 0 || desired === 0) {
            return Math.max(server, desired);
          } else {
            return Math.min(server, desired);
          }
        }
        function onStart(start) {
          var mechanisms = start.fields.mechanisms.toString().split(" ");
          if (mechanisms.indexOf(allFields.mechanism) < 0) {
            bail(new Error(fmt(
              "SASL mechanism %s is not provided by the server",
              allFields.mechanism
            )));
            return;
          }
          self2.serverProperties = start.fields.serverProperties;
          try {
            send(defs.ConnectionStartOk);
          } catch (err) {
            bail(err);
            return;
          }
          wait(afterStartOk);
        }
        function afterStartOk(reply) {
          switch (reply.id) {
            case defs.ConnectionSecure:
              bail(new Error(
                "Wasn't expecting to have to go through secure"
              ));
              break;
            case defs.ConnectionClose:
              bail(new Error(fmt(
                "Handshake terminated by server: %s",
                closeMsg(reply)
              )));
              break;
            case defs.ConnectionTune:
              var fields = reply.fields;
              tunedOptions.frameMax = negotiate(fields.frameMax, allFields.frameMax);
              tunedOptions.channelMax = negotiate(fields.channelMax, allFields.channelMax);
              tunedOptions.heartbeat = negotiate(fields.heartbeat, allFields.heartbeat);
              try {
                send(defs.ConnectionTuneOk);
                send(defs.ConnectionOpen);
              } catch (err) {
                bail(err);
                return;
              }
              expect(defs.ConnectionOpenOk, onOpenOk);
              break;
            default:
              bail(new Error(
                fmt(
                  "Expected connection.secure, connection.close, or connection.tune during handshake; got %s",
                  inspect(reply, false)
                )
              ));
              break;
          }
        }
        function onOpenOk(openOk) {
          self2.channelMax = tunedOptions.channelMax || 65535;
          self2.frameMax = tunedOptions.frameMax || 4294967295;
          self2.heartbeat = tunedOptions.heartbeat;
          self2.heartbeater = self2.startHeartbeater();
          self2.accept = mainAccept;
          succeed(openOk);
        }
        function endWhileOpening(err) {
          bail(err || new Error("Socket closed abruptly during opening handshake"));
        }
        this.stream.on("end", endWhileOpening);
        this.stream.on("error", endWhileOpening);
        function succeed(ok) {
          self2.stream.removeListener("end", endWhileOpening);
          self2.stream.removeListener("error", endWhileOpening);
          self2.stream.on("error", self2.onSocketError.bind(self2));
          self2.stream.on("end", self2.onSocketError.bind(
            self2,
            new Error("Unexpected close")
          ));
          self2.on("frameError", self2.onSocketError.bind(self2));
          self2.acceptLoop();
          openCallback(null, ok);
        }
        this.sendProtocolHeader();
        expect(defs.ConnectionStart, onStart);
      }
      // Closing things: AMQP has a closing handshake that applies to
      // closing both connects and channels. As the initiating party, I send
      // Close, then ignore all frames until I see either CloseOK --
      // which signifies that the other party has seen the Close and shut
      // the connection or channel down, so it's fine to free resources; or
      // Close, which means the other party also wanted to close the
      // whatever, and I should send CloseOk so it can free resources,
      // then go back to waiting for the CloseOk. If I receive a Close
      // out of the blue, I should throw away any unsent frames (they will
      // be ignored anyway) and send CloseOk, then clean up resources. In
      // general, Close out of the blue signals an error (or a forced
      // closure, which may as well be an error).
      //
      //  RUNNING [1] --- send Close ---> Closing [2] ---> recv Close --+
      //     |                               |                         [3]
      //     |                               +------ send CloseOk ------+
      //  recv Close                   recv CloseOk
      //     |                               |
      //     V                               V
      //  Ended [4] ---- send CloseOk ---> Closed [5]
      //
      // [1] All frames accepted; getting a Close frame from the server
      // moves to Ended; client may initiate a close by sending Close
      // itself.
      // [2] Client has initiated a close; only CloseOk or (simulataneously
      // sent) Close is accepted.
      // [3] Simultaneous close
      // [4] Server won't send any more frames; accept no more frames, send
      // CloseOk.
      // [5] Fully closed, client will send no more, server will send no
      // more. Signal 'close' or 'error'.
      //
      // There are two signalling mechanisms used in the API. The first is
      // that calling `close` will return a promise, that will either
      // resolve once the connection or channel is cleanly shut down, or
      // will reject if the shutdown times out.
      //
      // The second is the 'close' and 'error' events. These are
      // emitted as above. The events will fire *before* promises are
      // resolved.
      // Close the connection without even giving a reason. Typical.
      close(closeCallback) {
        var k = closeCallback && function() {
          closeCallback(null);
        };
        this.closeBecause("Cheers, thanks", constants.REPLY_SUCCESS, k);
      }
      // Close with a reason and a 'code'. I'm pretty sure RabbitMQ totally
      // ignores these; maybe it logs them. The continuation will be invoked
      // when the CloseOk has been received, and before the 'close' event.
      closeBecause(reason, code, k) {
        this.sendMethod(0, defs.ConnectionClose, {
          replyText: reason,
          replyCode: code,
          methodId: 0,
          classId: 0
        });
        var s = stackCapture("closeBecause called: " + reason);
        this.toClosing(s, k);
      }
      closeWithError(reason, code, error) {
        this.emit("error", error);
        this.closeBecause(reason, code);
      }
      onSocketError(err) {
        if (!this.expectSocketClose) {
          this.expectSocketClose = true;
          this.emit("error", err);
          var s = stackCapture("Socket error");
          this.toClosed(s, err);
        }
      }
      // A close has been initiated. Repeat: a close has been initiated.
      // This means we should not send more frames, anyway they will be
      // ignored. We also have to shut down all the channels.
      toClosing(capturedStack, k) {
        var send = this.sendMethod.bind(this);
        this.accept = function(f) {
          if (f.id === defs.ConnectionCloseOk) {
            if (k)
              k();
            var s = stackCapture("ConnectionCloseOk received");
            this.toClosed(s, void 0);
          } else if (f.id === defs.ConnectionClose) {
            send(0, defs.ConnectionCloseOk, {});
          }
        };
        invalidateSend(this, "Connection closing", capturedStack);
      }
      _closeChannels(capturedStack) {
        for (var i = 1; i < this.channels.length; i++) {
          var ch = this.channels[i];
          if (ch !== null) {
            ch.channel.toClosed(capturedStack);
          }
        }
      }
      // A close has been confirmed. Cease all communication.
      toClosed(capturedStack, maybeErr) {
        this._closeChannels(capturedStack);
        var info = fmt(
          "Connection closed (%s)",
          maybeErr ? maybeErr.toString() : "by client"
        );
        invalidateSend(this, info, capturedStack);
        this.accept = invalidOp(info, capturedStack);
        this.close = function(cb) {
          cb && cb(new IllegalOperationError(info, capturedStack));
        };
        if (this.heartbeater)
          this.heartbeater.clear();
        this.expectSocketClose = true;
        this.stream.end();
        this.emit("close", maybeErr);
      }
      _updateSecret(newSecret, reason, cb) {
        this.sendMethod(0, defs.ConnectionUpdateSecret, {
          newSecret,
          reason
        });
        this.once("update-secret-ok", cb);
      }
      // ===
      startHeartbeater() {
        if (this.heartbeat === 0)
          return null;
        else {
          var self2 = this;
          var hb = new Heart(
            this.heartbeat,
            this.checkSend.bind(this),
            this.checkRecv.bind(this)
          );
          hb.on("timeout", function() {
            var hberr = new Error("Heartbeat timeout");
            self2.emit("error", hberr);
            var s = stackCapture("Heartbeat timeout");
            self2.toClosed(s, hberr);
          });
          hb.on("beat", function() {
            self2.sendHeartbeat();
          });
          return hb;
        }
      }
      // I use an array to keep track of the channels, rather than an
      // object. The channel identifiers are numbers, and allocated by the
      // connection. If I try to allocate low numbers when they are
      // available (which I do, by looking from the start of the bitset),
      // this ought to keep the array small, and out of 'sparse array
      // storage'. I also set entries to null, rather than deleting them, in
      // the expectation that the next channel allocation will fill the slot
      // again rather than growing the array. See
      // http://www.html5rocks.com/en/tutorials/speed/v8/
      freshChannel(channel, options) {
        var next = this.freeChannels.nextClearBit(1);
        if (next < 0 || next > this.channelMax)
          throw new Error("No channels left to allocate");
        this.freeChannels.set(next);
        var hwm = options && options.highWaterMark || DEFAULT_WRITE_HWM;
        var writeBuffer = new PassThrough({
          objectMode: true,
          highWaterMark: hwm
        });
        this.channels[next] = { channel, buffer: writeBuffer };
        writeBuffer.on("drain", function() {
          channel.onBufferDrain();
        });
        this.muxer.pipeFrom(writeBuffer);
        return next;
      }
      releaseChannel(channel) {
        this.freeChannels.clear(channel);
        var buffer = this.channels[channel].buffer;
        buffer.end();
        this.channels[channel] = null;
      }
      acceptLoop() {
        var self2 = this;
        function go() {
          try {
            var f;
            while (f = self2.recvFrame())
              self2.accept(f);
          } catch (e) {
            self2.emit("frameError", e);
          }
        }
        self2.stream.on("readable", go);
        go();
      }
      step(cb) {
        var self2 = this;
        function recv() {
          var f;
          try {
            f = self2.recvFrame();
          } catch (e) {
            cb(e, null);
            return;
          }
          if (f)
            cb(null, f);
          else
            self2.stream.once("readable", recv);
        }
        recv();
      }
      checkSend() {
        var check = this.sentSinceLastCheck;
        this.sentSinceLastCheck = false;
        return check;
      }
      checkRecv() {
        var check = this.recvSinceLastCheck;
        this.recvSinceLastCheck = false;
        return check;
      }
      sendBytes(bytes) {
        this.sentSinceLastCheck = true;
        this.stream.write(bytes);
      }
      sendHeartbeat() {
        return this.sendBytes(frame.HEARTBEAT_BUF);
      }
      sendMethod(channel, Method, fields) {
        var frame2 = encodeMethod(Method, channel, fields);
        this.sentSinceLastCheck = true;
        var buffer = this.channels[channel].buffer;
        return buffer.write(frame2);
      }
      sendMessage(channel, Method, fields, Properties, props, content) {
        if (!Buffer.isBuffer(content))
          throw new TypeError("content is not a buffer");
        var mframe = encodeMethod(Method, channel, fields);
        var pframe = encodeProperties(
          Properties,
          channel,
          content.length,
          props
        );
        var buffer = this.channels[channel].buffer;
        this.sentSinceLastCheck = true;
        var methodHeaderLen = mframe.length + pframe.length;
        var bodyLen = content.length > 0 ? content.length + FRAME_OVERHEAD : 0;
        var allLen = methodHeaderLen + bodyLen;
        if (allLen < SINGLE_CHUNK_THRESHOLD) {
          var all = Buffer.allocUnsafe(allLen);
          var offset = mframe.copy(all, 0);
          offset += pframe.copy(all, offset);
          if (bodyLen > 0)
            makeBodyFrame(channel, content).copy(all, offset);
          return buffer.write(all);
        } else {
          if (methodHeaderLen < SINGLE_CHUNK_THRESHOLD) {
            var both = Buffer.allocUnsafe(methodHeaderLen);
            var offset = mframe.copy(both, 0);
            pframe.copy(both, offset);
            buffer.write(both);
          } else {
            buffer.write(mframe);
            buffer.write(pframe);
          }
          return this.sendContent(channel, content);
        }
      }
      sendContent(channel, body) {
        if (!Buffer.isBuffer(body)) {
          throw new TypeError(fmt("Expected buffer; got %s", body));
        }
        var writeResult = true;
        var buffer = this.channels[channel].buffer;
        var maxBody = this.frameMax - FRAME_OVERHEAD;
        for (var offset = 0; offset < body.length; offset += maxBody) {
          var end = offset + maxBody;
          var slice = end > body.length ? body.subarray(offset) : body.subarray(offset, end);
          var bodyFrame = makeBodyFrame(channel, slice);
          writeResult = buffer.write(bodyFrame);
        }
        this.sentSinceLastCheck = true;
        return writeResult;
      }
      recvFrame() {
        var frame2 = parseFrame(this.rest);
        if (!frame2) {
          var incoming = this.stream.read();
          if (incoming === null) {
            return false;
          } else {
            this.recvSinceLastCheck = true;
            this.rest = Buffer.concat([this.rest, incoming]);
            return this.recvFrame();
          }
        } else {
          this.rest = frame2.rest;
          return decodeFrame(frame2);
        }
      }
    };
    function mainAccept(frame2) {
      var rec = this.channels[frame2.channel];
      if (rec) {
        return rec.channel.accept(frame2);
      } else
        this.closeWithError(
          fmt("Frame on unknown channel %d", frame2.channel),
          constants.CHANNEL_ERROR,
          new Error(fmt(
            "Frame on unknown channel: %s",
            inspect(frame2, false)
          ))
        );
    }
    function channel0(connection) {
      return function(f) {
        if (f === HEARTBEAT) ;
        else if (f.id === defs.ConnectionClose) {
          connection.sendMethod(0, defs.ConnectionCloseOk, {});
          var emsg = fmt("Connection closed: %s", closeMsg(f));
          var s = stackCapture(emsg);
          var e = new Error(emsg);
          e.code = f.fields.replyCode;
          if (isFatalError(e)) {
            connection.emit("error", e);
          }
          connection.toClosed(s, e);
        } else if (f.id === defs.ConnectionBlocked) {
          connection.emit("blocked", f.fields.reason);
        } else if (f.id === defs.ConnectionUnblocked) {
          connection.emit("unblocked");
        } else if (f.id === defs.ConnectionUpdateSecretOk) {
          connection.emit("update-secret-ok");
        } else {
          connection.closeWithError(
            fmt("Unexpected frame on channel 0"),
            constants.UNEXPECTED_FRAME,
            new Error(fmt(
              "Unexpected frame on channel 0: %s",
              inspect(f, false)
            ))
          );
        }
      };
    }
    function invalidOp(msg, stack) {
      return function() {
        throw new IllegalOperationError(msg, stack);
      };
    }
    function invalidateSend(conn, msg, stack) {
      conn.sendMethod = conn.sendContent = conn.sendMessage = invalidOp(msg, stack);
    }
    var encodeMethod = defs.encodeMethod;
    var encodeProperties = defs.encodeProperties;
    var FRAME_OVERHEAD = defs.FRAME_OVERHEAD;
    var makeBodyFrame = frame.makeBodyFrame;
    var parseFrame = frame.parseFrame;
    var decodeFrame = frame.decodeFrame;
    function wrapStream(s) {
      if (s instanceof Duplex) return s;
      else {
        var ws = new Duplex();
        ws.wrap(s);
        ws._write = function(chunk, encoding, callback) {
          return s.write(chunk, encoding, callback);
        };
        return ws;
      }
    }
    function isFatalError(error) {
      switch (error && error.code) {
        case defs.constants.CONNECTION_FORCED:
        case defs.constants.REPLY_SUCCESS:
          return false;
        default:
          return true;
      }
    }
    module2.exports.Connection = Connection;
    module2.exports.isFatalError = isFatalError;
  }
});

// node_modules/amqplib/lib/credentials.js
var require_credentials = __commonJS({
  "node_modules/amqplib/lib/credentials.js"(exports2, module2) {
    var codec = require_codec();
    module2.exports.plain = function(user, passwd) {
      return {
        mechanism: "PLAIN",
        response: function() {
          return Buffer.from(["", user, passwd].join(String.fromCharCode(0)));
        },
        username: user,
        password: passwd
      };
    };
    module2.exports.amqplain = function(user, passwd) {
      return {
        mechanism: "AMQPLAIN",
        response: function() {
          const buffer = Buffer.alloc(16384);
          const size = codec.encodeTable(buffer, { LOGIN: user, PASSWORD: passwd }, 0);
          return buffer.subarray(4, size);
        },
        username: user,
        password: passwd
      };
    };
    module2.exports.external = function() {
      return {
        mechanism: "EXTERNAL",
        response: function() {
          return Buffer.from("");
        }
      };
    };
  }
});

// node_modules/amqplib/package.json
var require_package = __commonJS({
  "node_modules/amqplib/package.json"(exports2, module2) {
    module2.exports = {
      name: "amqplib",
      homepage: "http://amqp-node.github.io/amqplib/",
      main: "./channel_api.js",
      version: "0.10.9",
      description: "An AMQP 0-9-1 (e.g., RabbitMQ) library and client.",
      repository: {
        type: "git",
        url: "git+https://github.com/amqp-node/amqplib.git"
      },
      engines: {
        node: ">=10"
      },
      dependencies: {
        "buffer-more-ints": "~1.0.0",
        "url-parse": "~1.5.10"
      },
      devDependencies: {
        claire: "0.4.1",
        mocha: "^9.2.2",
        nyc: "^15.1.0",
        "uglify-js": "2.8.x"
      },
      scripts: {
        test: "make test"
      },
      keywords: [
        "AMQP",
        "AMQP 0-9-1",
        "RabbitMQ"
      ],
      author: "Michael Bridgen <mikeb@squaremobius.net>",
      license: "MIT"
    };
  }
});

// node_modules/amqplib/lib/connect.js
var require_connect = __commonJS({
  "node_modules/amqplib/lib/connect.js"(exports2, module2) {
    "use strict";
    var URL = require_url_parse();
    var QS = require("querystring");
    var Connection = require_connection().Connection;
    var fmt = require("util").format;
    var credentials = require_credentials();
    function copyInto(obj, target) {
      var keys = Object.keys(obj);
      var i = keys.length;
      while (i--) {
        var k = keys[i];
        target[k] = obj[k];
      }
      return target;
    }
    function clone(obj) {
      return copyInto(obj, {});
    }
    var CLIENT_PROPERTIES = {
      "product": "amqplib",
      "version": require_package().version,
      "platform": fmt("Node.JS %s", process.version),
      "information": "https://amqp-node.github.io/amqplib/",
      "capabilities": {
        "publisher_confirms": true,
        "exchange_exchange_bindings": true,
        "basic.nack": true,
        "consumer_cancel_notify": true,
        "connection.blocked": true,
        "authentication_failure_close": true
      }
    };
    function openFrames(vhost, query, credentials2, extraClientProperties) {
      if (!vhost)
        vhost = "/";
      else
        vhost = QS.unescape(vhost);
      var query = query || {};
      function intOrDefault(val, def) {
        return val === void 0 ? def : parseInt(val);
      }
      var clientProperties = Object.create(CLIENT_PROPERTIES);
      return {
        // start-ok
        "clientProperties": copyInto(extraClientProperties, clientProperties),
        "mechanism": credentials2.mechanism,
        "response": credentials2.response(),
        "locale": query.locale || "en_US",
        // tune-ok
        "channelMax": intOrDefault(query.channelMax, 0),
        "frameMax": intOrDefault(query.frameMax, 131072),
        "heartbeat": intOrDefault(query.heartbeat, 0),
        // open
        "virtualHost": vhost,
        "capabilities": "",
        "insist": 0
      };
    }
    function credentialsFromUrl(parts) {
      var user = "guest", passwd = "guest";
      if (parts.username != "" || parts.password != "") {
        user = parts.username ? unescape(parts.username) : "";
        passwd = parts.password ? unescape(parts.password) : "";
      }
      return credentials.plain(user, passwd);
    }
    function connect(url, socketOptions, openCallback) {
      var sockopts = clone(socketOptions || {});
      url = url || "amqp://localhost";
      var noDelay = !!sockopts.noDelay;
      var timeout = sockopts.timeout;
      var keepAlive = !!sockopts.keepAlive;
      var keepAliveDelay = sockopts.keepAliveDelay || 0;
      var extraClientProperties = sockopts.clientProperties || {};
      var protocol, fields;
      if (typeof url === "object") {
        protocol = (url.protocol || "amqp") + ":";
        sockopts.host = url.hostname;
        sockopts.servername = sockopts.servername || url.hostname;
        sockopts.port = url.port || (protocol === "amqp:" ? 5672 : 5671);
        var user, pass;
        if (url.username == void 0 && url.password == void 0) {
          user = "guest";
          pass = "guest";
        } else {
          user = url.username || "";
          pass = url.password || "";
        }
        var config = {
          locale: url.locale,
          channelMax: url.channelMax,
          frameMax: url.frameMax,
          heartbeat: url.heartbeat
        };
        fields = openFrames(url.vhost, config, sockopts.credentials || credentials.plain(user, pass), extraClientProperties);
      } else {
        var parts = URL(url, true);
        var host = parts.hostname.replace(/^\[|\]$/g, "");
        protocol = parts.protocol;
        sockopts.host = host;
        sockopts.servername = sockopts.servername || host;
        sockopts.port = parseInt(parts.port) || (protocol === "amqp:" ? 5672 : 5671);
        var vhost = parts.pathname ? parts.pathname.substr(1) : null;
        fields = openFrames(vhost, parts.query, sockopts.credentials || credentialsFromUrl(parts), extraClientProperties);
      }
      var sockok = false;
      var sock;
      function onConnect() {
        sockok = true;
        sock.setNoDelay(noDelay);
        if (keepAlive) sock.setKeepAlive(keepAlive, keepAliveDelay);
        var c = new Connection(sock);
        c.open(fields, function(err, ok) {
          if (timeout) sock.setTimeout(0);
          if (err === null) {
            openCallback(null, c);
          } else {
            sock.end();
            sock.destroy();
            openCallback(err);
          }
        });
      }
      if (protocol === "amqp:") {
        sock = require("net").connect(sockopts, onConnect);
      } else if (protocol === "amqps:") {
        sock = require("tls").connect(sockopts, onConnect);
      } else {
        throw new Error("Expected amqp: or amqps: as the protocol; got " + protocol);
      }
      if (timeout) {
        sock.setTimeout(timeout, function() {
          sock.end();
          sock.destroy();
          openCallback(new Error("connect ETIMEDOUT"));
        });
      }
      sock.once("error", function(err) {
        if (!sockok) openCallback(err);
      });
    }
    module2.exports.connect = connect;
    module2.exports.credentialsFromUrl = credentialsFromUrl;
  }
});

// node_modules/amqplib/lib/channel.js
var require_channel = __commonJS({
  "node_modules/amqplib/lib/channel.js"(exports2, module2) {
    "use strict";
    var defs = require_defs();
    var closeMsg = require_format().closeMessage;
    var inspect = require_format().inspect;
    var methodName = require_format().methodName;
    var assert = require("assert");
    var EventEmitter = require("events");
    var fmt = require("util").format;
    var IllegalOperationError = require_error().IllegalOperationError;
    var stackCapture = require_error().stackCapture;
    var Channel = class extends EventEmitter {
      constructor(connection) {
        super();
        this.connection = connection;
        this.reply = null;
        this.pending = [];
        this.lwm = 1;
        this.unconfirmed = [];
        this.on("ack", this.handleConfirm.bind(this, function(cb) {
          if (cb)
            cb(null);
        }));
        this.on("nack", this.handleConfirm.bind(this, function(cb) {
          if (cb)
            cb(new Error("message nacked"));
        }));
        this.on("close", function() {
          var cb;
          while (cb = this.unconfirmed.shift()) {
            if (cb)
              cb(new Error("channel closed"));
          }
        });
        this.handleMessage = acceptDeliveryOrReturn;
      }
      setOptions(options) {
        this.options = options;
      }
      allocate() {
        this.ch = this.connection.freshChannel(this, this.options);
        return this;
      }
      // Incoming frames are either notifications of e.g., message delivery,
      // or replies to something we've sent. In general I deal with the
      // former by emitting an event, and with the latter by keeping a track
      // of what's expecting a reply.
      //
      // The AMQP specification implies that RPCs can't be pipelined; that
      // is, you can have only one outstanding RPC on a channel at a
      // time. Certainly that's what RabbitMQ and its clients assume. For
      // this reason, I buffer RPCs if the channel is already waiting for a
      // reply.
      // Just send the damn frame.
      sendImmediately(method, fields) {
        return this.connection.sendMethod(this.ch, method, fields);
      }
      // Invariant: !this.reply -> pending.length == 0. That is, whenever we
      // clear a reply, we must send another RPC (and thereby fill
      // this.reply) if there is one waiting. The invariant relevant here
      // and in `accept`.
      sendOrEnqueue(method, fields, reply) {
        if (!this.reply) {
          assert(this.pending.length === 0);
          this.reply = reply;
          this.sendImmediately(method, fields);
        } else {
          this.pending.push({
            method,
            fields,
            reply
          });
        }
      }
      sendMessage(fields, properties, content) {
        return this.connection.sendMessage(
          this.ch,
          defs.BasicPublish,
          fields,
          defs.BasicProperties,
          properties,
          content
        );
      }
      // Internal, synchronously resolved RPC; the return value is resolved
      // with the whole frame.
      _rpc(method, fields, expect, cb) {
        var self2 = this;
        function reply(err, f) {
          if (err === null) {
            if (f.id === expect) {
              return cb(null, f);
            } else {
              var expectedName = methodName(expect);
              var e = new Error(fmt(
                "Expected %s; got %s",
                expectedName,
                inspect(f, false)
              ));
              self2.closeWithError(
                f.id,
                fmt(
                  "Expected %s; got %s",
                  expectedName,
                  methodName(f.id)
                ),
                defs.constants.UNEXPECTED_FRAME,
                e
              );
              return cb(e);
            }
          } else if (err instanceof Error)
            return cb(err);
          else {
            var closeReason = (err.fields.classId << 16) + err.fields.methodId;
            var e = method === closeReason ? fmt(
              "Operation failed: %s; %s",
              methodName(method),
              closeMsg(err)
            ) : fmt("Channel closed by server: %s", closeMsg(err));
            var closeFrameError = new Error(e);
            closeFrameError.code = err.fields.replyCode;
            closeFrameError.classId = err.fields.classId;
            closeFrameError.methodId = err.fields.methodId;
            return cb(closeFrameError);
          }
        }
        this.sendOrEnqueue(method, fields, reply);
      }
      // Move to entirely closed state.
      toClosed(capturedStack) {
        this._rejectPending();
        invalidateSend(this, "Channel closed", capturedStack);
        this.accept = invalidOp("Channel closed", capturedStack);
        this.connection.releaseChannel(this.ch);
        this.emit("close");
      }
      // Stop being able to send and receive methods and content. Used when
      // we close the channel. Invokes the continuation once the server has
      // acknowledged the close, but before the channel is moved to the
      // closed state.
      toClosing(capturedStack, k) {
        var send = this.sendImmediately.bind(this);
        invalidateSend(this, "Channel closing", capturedStack);
        this.accept = function(f) {
          if (f.id === defs.ChannelCloseOk) {
            if (k)
              k();
            var s = stackCapture("ChannelCloseOk frame received");
            this.toClosed(s);
          } else if (f.id === defs.ChannelClose) {
            send(defs.ChannelCloseOk, {});
          }
        };
      }
      _rejectPending() {
        function rej(r) {
          r(new Error("Channel ended, no reply will be forthcoming"));
        }
        if (this.reply !== null)
          rej(this.reply);
        this.reply = null;
        var discard;
        while (discard = this.pending.shift())
          rej(discard.reply);
        this.pending = null;
      }
      closeBecause(reason, code, k) {
        this.sendImmediately(defs.ChannelClose, {
          replyText: reason,
          replyCode: code,
          methodId: 0,
          classId: 0
        });
        var s = stackCapture("closeBecause called: " + reason);
        this.toClosing(s, k);
      }
      // If we close because there's been an error, we need to distinguish
      // between what we tell the server (`reason`) and what we report as
      // the cause in the client (`error`).
      closeWithError(id, reason, code, error) {
        var self2 = this;
        this.closeBecause(reason, code, function() {
          error.code = code;
          if (id) {
            error.classId = defs.info(id).classId;
            error.methodId = defs.info(id).methodId;
          }
          self2.emit("error", error);
        });
      }
      // A trampolining state machine for message frames on a channel. A
      // message arrives in at least two frames: first, a method announcing
      // the message (either a BasicDeliver or BasicGetOk); then, a message
      // header with the message properties; then, zero or more content
      // frames.
      // Keep the try/catch localised, in an attempt to avoid disabling
      // optimisation
      acceptMessageFrame(f) {
        try {
          this.handleMessage = this.handleMessage(f);
        } catch (msg) {
          if (typeof msg === "string") {
            this.closeWithError(
              f.id,
              msg,
              defs.constants.UNEXPECTED_FRAME,
              new Error(msg)
            );
          } else if (msg instanceof Error) {
            this.closeWithError(
              f.id,
              "Error while processing message",
              defs.constants.INTERNAL_ERROR,
              msg
            );
          } else {
            this.closeWithError(
              f.id,
              "Internal error while processing message",
              defs.constants.INTERNAL_ERROR,
              new Error(msg.toString())
            );
          }
        }
      }
      handleConfirm(handle, f) {
        var tag = f.deliveryTag;
        var multi = f.multiple;
        if (multi) {
          var confirmed = this.unconfirmed.splice(0, tag - this.lwm + 1);
          this.lwm = tag + 1;
          confirmed.forEach(handle);
        } else {
          var c;
          if (tag === this.lwm) {
            c = this.unconfirmed.shift();
            this.lwm++;
            while (this.unconfirmed[0] === null) {
              this.unconfirmed.shift();
              this.lwm++;
            }
          } else {
            c = this.unconfirmed[tag - this.lwm];
            this.unconfirmed[tag - this.lwm] = null;
          }
          handle(c);
        }
      }
      pushConfirmCallback(cb) {
        this.unconfirmed.push(cb || false);
      }
      onBufferDrain() {
        this.emit("drain");
      }
      accept(f) {
        switch (f.id) {
          // Message frames
          case void 0:
          // content frame!
          case defs.BasicDeliver:
          case defs.BasicReturn:
          case defs.BasicProperties:
            return this.acceptMessageFrame(f);
          // confirmations, need to do confirm.select first
          case defs.BasicAck:
            return this.emit("ack", f.fields);
          case defs.BasicNack:
            return this.emit("nack", f.fields);
          case defs.BasicCancel:
            return this.emit("cancel", f.fields);
          case defs.ChannelClose:
            if (this.reply) {
              var reply = this.reply;
              this.reply = null;
              reply(f);
            }
            var emsg = "Channel closed by server: " + closeMsg(f);
            this.sendImmediately(defs.ChannelCloseOk, {});
            var error = new Error(emsg);
            error.code = f.fields.replyCode;
            error.classId = f.fields.classId;
            error.methodId = f.fields.methodId;
            this.emit("error", error);
            var s = stackCapture(emsg);
            this.toClosed(s);
            return;
          case defs.BasicFlow:
            return this.closeWithError(
              f.id,
              "Flow not implemented",
              defs.constants.NOT_IMPLEMENTED,
              new Error("Flow not implemented")
            );
          default:
            var reply = this.reply;
            this.reply = null;
            if (this.pending.length > 0) {
              var send = this.pending.shift();
              this.reply = send.reply;
              this.sendImmediately(send.method, send.fields);
            }
            return reply(null, f);
        }
      }
    };
    function invalidOp(msg, stack) {
      return function() {
        throw new IllegalOperationError(msg, stack);
      };
    }
    function invalidateSend(ch, msg, stack) {
      ch.sendImmediately = ch.sendOrEnqueue = ch.sendMessage = invalidOp(msg, stack);
    }
    function acceptDeliveryOrReturn(f) {
      var event;
      if (f.id === defs.BasicDeliver) event = "delivery";
      else if (f.id === defs.BasicReturn) event = "return";
      else throw fmt(
        "Expected BasicDeliver or BasicReturn; got %s",
        inspect(f)
      );
      var self2 = this;
      var fields = f.fields;
      return acceptMessage(function(message) {
        message.fields = fields;
        self2.emit(event, message);
      });
    }
    function acceptMessage(continuation) {
      var totalSize = 0, remaining = 0;
      var buffers = null;
      var message = {
        fields: null,
        properties: null,
        content: null
      };
      return headers;
      function headers(f) {
        if (f.id === defs.BasicProperties) {
          message.properties = f.fields;
          totalSize = remaining = f.size;
          if (totalSize === 0) {
            message.content = Buffer.alloc(0);
            continuation(message);
            return acceptDeliveryOrReturn;
          } else {
            return content;
          }
        } else {
          throw "Expected headers frame after delivery";
        }
      }
      function content(f) {
        if (f.content) {
          var size = f.content.length;
          remaining -= size;
          if (remaining === 0) {
            if (buffers !== null) {
              buffers.push(f.content);
              message.content = Buffer.concat(buffers);
            } else {
              message.content = f.content;
            }
            continuation(message);
            return acceptDeliveryOrReturn;
          } else if (remaining < 0) {
            throw fmt(
              "Too much content sent! Expected %d bytes",
              totalSize
            );
          } else {
            if (buffers !== null)
              buffers.push(f.content);
            else
              buffers = [f.content];
            return content;
          }
        } else throw "Expected content frame after headers";
      }
    }
    var BaseChannel = class extends Channel {
      constructor(connection) {
        super(connection);
        this.consumers = /* @__PURE__ */ new Map();
      }
      // Not sure I like the ff, it's going to be changing hidden classes
      // all over the place. On the other hand, whaddya do.
      registerConsumer(tag, callback) {
        this.consumers.set(tag, callback);
      }
      unregisterConsumer(tag) {
        this.consumers.delete(tag);
      }
      dispatchMessage(fields, message) {
        var consumerTag = fields.consumerTag;
        var consumer = this.consumers.get(consumerTag);
        if (consumer) {
          return consumer(message);
        } else {
          throw new Error("Unknown consumer: " + consumerTag);
        }
      }
      handleDelivery(message) {
        return this.dispatchMessage(message.fields, message);
      }
      handleCancel(fields) {
        var result = this.dispatchMessage(fields, null);
        this.unregisterConsumer(fields.consumerTag);
        return result;
      }
    };
    module2.exports.acceptMessage = acceptMessage;
    module2.exports.BaseChannel = BaseChannel;
    module2.exports.Channel = Channel;
  }
});

// node_modules/amqplib/lib/api_args.js
var require_api_args = __commonJS({
  "node_modules/amqplib/lib/api_args.js"(exports2, module2) {
    "use strict";
    function setIfDefined(obj, prop, value) {
      if (value != void 0) obj[prop] = value;
    }
    var EMPTY_OPTIONS = Object.freeze({});
    var Args = {};
    Args.assertQueue = function(queue, options) {
      queue = queue || "";
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "x-expires", options.expires);
      setIfDefined(argt, "x-message-ttl", options.messageTtl);
      setIfDefined(
        argt,
        "x-dead-letter-exchange",
        options.deadLetterExchange
      );
      setIfDefined(
        argt,
        "x-dead-letter-routing-key",
        options.deadLetterRoutingKey
      );
      setIfDefined(argt, "x-max-length", options.maxLength);
      setIfDefined(argt, "x-max-priority", options.maxPriority);
      setIfDefined(argt, "x-overflow", options.overflow);
      setIfDefined(argt, "x-queue-mode", options.queueMode);
      return {
        queue,
        exclusive: !!options.exclusive,
        durable: options.durable === void 0 ? true : options.durable,
        autoDelete: !!options.autoDelete,
        arguments: argt,
        passive: false,
        // deprecated but we have to include it
        ticket: 0,
        nowait: false
      };
    };
    Args.checkQueue = function(queue) {
      return {
        queue,
        passive: true,
        // switch to "completely different" mode
        nowait: false,
        durable: true,
        autoDelete: false,
        exclusive: false,
        // ignored
        ticket: 0
      };
    };
    Args.deleteQueue = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      return {
        queue,
        ifUnused: !!options.ifUnused,
        ifEmpty: !!options.ifEmpty,
        ticket: 0,
        nowait: false
      };
    };
    Args.purgeQueue = function(queue) {
      return {
        queue,
        ticket: 0,
        nowait: false
      };
    };
    Args.bindQueue = function(queue, source, pattern, argt) {
      return {
        queue,
        exchange: source,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.unbindQueue = function(queue, source, pattern, argt) {
      return {
        queue,
        exchange: source,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.assertExchange = function(exchange, type, options) {
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "alternate-exchange", options.alternateExchange);
      return {
        exchange,
        ticket: 0,
        type,
        passive: false,
        durable: options.durable === void 0 ? true : options.durable,
        autoDelete: !!options.autoDelete,
        internal: !!options.internal,
        nowait: false,
        arguments: argt
      };
    };
    Args.checkExchange = function(exchange) {
      return {
        exchange,
        passive: true,
        // switch to 'may as well be another method' mode
        nowait: false,
        // ff are ignored
        durable: true,
        internal: false,
        type: "",
        autoDelete: false,
        ticket: 0
      };
    };
    Args.deleteExchange = function(exchange, options) {
      options = options || EMPTY_OPTIONS;
      return {
        exchange,
        ifUnused: !!options.ifUnused,
        ticket: 0,
        nowait: false
      };
    };
    Args.bindExchange = function(dest, source, pattern, argt) {
      return {
        source,
        destination: dest,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.unbindExchange = function(dest, source, pattern, argt) {
      return {
        source,
        destination: dest,
        routingKey: pattern,
        arguments: argt,
        ticket: 0,
        nowait: false
      };
    };
    Args.publish = function(exchange, routingKey, options) {
      options = options || EMPTY_OPTIONS;
      function convertCC(cc) {
        if (cc === void 0) {
          return void 0;
        } else if (Array.isArray(cc)) {
          return cc.map(String);
        } else return [String(cc)];
      }
      var headers = Object.create(options.headers || null);
      setIfDefined(headers, "CC", convertCC(options.CC));
      setIfDefined(headers, "BCC", convertCC(options.BCC));
      var deliveryMode;
      if (options.persistent !== void 0)
        deliveryMode = options.persistent ? 2 : 1;
      else if (typeof options.deliveryMode === "number")
        deliveryMode = options.deliveryMode;
      else if (options.deliveryMode)
        deliveryMode = 2;
      var expiration = options.expiration;
      if (expiration !== void 0) expiration = expiration.toString();
      return {
        // method fields
        exchange,
        routingKey,
        mandatory: !!options.mandatory,
        immediate: false,
        // RabbitMQ doesn't implement this any more
        ticket: void 0,
        // properties
        contentType: options.contentType,
        contentEncoding: options.contentEncoding,
        headers,
        deliveryMode,
        priority: options.priority,
        correlationId: options.correlationId,
        replyTo: options.replyTo,
        expiration,
        messageId: options.messageId,
        timestamp: options.timestamp,
        type: options.type,
        userId: options.userId,
        appId: options.appId,
        clusterId: void 0
      };
    };
    Args.consume = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      var argt = Object.create(options.arguments || null);
      setIfDefined(argt, "x-priority", options.priority);
      return {
        ticket: 0,
        queue,
        consumerTag: options.consumerTag || "",
        noLocal: !!options.noLocal,
        noAck: !!options.noAck,
        exclusive: !!options.exclusive,
        nowait: false,
        arguments: argt
      };
    };
    Args.cancel = function(consumerTag) {
      return {
        consumerTag,
        nowait: false
      };
    };
    Args.get = function(queue, options) {
      options = options || EMPTY_OPTIONS;
      return {
        ticket: 0,
        queue,
        noAck: !!options.noAck
      };
    };
    Args.ack = function(tag, allUpTo) {
      return {
        deliveryTag: tag,
        multiple: !!allUpTo
      };
    };
    Args.nack = function(tag, allUpTo, requeue) {
      return {
        deliveryTag: tag,
        multiple: !!allUpTo,
        requeue: requeue === void 0 ? true : requeue
      };
    };
    Args.reject = function(tag, requeue) {
      return {
        deliveryTag: tag,
        requeue: requeue === void 0 ? true : requeue
      };
    };
    Args.prefetch = function(count, global2) {
      return {
        prefetchCount: count || 0,
        prefetchSize: 0,
        global: !!global2
      };
    };
    Args.recover = function() {
      return { requeue: true };
    };
    module2.exports = Object.freeze(Args);
  }
});

// node_modules/amqplib/lib/channel_model.js
var require_channel_model = __commonJS({
  "node_modules/amqplib/lib/channel_model.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var promisify = require("util").promisify;
    var defs = require_defs();
    var { BaseChannel } = require_channel();
    var { acceptMessage } = require_channel();
    var Args = require_api_args();
    var { inspect } = require_format();
    var ChannelModel = class extends EventEmitter {
      constructor(connection) {
        super();
        this.connection = connection;
        ["error", "close", "blocked", "unblocked"].forEach((ev) => {
          connection.on(ev, this.emit.bind(this, ev));
        });
      }
      close() {
        return promisify(this.connection.close.bind(this.connection))();
      }
      updateSecret(newSecret, reason) {
        return promisify(this.connection._updateSecret.bind(this.connection))(newSecret, reason);
      }
      async createChannel(options) {
        const channel = new Channel(this.connection);
        channel.setOptions(options);
        await channel.open();
        return channel;
      }
      async createConfirmChannel(options) {
        const channel = new ConfirmChannel(this.connection);
        channel.setOptions(options);
        await channel.open();
        await channel.rpc(defs.ConfirmSelect, { nowait: false }, defs.ConfirmSelectOk);
        return channel;
      }
    };
    var Channel = class extends BaseChannel {
      constructor(connection) {
        super(connection);
        this.on("delivery", this.handleDelivery.bind(this));
        this.on("cancel", this.handleCancel.bind(this));
      }
      // An RPC that returns a 'proper' promise, which resolves to just the
      // response's fields; this is intended to be suitable for implementing
      // API procedures.
      async rpc(method, fields, expect) {
        const f = await promisify((cb) => {
          return this._rpc(method, fields, expect, cb);
        })();
        return f.fields;
      }
      // Do the remarkably simple channel open handshake
      async open() {
        const ch = await this.allocate.bind(this)();
        return ch.rpc(
          defs.ChannelOpen,
          { outOfBand: "" },
          defs.ChannelOpenOk
        );
      }
      close() {
        return promisify((cb) => {
          return this.closeBecause(
            "Goodbye",
            defs.constants.REPLY_SUCCESS,
            cb
          );
        })();
      }
      // === Public API, declaring queues and stuff ===
      assertQueue(queue, options) {
        return this.rpc(
          defs.QueueDeclare,
          Args.assertQueue(queue, options),
          defs.QueueDeclareOk
        );
      }
      checkQueue(queue) {
        return this.rpc(
          defs.QueueDeclare,
          Args.checkQueue(queue),
          defs.QueueDeclareOk
        );
      }
      deleteQueue(queue, options) {
        return this.rpc(
          defs.QueueDelete,
          Args.deleteQueue(queue, options),
          defs.QueueDeleteOk
        );
      }
      purgeQueue(queue) {
        return this.rpc(
          defs.QueuePurge,
          Args.purgeQueue(queue),
          defs.QueuePurgeOk
        );
      }
      bindQueue(queue, source, pattern, argt) {
        return this.rpc(
          defs.QueueBind,
          Args.bindQueue(queue, source, pattern, argt),
          defs.QueueBindOk
        );
      }
      unbindQueue(queue, source, pattern, argt) {
        return this.rpc(
          defs.QueueUnbind,
          Args.unbindQueue(queue, source, pattern, argt),
          defs.QueueUnbindOk
        );
      }
      assertExchange(exchange, type, options) {
        return this.rpc(
          defs.ExchangeDeclare,
          Args.assertExchange(exchange, type, options),
          defs.ExchangeDeclareOk
        ).then((_ok) => {
          return { exchange };
        });
      }
      checkExchange(exchange) {
        return this.rpc(
          defs.ExchangeDeclare,
          Args.checkExchange(exchange),
          defs.ExchangeDeclareOk
        );
      }
      deleteExchange(name, options) {
        return this.rpc(
          defs.ExchangeDelete,
          Args.deleteExchange(name, options),
          defs.ExchangeDeleteOk
        );
      }
      bindExchange(dest, source, pattern, argt) {
        return this.rpc(
          defs.ExchangeBind,
          Args.bindExchange(dest, source, pattern, argt),
          defs.ExchangeBindOk
        );
      }
      unbindExchange(dest, source, pattern, argt) {
        return this.rpc(
          defs.ExchangeUnbind,
          Args.unbindExchange(dest, source, pattern, argt),
          defs.ExchangeUnbindOk
        );
      }
      // Working with messages
      publish(exchange, routingKey, content, options) {
        const fieldsAndProps = Args.publish(exchange, routingKey, options);
        return this.sendMessage(fieldsAndProps, fieldsAndProps, content);
      }
      sendToQueue(queue, content, options) {
        return this.publish("", queue, content, options);
      }
      consume(queue, callback, options) {
        const fields = Args.consume(queue, options);
        return new Promise((resolve, reject) => {
          this._rpc(defs.BasicConsume, fields, defs.BasicConsumeOk, (err, ok) => {
            if (err) return reject(err);
            this.registerConsumer(ok.fields.consumerTag, callback);
            resolve(ok.fields);
          });
        });
      }
      async cancel(consumerTag) {
        const ok = await promisify((cb) => {
          this._rpc(
            defs.BasicCancel,
            Args.cancel(consumerTag),
            defs.BasicCancelOk,
            cb
          );
        })().then((ok2) => {
          this.unregisterConsumer(consumerTag);
          return ok2.fields;
        });
      }
      get(queue, options) {
        const fields = Args.get(queue, options);
        return new Promise((resolve, reject) => {
          this.sendOrEnqueue(defs.BasicGet, fields, (err, f) => {
            if (err) return reject(err);
            if (f.id === defs.BasicGetEmpty) {
              return resolve(false);
            } else if (f.id === defs.BasicGetOk) {
              const fields2 = f.fields;
              this.handleMessage = acceptMessage((m) => {
                m.fields = fields2;
                resolve(m);
              });
            } else {
              reject(new Error(`Unexpected response to BasicGet: ${inspect(f)}`));
            }
          });
        });
      }
      ack(message, allUpTo) {
        this.sendImmediately(
          defs.BasicAck,
          Args.ack(message.fields.deliveryTag, allUpTo)
        );
      }
      ackAll() {
        this.sendImmediately(defs.BasicAck, Args.ack(0, true));
      }
      nack(message, allUpTo, requeue) {
        this.sendImmediately(
          defs.BasicNack,
          Args.nack(message.fields.deliveryTag, allUpTo, requeue)
        );
      }
      nackAll(requeue) {
        this.sendImmediately(
          defs.BasicNack,
          Args.nack(0, true, requeue)
        );
      }
      // `Basic.Nack` is not available in older RabbitMQ versions (or in the
      // AMQP specification), so you have to use the one-at-a-time
      // `Basic.Reject`. This is otherwise synonymous with
      // `#nack(message, false, requeue)`.
      reject(message, requeue) {
        this.sendImmediately(
          defs.BasicReject,
          Args.reject(message.fields.deliveryTag, requeue)
        );
      }
      recover() {
        return this.rpc(
          defs.BasicRecover,
          Args.recover(),
          defs.BasicRecoverOk
        );
      }
      qos(count, global2) {
        return this.rpc(
          defs.BasicQos,
          Args.prefetch(count, global2),
          defs.BasicQosOk
        );
      }
    };
    Channel.prototype.prefetch = Channel.prototype.qos;
    var ConfirmChannel = class extends Channel {
      publish(exchange, routingKey, content, options, cb) {
        this.pushConfirmCallback(cb);
        return super.publish(exchange, routingKey, content, options);
      }
      sendToQueue(queue, content, options, cb) {
        return this.publish("", queue, content, options, cb);
      }
      waitForConfirms() {
        const awaiting = [];
        const unconfirmed = this.unconfirmed;
        unconfirmed.forEach((val, index) => {
          if (val !== null) {
            const confirmed = new Promise((resolve, reject) => {
              unconfirmed[index] = (err) => {
                if (val) val(err);
                if (err === null) resolve();
                else reject(err);
              };
            });
            awaiting.push(confirmed);
          }
        });
        if (!this.pending) {
          var cb;
          while (cb = this.unconfirmed.shift()) {
            if (cb) cb(new Error("channel closed"));
          }
        }
        return Promise.all(awaiting);
      }
    };
    module2.exports.ConfirmChannel = ConfirmChannel;
    module2.exports.Channel = Channel;
    module2.exports.ChannelModel = ChannelModel;
  }
});

// node_modules/amqplib/channel_api.js
var require_channel_api = __commonJS({
  "node_modules/amqplib/channel_api.js"(exports2, module2) {
    var raw_connect = require_connect().connect;
    var ChannelModel = require_channel_model().ChannelModel;
    var promisify = require("util").promisify;
    function connect(url, connOptions) {
      return promisify(function(cb) {
        return raw_connect(url, connOptions, cb);
      })().then(function(conn) {
        return new ChannelModel(conn);
      });
    }
    module2.exports.connect = connect;
    module2.exports.credentials = require_credentials();
    module2.exports.IllegalOperationError = require_error().IllegalOperationError;
  }
});

// netlify/functions/queue-authors.ts
var queue_authors_exports = {};
__export(queue_authors_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(queue_authors_exports);

// netlify/functions/lib/queue.ts
var import_amqplib = __toESM(require_channel_api());
async function withChannel(fn) {
  const url = process.env.CLOUDAMQP_URL;
  const queue = process.env.QUEUE_NAME || "bookstore";
  const conn = await import_amqplib.default.connect(url);
  try {
    const ch = await conn.createChannel();
    await ch.assertQueue(queue, { durable: true });
    const res = await fn(ch);
    await ch.close();
    return res;
  } finally {
    await conn.close();
  }
}
async function enqueueMessage(msg) {
  return withChannel(async (ch) => {
    const queue = process.env.QUEUE_NAME || "bookstore";
    const ok = ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
      contentType: "application/json",
      deliveryMode: 2
    });
    return ok;
  });
}

// netlify/functions/lib/cors.ts
function withCors(res) {
  return {
    statusCode: res.statusCode ?? 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      ...res.headers
    },
    body: res.body ?? ""
  };
}
function handleOptions() {
  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "content-length": "0"
    },
    body: ""
  };
}

// netlify/functions/queue-authors.ts
var handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "POST") return withCors({ statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) });
  const { action, payload } = JSON.parse(event.body || "{}");
  if (!["create", "update", "delete"].includes(action)) {
    return withCors({ statusCode: 400, body: JSON.stringify({ error: "Invalid action" }) });
  }
  await enqueueMessage({ entity: "author", action, payload });
  return withCors({ statusCode: 202, body: JSON.stringify({ message: "Enqueued", action }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*! Bundled license information:

amqplib/lib/defs.js:
  (** @preserve This file is generated by the script
   * ../bin/generate-defs.js, which is not in general included in a
   * distribution, but is available in the source repository e.g. at
   * https://github.com/squaremo/amqp.node/
   *)
*/
//# sourceMappingURL=queue-authors.js.map
