(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // .wrangler/tmp/bundle-UbJ8KV/checked-fetch.js
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
  var urls;
  var init_checked_fetch = __esm({
    ".wrangler/tmp/bundle-UbJ8KV/checked-fetch.js"() {
      urls = /* @__PURE__ */ new Set();
      __name(checkURL, "checkURL");
      globalThis.fetch = new Proxy(globalThis.fetch, {
        apply(target, thisArg, argArray) {
          const [request, init] = argArray;
          checkURL(request, init);
          return Reflect.apply(target, thisArg, argArray);
        }
      });
    }
  });

  // wrangler-modules-watch:wrangler:modules-watch
  var init_wrangler_modules_watch = __esm({
    "wrangler-modules-watch:wrangler:modules-watch"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
    }
  });

  // ../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/modules-watch-stub.js
  var init_modules_watch_stub = __esm({
    "../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/modules-watch-stub.js"() {
      init_wrangler_modules_watch();
    }
  });

  // ../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/middleware/common.ts
  function __facade_register__(...args) {
    __facade_middleware__.push(...args.flat());
  }
  function __facade_registerInternal__(...args) {
    __facade_middleware__.unshift(...args.flat());
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
  var __facade_middleware__;
  var init_common = __esm({
    "../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/middleware/common.ts"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      __facade_middleware__ = [];
      __name(__facade_register__, "__facade_register__");
      __name(__facade_registerInternal__, "__facade_registerInternal__");
      __name(__facade_invokeChain__, "__facade_invokeChain__");
      __name(__facade_invoke__, "__facade_invoke__");
    }
  });

  // ../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/middleware/loader-sw.ts
  function __facade_isSpecialEvent__(type) {
    return type === "fetch" || type === "scheduled";
  }
  var __FACADE_EVENT_TARGET__, __facade__originalAddEventListener__, __facade__originalRemoveEventListener__, __facade__originalDispatchEvent__, __facade_waitUntil__, __facade_response__, __facade_dispatched__, __Facade_ExtendableEvent__, __Facade_FetchEvent__, __Facade_ScheduledEvent__;
  var init_loader_sw = __esm({
    "../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/middleware/loader-sw.ts"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      init_common();
      if (globalThis.MINIFLARE) {
        __FACADE_EVENT_TARGET__ = new (Object.getPrototypeOf(WorkerGlobalScope))();
      } else {
        __FACADE_EVENT_TARGET__ = new EventTarget();
      }
      __name(__facade_isSpecialEvent__, "__facade_isSpecialEvent__");
      __facade__originalAddEventListener__ = globalThis.addEventListener;
      __facade__originalRemoveEventListener__ = globalThis.removeEventListener;
      __facade__originalDispatchEvent__ = globalThis.dispatchEvent;
      globalThis.addEventListener = function(type, listener, options) {
        if (__facade_isSpecialEvent__(type)) {
          __FACADE_EVENT_TARGET__.addEventListener(
            type,
            listener,
            options
          );
        } else {
          __facade__originalAddEventListener__(type, listener, options);
        }
      };
      globalThis.removeEventListener = function(type, listener, options) {
        if (__facade_isSpecialEvent__(type)) {
          __FACADE_EVENT_TARGET__.removeEventListener(
            type,
            listener,
            options
          );
        } else {
          __facade__originalRemoveEventListener__(type, listener, options);
        }
      };
      globalThis.dispatchEvent = function(event) {
        if (__facade_isSpecialEvent__(event.type)) {
          return __FACADE_EVENT_TARGET__.dispatchEvent(event);
        } else {
          return __facade__originalDispatchEvent__(event);
        }
      };
      globalThis.addMiddleware = __facade_register__;
      globalThis.addMiddlewareInternal = __facade_registerInternal__;
      __facade_waitUntil__ = Symbol("__facade_waitUntil__");
      __facade_response__ = Symbol("__facade_response__");
      __facade_dispatched__ = Symbol("__facade_dispatched__");
      __Facade_ExtendableEvent__ = class extends Event {
        [__facade_waitUntil__] = [];
        waitUntil(promise) {
          if (!(this instanceof __Facade_ExtendableEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this[__facade_waitUntil__].push(promise);
        }
      };
      __name(__Facade_ExtendableEvent__, "__Facade_ExtendableEvent__");
      __Facade_FetchEvent__ = class extends __Facade_ExtendableEvent__ {
        #request;
        #passThroughOnException;
        [__facade_response__];
        [__facade_dispatched__] = false;
        constructor(type, init) {
          super(type);
          this.#request = init.request;
          this.#passThroughOnException = init.passThroughOnException;
        }
        get request() {
          return this.#request;
        }
        respondWith(response) {
          if (!(this instanceof __Facade_FetchEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          if (this[__facade_response__] !== void 0) {
            throw new DOMException(
              "FetchEvent.respondWith() has already been called; it can only be called once.",
              "InvalidStateError"
            );
          }
          if (this[__facade_dispatched__]) {
            throw new DOMException(
              "Too late to call FetchEvent.respondWith(). It must be called synchronously in the event handler.",
              "InvalidStateError"
            );
          }
          this.stopImmediatePropagation();
          this[__facade_response__] = response;
        }
        passThroughOnException() {
          if (!(this instanceof __Facade_FetchEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this.#passThroughOnException();
        }
      };
      __name(__Facade_FetchEvent__, "__Facade_FetchEvent__");
      __Facade_ScheduledEvent__ = class extends __Facade_ExtendableEvent__ {
        #scheduledTime;
        #cron;
        #noRetry;
        constructor(type, init) {
          super(type);
          this.#scheduledTime = init.scheduledTime;
          this.#cron = init.cron;
          this.#noRetry = init.noRetry;
        }
        get scheduledTime() {
          return this.#scheduledTime;
        }
        get cron() {
          return this.#cron;
        }
        noRetry() {
          if (!(this instanceof __Facade_ScheduledEvent__)) {
            throw new TypeError("Illegal invocation");
          }
          this.#noRetry();
        }
      };
      __name(__Facade_ScheduledEvent__, "__Facade_ScheduledEvent__");
      __facade__originalAddEventListener__("fetch", (event) => {
        const ctx = {
          waitUntil: event.waitUntil.bind(event),
          passThroughOnException: event.passThroughOnException.bind(event)
        };
        const __facade_sw_dispatch__ = /* @__PURE__ */ __name(function(type, init) {
          if (type === "scheduled") {
            const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
              scheduledTime: Date.now(),
              cron: init.cron ?? "",
              noRetry() {
              }
            });
            __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
            event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
          }
        }, "__facade_sw_dispatch__");
        const __facade_sw_fetch__ = /* @__PURE__ */ __name(function(request, _env, ctx2) {
          const facadeEvent = new __Facade_FetchEvent__("fetch", {
            request,
            passThroughOnException: ctx2.passThroughOnException
          });
          __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
          facadeEvent[__facade_dispatched__] = true;
          event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
          const response = facadeEvent[__facade_response__];
          if (response === void 0) {
            throw new Error("No response!");
          }
          return response;
        }, "__facade_sw_fetch__");
        event.respondWith(
          __facade_invoke__(
            event.request,
            globalThis,
            ctx,
            __facade_sw_dispatch__,
            __facade_sw_fetch__
          )
        );
      });
      __facade__originalAddEventListener__("scheduled", (event) => {
        const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
          scheduledTime: event.scheduledTime,
          cron: event.cron,
          noRetry: event.noRetry.bind(event)
        });
        __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
        event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      });
    }
  });

  // ../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
  var drainBody, middleware_ensure_req_body_drained_default;
  var init_middleware_ensure_req_body_drained = __esm({
    "../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
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
      }, "drainBody");
      middleware_ensure_req_body_drained_default = drainBody;
    }
  });

  // ../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
  function reduceError(e) {
    return {
      name: e?.name,
      message: e?.message ?? String(e),
      stack: e?.stack,
      cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
    };
  }
  var jsonError, middleware_miniflare3_json_error_default;
  var init_middleware_miniflare3_json_error = __esm({
    "../../../.nvm/versions/node/v22.0.0/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts"() {
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      __name(reduceError, "reduceError");
      jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
        try {
          return await middlewareCtx.next(request, env);
        } catch (e) {
          const error = reduceError(e);
          return Response.json(error, {
            status: 500,
            headers: { "MF-Experimental-Error-Stack": "true" }
          });
        }
      }, "jsonError");
      middleware_miniflare3_json_error_default = jsonError;
    }
  });

  // .wrangler/tmp/bundle-UbJ8KV/middleware-insertion-facade.js
  var init_middleware_insertion_facade = __esm({
    ".wrangler/tmp/bundle-UbJ8KV/middleware-insertion-facade.js"() {
      init_loader_sw();
      init_middleware_ensure_req_body_drained();
      init_middleware_miniflare3_json_error();
      __facade_registerInternal__([middleware_ensure_req_body_drained_default, middleware_miniflare3_json_error_default]);
    }
  });

  // ../node_modules/cloudworker-router/dist/src/types/Context.js
  var require_Context = __commonJS({
    "../node_modules/cloudworker-router/dist/src/types/Context.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../node_modules/cloudworker-router/dist/src/types/Handler.js
  var require_Handler = __commonJS({
    "../node_modules/cloudworker-router/dist/src/types/Handler.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../node_modules/cloudworker-router/dist/src/types/Next.js
  var require_Next = __commonJS({
    "../node_modules/cloudworker-router/dist/src/types/Next.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../node_modules/cloudworker-router/dist/src/types/Params.js
  var require_Params = __commonJS({
    "../node_modules/cloudworker-router/dist/src/types/Params.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../node_modules/cloudworker-router/dist/src/types/index.js
  var require_types = __commonJS({
    "../node_modules/cloudworker-router/dist/src/types/index.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_Context(), exports);
      __exportStar(require_Handler(), exports);
      __exportStar(require_Next(), exports);
      __exportStar(require_Params(), exports);
    }
  });

  // ../node_modules/cloudworker-router/node_modules/path-to-regexp/dist/index.js
  var require_dist = __commonJS({
    "../node_modules/cloudworker-router/node_modules/path-to-regexp/dist/index.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pathToRegexp = exports.tokensToRegexp = exports.regexpToFunction = exports.match = exports.tokensToFunction = exports.compile = exports.parse = void 0;
      function lexer(str) {
        var tokens = [];
        var i = 0;
        while (i < str.length) {
          var char = str[i];
          if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
          }
          if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
          }
          if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
          }
          if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
          }
          if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
              var code = str.charCodeAt(j);
              if (
                // `0-9`
                code >= 48 && code <= 57 || // `A-Z`
                code >= 65 && code <= 90 || // `a-z`
                code >= 97 && code <= 122 || // `_`
                code === 95
              ) {
                name += str[j++];
                continue;
              }
              break;
            }
            if (!name)
              throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
          }
          if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
              throw new TypeError('Pattern cannot start with "?" at '.concat(j));
            }
            while (j < str.length) {
              if (str[j] === "\\") {
                pattern += str[j++] + str[j++];
                continue;
              }
              if (str[j] === ")") {
                count--;
                if (count === 0) {
                  j++;
                  break;
                }
              } else if (str[j] === "(") {
                count++;
                if (str[j + 1] !== "?") {
                  throw new TypeError("Capturing groups are not allowed at ".concat(j));
                }
              }
              pattern += str[j++];
            }
            if (count)
              throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
              throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
          }
          tokens.push({ type: "CHAR", index: i, value: str[i++] });
        }
        tokens.push({ type: "END", index: i, value: "" });
        return tokens;
      }
      __name(lexer, "lexer");
      function parse(str, options) {
        if (options === void 0) {
          options = {};
        }
        var tokens = lexer(str);
        var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
        var result = [];
        var key = 0;
        var i = 0;
        var path = "";
        var tryConsume = /* @__PURE__ */ __name(function(type) {
          if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
        }, "tryConsume");
        var mustConsume = /* @__PURE__ */ __name(function(type) {
          var value2 = tryConsume(type);
          if (value2 !== void 0)
            return value2;
          var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
          throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
        }, "mustConsume");
        var consumeText = /* @__PURE__ */ __name(function() {
          var result2 = "";
          var value2;
          while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
            result2 += value2;
          }
          return result2;
        }, "consumeText");
        var isSafe = /* @__PURE__ */ __name(function(value2) {
          for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
            var char2 = delimiter_1[_i];
            if (value2.indexOf(char2) > -1)
              return true;
          }
          return false;
        }, "isSafe");
        var safePattern = /* @__PURE__ */ __name(function(prefix2) {
          var prev = result[result.length - 1];
          var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
          if (prev && !prevText) {
            throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
          }
          if (!prevText || isSafe(prevText))
            return "[^".concat(escapeString(delimiter), "]+?");
          return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
        }, "safePattern");
        while (i < tokens.length) {
          var char = tryConsume("CHAR");
          var name = tryConsume("NAME");
          var pattern = tryConsume("PATTERN");
          if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
              path += prefix;
              prefix = "";
            }
            if (path) {
              result.push(path);
              path = "";
            }
            result.push({
              name: name || key++,
              prefix,
              suffix: "",
              pattern: pattern || safePattern(prefix),
              modifier: tryConsume("MODIFIER") || ""
            });
            continue;
          }
          var value = char || tryConsume("ESCAPED_CHAR");
          if (value) {
            path += value;
            continue;
          }
          if (path) {
            result.push(path);
            path = "";
          }
          var open = tryConsume("OPEN");
          if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
              name: name_1 || (pattern_1 ? key++ : ""),
              pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
              prefix,
              suffix,
              modifier: tryConsume("MODIFIER") || ""
            });
            continue;
          }
          mustConsume("END");
        }
        return result;
      }
      __name(parse, "parse");
      exports.parse = parse;
      function compile(str, options) {
        return tokensToFunction(parse(str, options), options);
      }
      __name(compile, "compile");
      exports.compile = compile;
      function tokensToFunction(tokens, options) {
        if (options === void 0) {
          options = {};
        }
        var reFlags = flags(options);
        var _a = options.encode, encode = _a === void 0 ? function(x) {
          return x;
        } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
        var matches = tokens.map(function(token) {
          if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
          }
        });
        return function(data) {
          var path = "";
          for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
              path += token;
              continue;
            }
            var value = data ? data[token.name] : void 0;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
              if (!repeat) {
                throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
              }
              if (value.length === 0) {
                if (optional)
                  continue;
                throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
              }
              for (var j = 0; j < value.length; j++) {
                var segment = encode(value[j], token);
                if (validate && !matches[i].test(segment)) {
                  throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
                }
                path += token.prefix + segment + token.suffix;
              }
              continue;
            }
            if (typeof value === "string" || typeof value === "number") {
              var segment = encode(String(value), token);
              if (validate && !matches[i].test(segment)) {
                throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
              }
              path += token.prefix + segment + token.suffix;
              continue;
            }
            if (optional)
              continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
          }
          return path;
        };
      }
      __name(tokensToFunction, "tokensToFunction");
      exports.tokensToFunction = tokensToFunction;
      function match(str, options) {
        var keys = [];
        var re = pathToRegexp(str, keys, options);
        return regexpToFunction(re, keys, options);
      }
      __name(match, "match");
      exports.match = match;
      function regexpToFunction(re, keys, options) {
        if (options === void 0) {
          options = {};
        }
        var _a = options.decode, decode = _a === void 0 ? function(x) {
          return x;
        } : _a;
        return function(pathname) {
          var m = re.exec(pathname);
          if (!m)
            return false;
          var path = m[0], index = m.index;
          var params = /* @__PURE__ */ Object.create(null);
          var _loop_1 = /* @__PURE__ */ __name(function(i2) {
            if (m[i2] === void 0)
              return "continue";
            var key = keys[i2 - 1];
            if (key.modifier === "*" || key.modifier === "+") {
              params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
                return decode(value, key);
              });
            } else {
              params[key.name] = decode(m[i2], key);
            }
          }, "_loop_1");
          for (var i = 1; i < m.length; i++) {
            _loop_1(i);
          }
          return { path, index, params };
        };
      }
      __name(regexpToFunction, "regexpToFunction");
      exports.regexpToFunction = regexpToFunction;
      function escapeString(str) {
        return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      __name(escapeString, "escapeString");
      function flags(options) {
        return options && options.sensitive ? "" : "i";
      }
      __name(flags, "flags");
      function regexpToRegexp(path, keys) {
        if (!keys)
          return path;
        var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
        var index = 0;
        var execResult = groupsRegex.exec(path.source);
        while (execResult) {
          keys.push({
            // Use parenthesized substring match if available, index otherwise
            name: execResult[1] || index++,
            prefix: "",
            suffix: "",
            modifier: "",
            pattern: ""
          });
          execResult = groupsRegex.exec(path.source);
        }
        return path;
      }
      __name(regexpToRegexp, "regexpToRegexp");
      function arrayToRegexp(paths, keys, options) {
        var parts = paths.map(function(path) {
          return pathToRegexp(path, keys, options).source;
        });
        return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
      }
      __name(arrayToRegexp, "arrayToRegexp");
      function stringToRegexp(path, keys, options) {
        return tokensToRegexp(parse(path, options), keys, options);
      }
      __name(stringToRegexp, "stringToRegexp");
      function tokensToRegexp(tokens, keys, options) {
        if (options === void 0) {
          options = {};
        }
        var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
          return x;
        } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
        var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
        var delimiterRe = "[".concat(escapeString(delimiter), "]");
        var route = start ? "^" : "";
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
          var token = tokens_1[_i];
          if (typeof token === "string") {
            route += escapeString(encode(token));
          } else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
              if (keys)
                keys.push(token);
              if (prefix || suffix) {
                if (token.modifier === "+" || token.modifier === "*") {
                  var mod = token.modifier === "*" ? "?" : "";
                  route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
                } else {
                  route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
                }
              } else {
                if (token.modifier === "+" || token.modifier === "*") {
                  throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
                }
                route += "(".concat(token.pattern, ")").concat(token.modifier);
              }
            } else {
              route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
            }
          }
        }
        if (end) {
          if (!strict)
            route += "".concat(delimiterRe, "?");
          route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
        } else {
          var endToken = tokens[tokens.length - 1];
          var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
          if (!strict) {
            route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
          }
          if (!isEndDelimited) {
            route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
          }
        }
        return new RegExp(route, flags(options));
      }
      __name(tokensToRegexp, "tokensToRegexp");
      exports.tokensToRegexp = tokensToRegexp;
      function pathToRegexp(path, keys, options) {
        if (path instanceof RegExp)
          return regexpToRegexp(path, keys);
        if (Array.isArray(path))
          return arrayToRegexp(path, keys, options);
        return stringToRegexp(path, keys, options);
      }
      __name(pathToRegexp, "pathToRegexp");
      exports.pathToRegexp = pathToRegexp;
    }
  });

  // ../node_modules/cloudworker-router/dist/src/Router.js
  var require_Router = __commonJS({
    "../node_modules/cloudworker-router/dist/src/Router.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Router = void 0;
      var path_to_regexp_1 = require_dist();
      var Router2 = class {
        constructor() {
          this.routes = [];
        }
        /** Add a route that matches any method. */
        all(path, handler) {
          return this.push("ALL", path, handler);
        }
        /** Add a route that matches the GET method. */
        get(path, ...handlers) {
          handlers.forEach((handler) => {
            this.push("GET", path, handler);
            this.push("HEAD", path, handler);
          });
          return this;
        }
        /** Add a route that matches the POST method. */
        post(path, ...handlers) {
          handlers.forEach((handler) => {
            this.push("POST", path, handler);
          });
          return this;
        }
        /** Add a route that matches the PUT method. */
        put(path, ...handlers) {
          handlers.forEach((handler) => {
            this.push("PUT", path, handler);
          });
          return this;
        }
        /** Add a route that matches the PATCH method. */
        patch(path, ...handlers) {
          handlers.forEach((handler) => {
            this.push("PATCH", path, handler);
          });
          return this;
        }
        /** Add a route that matches the DELETE method. */
        delete(path, ...handlers) {
          handlers.forEach((handler) => {
            this.push("DELETE", path, handler);
          });
          return this;
        }
        /** Add a route that matches the HEAD method. */
        head(path, ...handlers) {
          handlers.forEach((handler) => {
            this.push("HEAD", path, handler);
          });
          return this;
        }
        /** Add a route that matches the OPTIONS method. */
        options(path, ...handlers) {
          handlers.forEach((handler) => {
            this.push("OPTIONS", path, handler);
          });
          return this;
        }
        /** Add a middlewares handler */
        use(handler) {
          return this.push("ALL", "*", handler);
        }
        /** Add a middlewares for handling options requets */
        allowedMethods() {
          return async (ctx) => {
            const url = new URL(ctx.request.url);
            const allow = {
              OPTIONS: true
            };
            this.routes.forEach((route) => {
              if (route.method === "ALL") {
                return;
              }
              const matches = route.regexp.exec(url.pathname);
              if (!matches || !matches.length) {
                return;
              }
              allow[route.method] = true;
            });
            return new Response(null, {
              status: 204,
              headers: {
                "Access-Control-Allow-Methods": Object.keys(allow).join(", "),
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
              }
            });
          };
        }
        matches(method, path) {
          const results = [];
          this.routes.forEach((route) => {
            if (route.method !== method && route.method !== "ALL")
              return;
            const matches = route.regexp.exec(path);
            if (!matches || !matches.length)
              return;
            results.push({ ...route, matches, params: keysToParams(matches, route.keys) });
          });
          return results;
        }
        async handleMatches(ctx, ...routeMatches) {
          const routeMatch = routeMatches.shift();
          if (!routeMatch) {
            return null;
          }
          ctx.params = routeMatch.params;
          return routeMatch.handler(ctx, () => {
            return this.handleMatches(ctx, ...routeMatches);
          });
        }
        async handle(request, env, context) {
          const { pathname, searchParams, protocol, host, hostname } = new URL(request.url);
          const matches = this.matches(request.method, pathname);
          const ctx = {
            request,
            query: searchParams,
            headers: request.headers,
            ip: request.headers.get("x-real-ip"),
            protocol,
            host,
            hostname,
            params: {},
            state: {},
            env,
            event: context
          };
          const response = await this.handleMatches(ctx, ...matches);
          if (!response) {
            return new Response("Not Found", {
              status: 404
            });
          }
          if (request.method === "HEAD") {
            return new Response("", response);
          }
          return response;
        }
        push(method, path, handler) {
          const keys = [];
          if (path === "*") {
            path = "(.*)";
          }
          const regexp = (0, path_to_regexp_1.pathToRegexp)(path, keys);
          this.routes.push({ method, path: path.toString(), handler, keys, regexp });
          return this;
        }
      };
      __name(Router2, "Router");
      exports.Router = Router2;
      var keysToParams = /* @__PURE__ */ __name((matches, keys) => {
        const params = {};
        for (let i = 1; i < matches.length; i++) {
          const key = keys[i - 1];
          const prop = key.name;
          const val = matches[i];
          if (val !== void 0) {
            params[prop] = val;
          }
        }
        return params;
      }, "keysToParams");
    }
  });

  // ../node_modules/cloudworker-router/dist/src/middlewares/bodyparser.js
  var require_bodyparser = __commonJS({
    "../node_modules/cloudworker-router/dist/src/middlewares/bodyparser.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bodyparser = void 0;
      var METHODS_WITH_BODY = ["POST", "PUT", "PATCH"];
      async function bodyparser(ctx, next) {
        const contentype = ctx.headers.get("content-type");
        if (!METHODS_WITH_BODY.includes(ctx.request.method)) {
          return next();
        }
        try {
          if (contentype?.startsWith("application/json")) {
            ctx.body = await ctx.request.json();
          } else if (contentype?.startsWith("application/x-www-form-urlencoded")) {
            ctx.body = Object.fromEntries(await ctx.request.formData());
          } else if (contentype?.startsWith("text")) {
            ctx.body = await ctx.request.text();
          }
          return next();
        } catch (err) {
          return new Response("Invalid body format", {
            status: 400,
            headers: {
              "content-type": "text/plain"
            }
          });
        }
      }
      __name(bodyparser, "bodyparser");
      exports.bodyparser = bodyparser;
    }
  });

  // ../node_modules/cloudworker-router/dist/src/middlewares/index.js
  var require_middlewares = __commonJS({
    "../node_modules/cloudworker-router/dist/src/middlewares/index.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_bodyparser(), exports);
    }
  });

  // ../node_modules/cloudworker-router/dist/src/index.js
  var require_src = __commonJS({
    "../node_modules/cloudworker-router/dist/src/index.js"(exports) {
      "use strict";
      init_checked_fetch();
      init_middleware_insertion_facade();
      init_modules_watch_stub();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_types(), exports);
      __exportStar(require_Router(), exports);
      __exportStar(require_middlewares(), exports);
    }
  });

  // src/index.js
  init_checked_fetch();
  init_middleware_insertion_facade();
  init_modules_watch_stub();
  var { Router } = require_src();
  var router = new Router();
  function generatePayload(schema, emails, tag, listid) {
    console.log("update", schema.update_existing);
    if (schema.type == "") {
      return emails.map((email) => ({ email }));
    }
    return {
      [schema.type]: emails.map((email) => {
        let entry = {};
        for (const key in schema.fields) {
          if (key === "email" || key === "email_address") {
            entry[key] = email;
          } else if (key === "tag") {
            entry[key] = [tag];
          } else if (key === "subscribe") {
            entry[key] = [{ listid }];
          } else {
            entry[key] = schema.fields[key];
          }
        }
        return entry;
      }),
      ...schema.update_existing !== void 0 && { update_existing: schema.update_existing }
    };
  }
  __name(generatePayload, "generatePayload");
  router.get("/", () => {
    return new Response("Hello, welcome to the API! - mahima");
  });
  router.post("/send-email", async ({ request }) => {
    try {
      const { clientschema, tag, listid, emails, update_existing } = await request.json();
      console.log("HERE", clientschema.fields.tags, emails, clientschema.fields.status, clientschema.update_existing);
      if (!clientschema) {
        return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 });
      }
      const payload = generatePayload(clientschema, emails, tag, listid);
      console.log("Payload:", JSON.stringify(payload));
      return new Response(JSON.stringify(payload), { headers: { "Content-Type": "application/json" } });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to parse JSON." }), { status: 400 });
    }
  });
  router.post("/parseData", async ({ request }) => {
    try {
      const { emails } = await request.json();
      if (!emails) {
        return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 });
      }
      const parsedEmails = JSON.parse(JSON.stringify(emails));
      const emailList = parsedEmails.map((item) => item.email[0]);
      console.log("Payload:", emailList);
      return new Response(JSON.stringify(emailList), { headers: { "Content-Type": "application/json" } });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to parse JSON." }), { status: 400 });
    }
  });
  addEventListener("fetch", (event) => {
    event.respondWith(router.handle(event.request));
  });
})();
//# sourceMappingURL=index.js.map
