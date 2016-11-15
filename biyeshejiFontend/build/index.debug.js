/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Wrap = __webpack_require__(1);
	React.render(React.createElement(Wrap, null), document.getElementById('content'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppStores = __webpack_require__(3);
	var AppActions = __webpack_require__(14);
	var Loading = __webpack_require__(15);
	var Error = __webpack_require__(2);
	var Img = __webpack_require__(16);
	var AllComponents = __webpack_require__(17);
	var Wrap = React.createClass({
	    displayName: 'Wrap',

	    getInitialState: function getInitialState() {
	        return AppStores.initData;
	    },
	    componentDidMount: function componentDidMount() {
	        AppStores.addChangeListener(this._onChange);
	        AppActions.mtop();
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        AppStores.removeChangeListener(this._onChange);
	    },
	    _onChange: function _onChange() {
	        this.setState(AppStores.data);
	    },
	    render: function render() {
	        if (!this.state.requestOver || !this.state.haveData) {
	            return React.createElement(
	                'div',
	                { className: 'long' },
	                React.createElement(Loading, { loading: this.state.loading }),
	                React.createElement(Error, { error: this.state.error })
	            );
	        } else {
	            return React.createElement(AllComponents, { register: this.state.register, loginPart: this.state.loginPart, publish: this.state.publish, detail: this.state.detail, floor: this.state.floor, floorType: this.state.floorType, mainList: this.state.mainList, selfcenter: this.state.selfcenter });
	        }
	    }
	});

	module.exports = Wrap;

/***/ },
/* 2 */
/***/ function(module, exports) {

	//异常流
	'use strict';

	var Error = React.createClass({
	    displayName: 'Error',

	    render: function render() {
	        var data = this.props.error;
	        var displayAttr = data && data.display && data.display.display;

	        if (displayAttr != 'none') {
	            var imgURL = '//imgsize.52shangou.com/img/n/11/30/1448855302897_6565.png';
	        } else {
	            var imgURL = '';
	        }

	        return React.createElement(
	            'div',
	            { className: 'error-wrap', style: data.display },
	            React.createElement(
	                'div',
	                { className: 'error-context' },
	                React.createElement(
	                    'div',
	                    { className: 'error-img' },
	                    React.createElement('img', { src: imgURL })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'error-text' },
	                    React.createElement(
	                        'p',
	                        { className: 'p-top' },
	                        data.text.p1
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'p-bottom' },
	                        data.text.p2
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Error;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EventEmitter = __webpack_require__(5).EventEmitter;
	var assign = __webpack_require__(6);
	var AppDispatcher = __webpack_require__(7);
	var actionType = __webpack_require__(4);
	var AppActionsCommon = __webpack_require__(11);
	var lib = __webpack_require__(13);
	var setSpm = lib.spm();
	var EVENT_CHANGE = 'store::change';
	var AppStores = assign({}, EventEmitter.prototype, {
	  addChangeListener: function addChangeListener(callback) {
	    this.on(EVENT_CHANGE, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(EVENT_CHANGE, callback);
	  },
	  emitChange: function emitChange() {
	    this.emit(EVENT_CHANGE);
	  }
	});

	AppDispatcher.register(function (payload) {
	  var action = payload;
	  switch (action.actionType) {
	    case actionType.mtop:
	      return mtop(action.params);
	    case actionType.setMainList:
	      return setMainList(action.params);
	    case actionType.setSelfDetail:
	      return setSelfDetail(action.params);
	    case actionType.setSelfCenter:
	      return setSelfCenter(action.params);
	    case actionType.setFloorActiveId:
	      return setFloorActiveId(action.params);
	    case actionType.setPublish:
	      return setPublish(action.params);
	    case actionType.publish:
	      return publish(action.params);
	    case actionType.setLogin:
	      return setLogin(action.params);
	    case actionType.goLogin:
	      return goLogin(action.params);
	    case actionType.setRegister:
	      return setRegister(action.params);
	    case actionType.register:
	      return register(action.params);
	    case actionType.selfCenter:
	      return selfCenter(action.params);
	    case actionType.logout:
	      return logout(action.params);
	    default:
	      return true;
	  }
	});

	AppStores.data = {
	  error: {
	    display: { display: "none" },
	    text: {
	      p1: "",
	      p2: ""
	    }
	  },
	  loading: {
	    display: "block"
	  },
	  mainList: {},
	  selfcenter: {
	    active: false,
	    data: {}
	  },
	  floorType: 'found',
	  detail: {
	    active: false,
	    data: {}
	  },
	  floor: {
	    list: [{ id: 0, name: '所有物品' }, { id: 1, name: '电子产品' }, { id: 2, name: '办公用品' }, { id: 3, name: '各类卡' }, { id: 4, name: '雨伞' }, { id: 5, name: '钥匙' }, { id: 6, name: '学习资料' }, { id: 7, name: '水杯' }, { id: 8, name: '衣服' }, { id: 9, name: '钱包' }, { id: 10, name: '其他' }],
	    activeId: 0
	  },
	  publish: {
	    active: false,
	    data: {}
	  },
	  loginPart: {
	    active: false
	  },
	  register: {
	    active: false
	  }
	};

	//初始数据获取
	function mtop(params) {
	  var queryThing = {
	    "type": "found"
	  };
	  $.ajax({
	    url: lib.returnHost() + 'graduationDesign/api/lostAndFound/getPosts',
	    dataType: 'jsonp',
	    timeout: 10000,
	    data: {
	      queryThing: JSON.stringify(queryThing),
	      "page": 1
	    },
	    success: function success(data) {
	      if (data && data.status == true) {
	        var entry = data.entry;
	        AppStores.data.mainList.list = entry.docs;
	        AppStores.data.requestOver = true;
	        AppStores.data.haveData = true;
	        AppStores.emitChange();
	      }
	    },
	    error: function error(ex) {
	      AppStores.data.loading = { display: 'none' };
	      AppStores.data.error = {
	        display: { display: "block" },
	        text: {
	          p1: "请求失败",
	          p2: JSON.stringify(ex) || "网络异常，获取数据失败！"
	        }
	      };
	      AppStores.emitChange();
	    }
	  });
	}

	function goLogin(params) {
	  $.ajax({
	    url: lib.returnHost() + 'graduationDesign/api/lostAndFound/login',
	    data: params,
	    dataType: 'jsonp',
	    success: function success(data) {
	      if (data && data.status == true) {
	        AppActionsCommon.setToast({
	          title: '失物招领提示',
	          type: 'toast',
	          content: '登录成功！'
	        });
	        setTimeout(function () {
	          if (params && params.selfcenter) {
	            selfCenter();
	          }
	          AppStores.data.loginPart.active = false;
	          AppStores.emitChange();
	        }, 1500);
	      } else {
	        AppActionsCommon.setToast({
	          title: '失物招领提示',
	          content: data.message
	        });
	      }
	    },
	    error: function error(ex) {
	      AppActionsCommon.setToast({
	        title: '失物招领提示',
	        content: "网络异常！"
	      });
	    }
	  });
	}

	function logout(params) {
	  $.ajax({
	    url: lib.returnHost() + "graduationDesign/api/lostAndFound/logout",
	    dataType: 'jsonp',
	    success: function success(data) {
	      if (data && data.status == true) {
	        AppActionsCommon.setToast({
	          title: '失物招领提示',
	          type: 'toast',
	          content: "注销成功!"
	        });
	        if (params && params.selfcenter) {
	          selfCenter();
	        }
	      }
	    },
	    error: function error(ex) {
	      AppActionsCommon.setToast({
	        title: '失物招领提示',
	        content: "网络异常！"
	      });
	    }
	  });
	}

	function register(params) {
	  $.ajax({
	    url: lib.returnHost() + 'graduationDesign/api/lostAndFound/reg',
	    dataType: 'jsonp',
	    data: params,
	    success: function success(data) {
	      if (data && data.status == true) {
	        AppActionsCommon.setToast({
	          title: '失物招领提示',
	          type: 'toast',
	          content: "注册成功！"
	        });

	        setTimeout(function () {
	          setRegister({ active: false });
	        }, 1500);
	      } else {
	        AppActionsCommon.setToast({
	          title: '失物招领提示',
	          content: data.message || "注册失败！"
	        });
	      }
	    },
	    error: function error(ex) {
	      AppActionsCommon.setToast({
	        title: '失物招领提示',
	        content: "网络异常！"
	      });
	    }
	  });
	}

	function selfCenter() {
	  $.ajax({
	    url: lib.returnHost() + 'graduationDesign/api/lostAndFound/getUserOwn',
	    dataType: 'jsonp',
	    data: {},
	    success: function success(data) {
	      if (data && data.status == true) {
	        AppStores.data.selfcenter.active = true;
	        AppStores.data.selfcenter.data = data.entry;
	        AppStores.emitChange();
	      } else {
	        AppStores.data.selfcenter.active = false;
	        AppStores.data.selfcenter.data = {};
	        AppStores.emitChange();
	      }
	    },
	    error: function error(ex) {
	      AppActionsCommon.setToast({
	        title: '失物招领提示',
	        content: "网络异常,获取个人信息失败！"
	      });
	    }
	  });
	}

	function setLogin(params) {
	  AppStores.data.loginPart.active = params.active;
	  AppStores.data.loginPart.selfcenter = params.selfcenter;
	  AppStores.emitChange();
	}

	function setPublish(params) {
	  AppStores.data.publish.active = params.active;
	  AppStores.emitChange();
	}

	function setRegister(params) {
	  AppStores.data.register.active = params.active;
	  AppStores.emitChange();
	}

	function publish(params) {
	  $.ajax({
	    url: lib.returnHost() + 'graduationDesign/api/lostAndFound/post',
	    dataType: 'jsonp',
	    data: params.data,
	    success: function success(data) {
	      if (data && data.status == true) {
	        AppActionsCommon.setToast({
	          title: "失物招领提示",
	          type: "toast",
	          content: '发布成功'
	        });
	        setTimeout(function () {
	          AppStores.data.publish.active = false;
	          AppStores.emitChange();
	          var params = {
	            queryThing: {
	              type: 'found'
	            },
	            page: 1
	          };
	          setMainList(params);
	        }, 1500);
	      } else {
	        AppActionsCommon.setToast({
	          title: "失物招领提示",
	          content: '发布失败'
	        });
	      }
	    },
	    error: function error(ex) {
	      AppActionsCommon.setToast({
	        title: "失物招领提示",
	        content: '发布失败'
	      });
	    }
	  });
	}

	function setMainList(params) {
	  var queryThing = params.queryThing;
	  $.ajax({
	    url: lib.returnHost() + 'graduationDesign/api/lostAndFound/getPosts',
	    dataType: 'jsonp',
	    data: {
	      queryThing: encodeURIComponent(encodeURIComponent(JSON.stringify(queryThing))),
	      page: params.page
	    },
	    success: function success(data) {
	      if (data && data.status == true) {
	        var entry = data.entry;
	        AppStores.data.mainList.list = entry.docs;
	        AppStores.data.floorType = params.queryThing.type;
	        AppStores.emitChange();
	        AppStores.emitChange();
	      }
	    },
	    error: function error(ex) {
	      console.log(ex);
	    }
	  });
	}

	function setSelfDetail(params) {
	  if (params && params.back) {
	    AppStores.data.detail.active = false;
	    AppStores.emitChange();
	    return;
	  }
	  $.ajax({
	    url: lib.returnHost() + 'graduationDesign/api/lostAndFound/getDetail',
	    dataType: 'jsonp',
	    data: {
	      ArticleID: params.ArticleID
	    },
	    success: function success(data) {
	      if (data && data.status == true) {
	        var entry = data.entry;
	        AppStores.data.detail.active = true;
	        AppStores.data.detail.data = entry && entry.docs;
	        AppStores.emitChange();
	      }
	    },
	    error: function error(ex) {
	      console.log(ex);
	    }
	  });
	}

	function setSelfCenter(params) {
	  $.ajax({
	    url: lib.returnHost() + 'graduationDesign/api/lostAndFound/getUserOwn',
	    dataType: 'jsonp',
	    success: function success(data) {
	      if (data && data.status == true) {
	        var entry = data.entry;
	        AppStores.data.selfCenter.haveData = false;
	        AppStores.data.selfCenter.pic = entry.pic;
	        AppStores.data.selfCenter.name = entry.name;
	        AppStores.data.selfCenter.list = entry.docs;
	        AppStores.emitChange();
	      }
	    },
	    error: function error(ex) {
	      console.log(ex);
	    }
	  });
	}

	function setFloorActiveId(params) {
	  AppStores.data.floor.activeId = params.activeId;
	  AppStores.emitChange();
	}

	AppStores.initData = {
	  requestOver: false,
	  haveData: false,
	  error: {
	    display: { display: "none" },
	    text: {
	      p1: "",
	      p2: ""
	    }
	  },
	  loading: {
	    display: "block"
	  },
	  selfcenter: {
	    active: false,
	    data: {}
	  },
	  floorType: 'found',
	  floor: {
	    list: [{ id: 0, name: '所有物品' }, { id: 1, name: '电子产品' }, { id: 2, name: '办公用品' }, { id: 3, name: '各类卡' }, { id: 4, name: '雨伞' }, { id: 5, name: '钥匙' }, { id: 6, name: '学习资料' }, { id: 7, name: '水杯' }, { id: 8, name: '衣服' }, { id: 9, name: '钱包' }, { id: 10, name: '其他' }],
	    activeId: 0
	  },
	  detail: {
	    active: false,
	    data: {}
	  },
	  publish: {
	    active: false,
	    data: {}
	  },
	  loginPart: {
	    active: false
	  },
	  register: {
	    active: false
	  }
	};

	module.exports = AppStores;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    mtop: 'mtop',
	    setMainList: 'setMainList',
	    setSelfDetail: 'setSelfDetail',
	    setSelfCenter: 'setSelfCenter',
	    setFloorActiveId: 'setFloorActiveId',
	    setPublish: 'setPublish',
	    publish: 'publish',
	    setLogin: 'setLogin',
	    goLogin: 'goLogin',
	    setRegister: 'setRegister',
	    register: 'register',
	    selfCenter: 'selfCenter',
	    logout: 'logout'
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var pendingException;
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				try {
					to[keys[i]] = from[keys[i]];
				} catch (err) {
					if (pendingException === undefined) {
						pendingException = err;
					}
				}
			}
		}

		if (pendingException) {
			throw pendingException;
		}

		return to;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * AppDispatcher
	 *
	 * A singleton that operates as the central hub for application updates.
	 */

	'use strict';

	var Dispatcher = __webpack_require__(8).Dispatcher;

	module.exports = new Dispatcher();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(9)


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(10);

	var _lastID = 1;
	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };


	module.exports = Dispatcher;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(7);
	var actionType = __webpack_require__(12);

	var AppActions = {
	    getOver: function getOver(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.getOver,
	            params: params
	        });
	    },
	    setToast: function setToast(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setToast,
	            params: params
	        });
	    },
	    showLoading: function showLoading(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.showLoading,
	            params: params
	        });
	    },
	    hideLoading: function hideLoading(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.hideLoading,
	            params: params
	        });
	    },
	    setCountdown: function setCountdown(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setCountdown,
	            params: params
	        });
	    },
	    setCartNum: function setCartNum(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setCartNum,
	            params: params
	        });
	    }
	};

	module.exports = AppActions;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  getOver: 'getOver',
	  setToast: 'setToast',
	  hideLoading: 'hideLoading',
	  showLoading: 'showLoading',
	  setCountdown: 'setCountdown',
	  setCartNum: 'setCartNum'
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var lib = {};
	//节流函数
	lib.throttle = function (func, wait) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    var later = function later() {
	        previous = Date.now();
	        timeout = null;
	        result = func.apply(context, args);
	    };
	    return function () {
	        var now = Date.now();
	        var remaining = wait - (now - previous);
	        context = this;
	        args = arguments;
	        if (remaining <= 0) {
	            clearTimeout(timeout);
	            timeout = null;
	            previous = now;
	            result = func.apply(context, args);
	        } else if (!timeout) {
	            timeout = setTimeout(later, remaining);
	        }
	        return result;
	    };
	};

	lib.getStyle = function (obj, name) {
	    if (obj.currentStyle) {
	        return obj.currentStyle[name];
	    } else {
	        return getComputedStyle(obj, true)[name];
	    }
	};

	//运动函数
	lib.moveFn = function (obj, json, fnEnd) {
	    clearInterval(obj.timer);
	    obj.timer = setInterval(function () {
	        var beStart = true;
	        for (var sty in json) {
	            var arr = 0;
	            if (sty == 'opacity') {
	                arr = Math.round(parseFloat(lib.getStyle(obj, sty)) * 100);
	            } else if (sty == 'scrollLeft') {
	                var styData = obj.scrollLeft;
	                arr = parseInt(styData);
	            } else {
	                arr = parseInt(lib.getStyle(obj, sty));
	            }
	            var speed = (json[sty] - arr) / 4;
	            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	            if (json[sty] != arr) {
	                beStart = false;
	            }

	            if (sty == 'opacity') {
	                obj.style.filter = 'alpha(opacity:' + (arr + speed) + ')';
	                obj.style.opacity = (arr + speed) / 100;
	            } else if (sty == 'scrollLeft') {
	                obj.scrollLeft = arr + speed;
	            } else {
	                obj.style[sty] = arr + speed + 'px';
	            }
	            if (beStart) {
	                clearInterval(obj.timer);
	                if (fnEnd) {
	                    fnEnd();
	                }
	            }
	        }
	    }, 30);
	};

	//获取链接里的参数
	lib.getByUrl = function (key, source) {
	    var url = source ? decodeURIComponent(decodeURIComponent(source)) : decodeURIComponent(decodeURIComponent(window.location.href));
	    var re = new RegExp("[&?]" + key + '=[^&#]+', 'g');
	    var getUrl = url.match(re) && url.match(re)[0] && url.match(re)[0].split('=') && url.match(re)[0].split('=')[1];
	    return getUrl;
	};

	//设置native的透明头
	lib.setNativeBar = function () {
	    var PAGE_OS = lib.navigator();
	    if (window.bridge && PAGE_OS.isApp) {
	        bridge.callNativeSync("setChangePos", { distance: 164 });
	    }
	};

	//数组去重
	lib.parseArray = function (params) {
	    var arr = params.arr;
	    var newArr = [];
	    var lastOne;
	    for (var i = 0; i < arr.length; i++) {
	        if (i == 0) {
	            newArr.push(arr[0]);
	            lastOne = arr[0];
	        } else if (arr[i].id != lastOne.id) {
	            newArr.push(arr[i]);
	            lastOne = arr[i];
	        }
	    }
	    return newArr;
	};

	//返回网络异常页面
	lib.callNativeError = function () {
	    bridge.callNativeSync('netWorkError');
	};

	//从购物车回到二级页 触发brige监听 运行方法 只有一次消费 bridgeCallJsFn是一个放在window下面的函数 里面可以有若干函数
	lib.bindDisplayBack = function () {
	    var PAGE_OS = lib.navigator();
	    if (window.bridge && PAGE_OS.isApp) {
	        bridge.displayReload('bridgeCallJsFn');
	    }
	};

	//返回埋点信息
	lib.spm = function () {
	    var spm = {
	        shopCarts: 'a_shandiangou.b_full_reduction_activities.c_a.d_',
	        foodLink: 'a_shandiangou.b_full_reduction_activities.c_b.d_'
	    };
	    return spm;
	};

	//返回host
	lib.returnHost = function (params) {
	    var hostname = window.location.hostname;
	    var https = params && params.forHttps ? "" : "http:";
	    if (hostname.match("shejingbingis.me")) {
	        return https + '//120.26.207.101:3009/';
	    } else {
	        return https + '//localhost:3009/';
	    }
	};

	//生成随机数 规则取当前时间long类型 +num位字符串
	lib.randomData = function (num) {
	    var oDate = new Date();
	    var str = oDate.getTime();
	    for (var i = 0; i < num; i++) {
	        str += parseInt(Math.random() * 10);
	    }
	    return str;
	};

	//parse 数字 23.00
	lib.parse = function (x) {
	    var f_x = parseFloat(x);
	    if (isNaN(f_x)) {
	        console.log('function:changeTwoDecimal->parameter error');
	        return false;
	    }
	    var f_x = Math.round(x * 100) / 100;
	    var s_x = f_x.toString();
	    var pos_decimal = s_x.indexOf('.');
	    if (pos_decimal < 0) {
	        pos_decimal = s_x.length;
	        s_x += '.';
	    }
	    while (s_x.length <= pos_decimal + 2) {
	        s_x += '0';
	    }
	    return s_x;
	};

	//根据服务器时间返回前几天 或者后几天 的时间
	//参数 setDates
	lib.returnDate = function (params) {
	    if (!params) {
	        console.log('请输入时间');
	        return;
	    }
	    var oDate = new Date(params.date);
	    var setDates = params.set;
	    if (setDates) {
	        oDate.setDate(oDate.getDate() + setDates);
	    }
	    return oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate();
	};

	//不满10 加上0
	lib.checkTime = function (params) {
	    var time = params.time;
	    if (time < 10) {
	        return "0" + time;
	    } else {
	        return time;
	    }
	};

	//比较时分秒的大小
	lib.biger = function (params) {
	    var re = /-/g;
	    if (params.time1.match('24:00:00')) {
	        params.time1 = params.time1.replace('24:00:00', '23:59:59');
	    }
	    if (params.time2.match('24:00:00')) {
	        params.time2 = params.time2.replace('24:00:00', '23:59:59');
	    }
	    var time1 = params.time1 && params.time1.replace(re, "/");
	    var time2 = params.time2 && params.time2.replace(re, "/");

	    var date1 = new Date(time1);
	    var date2 = new Date(time2);
	    date1.setFullYear(date2.getFullYear());
	    date1.setMonth(date2.getMonth());
	    date1.setDate(date2.getDate());
	    if (date1.getTime() - date2.getTime() > 0) {
	        return true;
	    } else {
	        return false;
	    }
	};

	//两个时间差
	lib.dateDifference = function (params) {
	    var re = /-/g;
	    var time1 = params.time1 && params.time1.replace(re, "/");
	    var time2 = params.time2 && params.time2.replace(re, "/");
	    var oDate1 = new Date(time1);
	    var oDate2 = new Date(time2);
	    var dateCha = oDate1.getTime() - oDate2.getTime();
	    var oDateCha = new Date(dateCha);
	    return oDateCha.getTime() / 1000 / 86400;
	};

	//返回不同格式的时间
	lib.timer = function (params) {
	    if (!params || !params.time) {
	        return;
	    }
	    var time = params.time;
	    var re = /-/g;
	    time = time.replace(re, "/");
	    var oDate = new Date(time);
	    return {
	        yy_mm_dd_hh_mm_ss: oDate.getFullYear() + "-" + lib.checkTime({ time: oDate.getMonth() + 1 }) + "-" + lib.checkTime({ time: oDate.getDate() }) + " " + lib.checkTime({ time: oDate.getHours() }) + ":" + lib.checkTime({ time: oDate.getMinutes() }) + ":" + lib.checkTime({ time: oDate.getSeconds() }),
	        yymmdd: oDate.getFullYear() + "年" + (oDate.getMonth() + 1) + "月" + oDate.getDate() + "日",
	        yymm: oDate.getFullYear() + "年" + (oDate.getMonth() + 1) + "月",
	        mmdd: oDate.getMonth() + 1 + "月" + oDate.getDate() + "日",
	        _hhmmss: lib.checkTime({ time: oDate.getHours() }) + ":" + lib.checkTime({ time: oDate.getMinutes() }) + ":" + lib.checkTime({ time: oDate.getSeconds() }),
	        _hhmm: lib.checkTime({ time: oDate.getHours() }) + ":" + lib.checkTime({ time: oDate.getMinutes() }),
	        longTime: oDate.getTime()
	    };
	};

	//环境判断
	lib.navigator = function () {
	    var u = navigator.userAgent;
	    // 判断环境
	    var PAGE_OS = {};
	    PAGE_OS.ua = navigator.userAgent;
	    if (/bridgeLibVersion/.test(PAGE_OS.ua)) {
	        PAGE_OS.isApp = true;
	    } else {
	        PAGE_OS.isApp = false;
	    }
	    PAGE_OS.appVersion = PAGE_OS.ua.match(/appVersion\(([^)]+)\)/) && PAGE_OS.ua.match(/appVersion\(([^)]+)\)/)[1] || '0.0.0';
	    PAGE_OS.isIOS = /(iPhone|iPad|iPod)/.test(PAGE_OS.ua);
	    PAGE_OS.isAndroid = /Android/.test(PAGE_OS.ua);

	    // 判断app版本号大小
	    PAGE_OS.compareVersion = function (v1, v2) {
	        v1 = v1.toString().split('.');
	        v2 = v2.toString().split('.');

	        for (var i = 0; i < v1.length || i < v2.length; i++) {
	            var n1 = parseInt(v1[i], 10),
	                n2 = parseInt(v2[i], 10);

	            if (window.isNaN(n1)) {
	                n1 = 0;
	            }
	            if (window.isNaN(n2)) {
	                n2 = 0;
	            }
	            if (n1 < n2) {
	                return -1;
	            } else if (n1 > n2) {
	                return 1;
	            }
	        }
	        return 0;
	    };
	    return PAGE_OS;
	};

	window.lib = lib;
	module.exports = lib;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(7);
	var actionType = __webpack_require__(4);

	var AppActions = {
	    mtop: function mtop(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.mtop,
	            params: params
	        });
	    },
	    setMainList: function setMainList(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setMainList,
	            params: params
	        });
	    },
	    setSelfDetail: function setSelfDetail(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setSelfDetail,
	            params: params
	        });
	    },
	    setSelfCenter: function setSelfCenter(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setSelfCenter,
	            params: params
	        });
	    },
	    setFloorActiveId: function setFloorActiveId(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setFloorActiveId,
	            params: params
	        });
	    },
	    setPublish: function setPublish(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setPublish,
	            params: params
	        });
	    },
	    publish: function publish(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.publish,
	            params: params
	        });
	    },
	    setLogin: function setLogin(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setLogin,
	            params: params
	        });
	    },
	    goLogin: function goLogin(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.goLogin,
	            params: params
	        });
	    },
	    setRegister: function setRegister(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.setRegister,
	            params: params
	        });
	    },
	    register: function register(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.register,
	            params: params
	        });
	    },
	    selfCenter: function selfCenter(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.selfCenter,
	            params: params
	        });
	    },
	    logout: function logout(params) {
	        AppDispatcher.dispatch({
	            actionType: actionType.logout,
	            params: params
	        });
	    }

	};

	module.exports = AppActions;

/***/ },
/* 15 */
/***/ function(module, exports) {

	//loading加载
	'use strict';

	var Loading = React.createClass({
	    displayName: 'Loading',

	    componentDidMount: function componentDidMount() {
	        var loading = this.refs.loading.getDOMNode();
	        var spinTextLoading = new ctrl.loading();
	        loading.appendChild(spinTextLoading.root);
	        spinTextLoading.bgcolor = '#eee';
	        spinTextLoading.arrowDirection = '';
	        spinTextLoading.text = '正在加载中...';
	        spinTextLoading.mode = 'spin';
	    },
	    render: function render() {
	        return React.createElement('div', { id: 'loading', className: 'loading', ref: 'loading', style: this.props.loading });
	    }
	});

	module.exports = Loading;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	//img
	//rname为包裹的classname
	//src 图片大小
	//url a链接
	//slider 为slider的图片
	//slider == 'true'说明为slider上的img
	//img 为默认的lazy图片
	//size 为img.js中 data-size的大小
	//initSize 初始占位图的大小
	'use strict';

	var lib = __webpack_require__(13);
	var Img = React.createClass({
	    displayName: 'Img',

	    render: function render() {
	        var className = this.props.rname ? ' ' + this.props.rname : '';
	        var dataSize = this.props.size || '';
	        var width = dataSize && dataSize.split('x') && dataSize.split('x')[0];
	        var height = dataSize && dataSize.split('x') && dataSize.split('x')[1];
	        var image = this.props.img || '../build/img/moren.png';
	        var slider = this.props.slider;
	        //var danwei = this.props.src && this.props.src.match(/\w{3}$/) && this.props.src.match(/\w{3}$/)[0];
	        if (this.props['static']) {
	            var src = this.props.src;
	        } else {
	            var src = lib.returnHost() + this.props.src;
	        }

	        if (dataSize) {
	            //不带水印
	            src += '@' + width + '_' + (height ? height + '_' : 'null_') + 90;
	        }

	        if (this.props.link) {
	            return React.createElement(
	                'a',
	                { href: this.props.link, className: "img" + className },
	                React.createElement('img', { src: src, 'data-src': src, 'data-cdn': 'no', className: 'lazyload-img' })
	            );
	        } else {
	            return React.createElement(
	                'div',
	                { className: "img" + className },
	                React.createElement('img', { src: src, 'data-src': src, 'data-cdn': 'no', 'data-size': dataSize, className: 'lazyload-img' })
	            );
	        }
	    }
	});

	module.exports = Img;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppActions = __webpack_require__(14);
	var AppActionsCommon = __webpack_require__(11);
	var img = new SGLib.img({
		'class': 'lazyload-img', //img 样式名称
		'lazyHeight': 0,
		'lazyWidth': 0,
		'fireEvent': 'scroll'
	});
	var bodyDom = document.body;
	var fast = SGLib.FastClick(bodyDom);
	var Floor = __webpack_require__(21);
	var Goup = __webpack_require__(23);
	var Toast = __webpack_require__(24);
	var Header = __webpack_require__(26);
	var ListWrap = __webpack_require__(27);
	var SelfCenter = __webpack_require__(18);
	var Detail = __webpack_require__(29);
	var FloatFixed = __webpack_require__(30);
	var Publish = __webpack_require__(31);
	var Login = __webpack_require__(32);
	var Register = __webpack_require__(33);
	var lib = __webpack_require__(13);
	var goUp;
	var AllComponents = React.createClass({
		displayName: 'AllComponents',

		scrollChangeFloor: function scrollChangeFloor() {
			var allTopBig = true;
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

			if (scrollTop > 2000) {
				goUp.classList.remove('hidden');
			} else {
				goUp.classList.add('hidden');
			}
		},
		scroll: function scroll() {
			img.fireLazyload();
		},
		componentDidMount: function componentDidMount() {
			var self = this;
			img.fireLazyload();
			window.addEventListener('scroll', function () {
				lib.throttle(self.scrollChangeFloor, 100)();
			}, false);
			goUp = document.querySelector('.goUp');
		},
		render: function render() {

			return React.createElement(
				'div',
				{ className: 'AllComponents', onScroll: this.scroll },
				React.createElement(
					'div',
					{ className: 'mainList' },
					React.createElement(
						'div',
						{ className: 'mainListWrap' },
						React.createElement(Header, null),
						React.createElement(Floor, { floor: this.props.floor, floorType: this.props.floorType }),
						React.createElement(ListWrap, { img: img, listData: this.props.mainList })
					)
				),
				React.createElement(FloatFixed, null),
				React.createElement(Detail, { img: img, detail: this.props.detail, publish: this.props.publish }),
				React.createElement(SelfCenter, { img: img, selfcenter: this.props.selfcenter }),
				React.createElement(Publish, { detail: this.props.detail, publish: this.props.publish }),
				React.createElement(Login, { img: img, loginPart: this.props.loginPart }),
				React.createElement(Register, { img: img, register: this.props.register }),
				React.createElement(Goup, null),
				React.createElement(Toast, null)
			);
		}

	});

	module.exports = AllComponents;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SelfcenterList = __webpack_require__(19);
	var AppActions = __webpack_require__(14);
	var SelfCenter = React.createClass({
		displayName: 'SelfCenter',

		touchmove: function touchmove(e) {
			e.preventDefault();
		},
		goLogin: function goLogin() {
			AppActions.setLogin({ selfcenter: true, active: true });
		},
		logout: function logout() {
			AppActions.logout({ selfcenter: true });
		},
		render: function render() {
			var selfcenter = this.props.selfcenter;
			var selfcenterData = selfcenter && selfcenter.data && selfcenter.data.docs;
			var selfcenterList = selfcenterData && selfcenterData.map(function (data) {
				return React.createElement(SelfcenterList, { data: data });
			});
			if (selfcenter.active) {
				return React.createElement(
					'div',
					{ className: 'self-center' },
					React.createElement(
						'div',
						{ className: 'self-center-wrap' },
						React.createElement(
							'div',
							{ className: 'per-img', onTouchMove: this.touchmove.bind(this) },
							React.createElement(
								'div',
								{ className: 'self-pic' },
								React.createElement('img', { src: selfcenter.data.img || "../build/img/logo.png" })
							),
							React.createElement(
								'div',
								{ className: 'user-nick' },
								selfcenter.data.name
							)
						),
						React.createElement(
							'div',
							{ className: selfcenterData && selfcenterData.length ? "self-list" : "self-list no-self-list" },
							selfcenterData && selfcenterData.length ? selfcenterList : React.createElement('img', { src: '../build/img/nodata.jpg' })
						),
						React.createElement(
							'div',
							{ className: 'loginandout', onTouchMove: this.touchmove.bind(this) },
							React.createElement(
								'div',
								{ className: 'l-o', onClick: this.logout },
								'注销'
							)
						)
					)
				);
			} else {
				return React.createElement(
					'div',
					{ className: 'self-center', onTouchMove: this.touchmove.bind(this) },
					React.createElement(
						'div',
						{ className: 'self-center-wrap' },
						React.createElement(
							'div',
							{ className: 'per-img' },
							React.createElement(
								'div',
								{ className: 'self-pic' },
								React.createElement('img', { src: '../build/img/logo.png' })
							),
							React.createElement(
								'div',
								{ className: 'user-nick' },
								'未登录'
							)
						),
						React.createElement(
							'div',
							{ className: 'self-list no-self-list' },
							React.createElement('img', { src: '../build/img/nodata.jpg' })
						),
						React.createElement(
							'div',
							{ className: 'loginandout' },
							React.createElement(
								'div',
								{ className: 'l-o', onClick: this.goLogin },
								'登录'
							)
						)
					)
				);
			}
		}

	});

	module.exports = SelfCenter;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Tag = __webpack_require__(20);

	var SelfcenterList = React.createClass({
		displayName: "SelfcenterList",

		render: function render() {
			var data = this.props.data || {};
			var tags = data && data.tags;
			var Tags = tags && tags.map(function (data) {
				return React.createElement(Tag, { data: data });
			});
			return React.createElement(
				"div",
				{ className: "self-list-wrap" },
				React.createElement(
					"div",
					{ className: "self-list-content" },
					React.createElement(
						"div",
						{ className: "self-list-title" },
						data.des
					),
					React.createElement(
						"div",
						{ className: "self-list-tags clear" },
						Tags
					)
				)
			);
		}

	});

	module.exports = SelfcenterList;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	var Tag = React.createClass({
		displayName: "Tag",

		render: function render() {
			var data = this.props.data;
			return React.createElement(
				"div",
				{ className: "tag" },
				data
			);
		}

	});

	module.exports = Tag;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sticky = __webpack_require__(22);
	var widthList = (function () {
		var html = document.getElementsByTagName('html')[0];
		var attr = html && html.getAttribute('data-dpr');
		if (attr == 1) {
			return 52;
		} else if (attr == 2) {
			return 104;
		} else if (attr == 3) {
			return 156;
		}
	})();
	var lib = __webpack_require__(13);
	var AppActions = __webpack_require__(14);
	var Floor = React.createClass({
		displayName: 'Floor',

		getTop: function getTop(e) {
			var offset = e.offsetTop;
			if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
			return offset;
		},
		click: function click(params) {
			if (params.activeId == 0) {
				var queryThing = {
					type: params.type
				};
			} else {
				var queryThing = {
					type: params.type,
					itemType: params.itemType
				};
			}

			AppActions.setFloorActiveId({ activeId: params.activeId });
			AppActions.setMainList({
				queryThing: queryThing,
				page: 1
			});
		},
		componentDidUpdate: function componentDidUpdate() {
			setTimeout(function () {
				var comStickyWrap = document.querySelector('.com-sticky-wrap');
				var activeType = document.querySelector('.type-active');
				//comStickyWrap.scrollLeft = activeType.offsetLeft + activeType.offsetWidth - comStickyWrap.offsetWidth + widthList;
				var comStickyWrapScrollLeft = activeType.offsetLeft + activeType.offsetWidth - comStickyWrap.offsetWidth + widthList;
				lib.moveFn(comStickyWrap, { scrollLeft: comStickyWrapScrollLeft });
			}, 20);
		},
		render: function render() {
			var self = this;
			var floorType = this.props.floorType;
			var list = this.props.floor.list.map(function (data, i) {
				if (data.id == self.props.floor.activeId) {
					return React.createElement(
						'div',
						{ 'data-id': 'F' + (data && data.id), 'data-type': floorType, className: 'type type-active', onClick: function (ev) {
								self.click({ activeId: data.id, itemType: data.name, type: floorType });
							} },
						data && data.name
					);
				} else {
					return React.createElement(
						'div',
						{ 'data-id': 'F' + (data && data.id), 'data-type': floorType, className: 'type', onClick: function (ev) {
								self.click({ activeId: data.id, itemType: data.name, type: floorType });
							} },
						data && data.name
					);
				}
			});

			return React.createElement(
				Sticky,
				null,
				React.createElement(
					'div',
					{ className: 'webkit-sticky-relative-wrap' },
					React.createElement(
						'div',
						{ className: 'flex1' },
						React.createElement(
							'div',
							{ className: 'com-sticky-wrap' },
							React.createElement(
								'div',
								{ className: 'com-sticky-wrap-webkit' },
								list
							)
						)
					)
				)
			);
		}

	});

	module.exports = Floor;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lib = __webpack_require__(13);
	var PAGE_OS = lib.navigator();
	var Sticky = React.createClass({
		displayName: 'Sticky',

		componentDidMount: function componentDidMount() {
			var self = this;
			if (PAGE_OS.isAndroid) {
				window.addEventListener('scroll', function () {
					lib.throttle(self.navPos, 100)();
				}, false);
			}
		},
		navPos: function navPos() {
			var element = document.querySelector('.webkit-sticky');
			var top = element.getBoundingClientRect().top;
			var soldlisttitleWrapPos = document.querySelector('.webkit-sticky-fixed-wrap');
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if (top < 0 || top == 0) {
				soldlisttitleWrapPos.classList.add('nav-in-active');
			} else if (top > 0) {
				soldlisttitleWrapPos.classList.remove('nav-in-active');
			}
		},
		checkInApp: function checkInApp() {
			var tspBar = lib.getByUrl("tspBar");

			//判断是否在app里 没有的话不能把top设置大
			if (tspBar == 'true') {
				if (PAGE_OS.isAndroid && !PAGE_OS.isApp) {
					return "android";
				} else if (PAGE_OS.isIOS && !PAGE_OS.isApp) {
					return "ios";
				} else if (!PAGE_OS.isApp) {
					return "other";
				}
				return true;
			} else {
				if (PAGE_OS.isAndroid && !PAGE_OS.isApp) {
					return "android";
				} else if (PAGE_OS.isIOS && !PAGE_OS.isApp) {
					return "ios";
				} else if (!PAGE_OS.isApp) {
					return "other";
				}
				return true;
			}
		},
		render: function render() {
			var style1 = this.props.style || {};
			var style2 = {};
			if (this.checkInApp() == 'ios') {
				style1.top = '0';
			} else if (this.checkInApp() == 'android') {
				style2.top = '0';
			} else if (this.checkInApp() == "other") {
				style2.top = '0';
			}
			//alert(JSON.stringify(style1)+" "+JSON.stringify(style2));
			return React.createElement(
				'div',
				{ className: 'webkit-sticky', style: style1 },
				React.createElement(
					'div',
					{ className: 'webkit-sticky-fixed-wrap', style: style2 },
					this.props.children
				)
			);
		}

	});

	module.exports = Sticky;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	var GoUp = React.createClass({
		displayName: "GoUp",

		goTop: function goTop() {
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		},
		render: function render() {
			return React.createElement("div", { className: "goUp hidden", onClick: this.goTop });
		}

	});

	module.exports = GoUp;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    {
	        data:{
	            type:// alert confirm toast
	            style://外层div样式 {display:none}
	            autoClass://额外的classname
	            content:// alert 或者 confirm 的标题
	            btnAlert://alert按钮的文案
	            btnAlertFn://alert按钮按下执行的回调
	            btnConfirmLeft://confirm按钮左边的文案
	            btnConfirmRight://confirm按钮右边的文案
	            btnConfirmLeftFn://左边对应的回调函数
	            btnConfirmRightFn://右边对应的回调函数
	            havePic://toast是否有图片
	        }
	    }
	*/

	'use strict';

	var AppActions = __webpack_require__(11);
	var AppStoresForToast = __webpack_require__(25);
	var timer = null;
	var Toast = React.createClass({
	    displayName: 'Toast',

	    getInitialState: function getInitialState() {
	        return AppStoresForToast.initData;
	    },
	    componentDidMount: function componentDidMount() {
	        AppStoresForToast.addChangeListener(this._onChange);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        AppStoresForToast.removeChangeListener(this._onChange);
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        var self = this;
	        var state = AppStoresForToast.data;
	        if (state && state.data && state.data.type == "toast") {
	            clearTimeout(timer);
	            timer = setTimeout(function () {
	                AppActions.setToast({
	                    style: { "display": "none" }
	                });
	            }, 1500);
	        }
	    },
	    _onChange: function _onChange() {
	        this.setState(AppStoresForToast.data);
	    },
	    changeState: function changeState() {
	        AppActions.setToast({
	            style: { "display": "none" }
	        });
	    },
	    alertFn: function alertFn(params) {
	        if (params && params.btnAlertFn) {
	            params.btnAlertFn();
	        }
	        this.changeState();
	    },
	    confirmLeftFn: function confirmLeftFn(params) {
	        if (params && params.btnConfirmLeftFn) {
	            params.btnConfirmLeftFn();
	        }
	        this.changeState();
	    },
	    confirmRightFn: function confirmRightFn(params) {
	        if (params && params.btnConfirmRightFn) {
	            params.btnConfirmRightFn();
	        }
	        this.changeState();
	    },
	    render: function render() {
	        var data = this.state.data || {};
	        var paramsData = {};
	        paramsData.type = data.type || 'alert'; // alert confirm toast
	        paramsData.style = data.style || {}; //外层div样式 {display:none}
	        paramsData.autoClass = data.autoClass || ""; //额外的classname
	        paramsData.title = data.title || "闪电购提示"; // alert 或者 confirm 的标题
	        paramsData.content = data.content || ""; //alert 或者comfirm 或者 toast 的内容

	        paramsData.btnAlert = data.btnAlert || "确认"; //alert按钮的文案
	        paramsData.btnAlertFn = data.btnAlertFn || null; //alert按钮按下执行的回调

	        paramsData.btnConfirmLeft = data.btnConfirmLeft || "确认"; //confirm按钮左边的文案
	        paramsData.btnConfirmRight = data.btnConfirmRight || "取消"; //confirm按钮右边的文案
	        paramsData.btnConfirmLeftFn = data.btnConfirmLeftFn || null; //点击confirm按钮左边的回调
	        paramsData.btnConfirmRightFn = data.btnConfirmRightFn || null; //点击confirm按钮右边的回调

	        paramsData.staticImg = '//imgsize.52shangou.com/img/n/04/14/1460608697388_3802.png';
	        paramsData.havePic = data.havePic || null;

	        var self = this;
	        if (paramsData.type && paramsData.type == "alert") {
	            var btn = React.createElement(
	                'div',
	                { className: 'toast-showBtn' },
	                React.createElement(
	                    'div',
	                    { className: 'toast-ok', onClick: function () {
	                            self.alertFn(paramsData);
	                        } },
	                    paramsData.btnAlert
	                )
	            );
	        } else if (paramsData.type && paramsData.type == "confirm") {
	            var btn = React.createElement(
	                'div',
	                { className: 'toast-showBtn' },
	                React.createElement(
	                    'div',
	                    { className: 'toast-lbtn', onClick: function () {
	                            self.confirmLeftFn(paramsData);
	                        } },
	                    paramsData.btnConfirmLeft
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'toast-rbtn', onClick: function () {
	                            self.confirmRightFn(paramsData);
	                        } },
	                    paramsData.btnConfirmRight
	                )
	            );
	        } else {
	            var btn = React.createElement('div', { className: 'toast-showBtn' });
	        }

	        if (paramsData.type && paramsData.type == "confirm" || paramsData.type && paramsData.type == "alert") {
	            return React.createElement(
	                'div',
	                { className: 'toast-wrap', style: paramsData.style },
	                React.createElement(
	                    'div',
	                    { className: 'toast-showBox' },
	                    React.createElement(
	                        'div',
	                        { className: 'toast-showTitle' },
	                        paramsData.title
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'toast-showMessage' },
	                        React.createElement(
	                            'div',
	                            { className: 'toast-showMessage-in' },
	                            paramsData.content
	                        )
	                    ),
	                    btn
	                )
	            );
	        } else if (paramsData.type && paramsData.type == "toast") {
	            return React.createElement(
	                'div',
	                { className: 'toast-wrap-toast', style: paramsData.style },
	                React.createElement(
	                    'div',
	                    { className: 'toast' },
	                    paramsData.havePic ? React.createElement('div', { className: 't-icon', style: paramsData.havePic ? { "backgroundImage": "url(" + paramsData.staticImg + ")" } : {} }) : "",
	                    React.createElement(
	                        'p',
	                        { className: 't-content' },
	                        paramsData.content
	                    )
	                )
	            );
	        } else if (paramsData.type && paramsData.type == "loading") {
	            return React.createElement(
	                'div',
	                { className: 'toast-wrap-toast', style: paramsData.style },
	                React.createElement(
	                    'div',
	                    { className: 'toast-wrap-toast-loading' },
	                    React.createElement('div', { className: 'toast-loading' })
	                )
	            );
	        }
	    }
	});
	module.exports = Toast;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EventEmitter = __webpack_require__(5).EventEmitter;
	var assign = __webpack_require__(6);
	var AppDispatcher = __webpack_require__(7);
	var actionType = __webpack_require__(12);

	var EVENT_CHANGE = 'store::change';
	var AppStoresForToast = assign({}, EventEmitter.prototype, {
	  addChangeListener: function addChangeListener(callback) {
	    this.on(EVENT_CHANGE, callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(EVENT_CHANGE, callback);
	  },
	  emitChange: function emitChange() {
	    this.emit(EVENT_CHANGE);
	  }
	});

	AppDispatcher.register(function (payload) {
	  var action = payload;
	  switch (action.actionType) {
	    case actionType.getOver:
	      return getOver(action.params);
	    case actionType.setToast:
	      return setToast(action.params);
	    case actionType.showLoading:
	      return showLoading(action.params);
	    case actionType.hideLoading:
	      return hideLoading(action.params);
	    default:
	      return true;
	  }
	});

	//改变Toast的参数
	function setToast(params) {
	  AppStoresForToast.data = {
	    data: params
	  };
	  AppStoresForToast.emitChange();
	}

	//出现loading
	function showLoading() {
	  AppStoresForToast.data = {
	    data: {
	      type: "loading",
	      style: {
	        'display': '-webkit-box'
	      }
	    }
	  };
	  AppStoresForToast.emitChange();
	}

	function hideLoading() {
	  AppStoresForToast.data = {
	    data: {
	      type: "loading",
	      style: {
	        'display': 'none'
	      }
	    }
	  };
	  AppStoresForToast.emitChange();
	}

	//点击抢完的按钮出文案
	function getOver(params) {
	  AppStoresForToast.data = {
	    data: {
	      style: { 'display': '-webkit-box' },
	      content: '抢完啦，坐等下次吧~'
	    }
	  };
	  AppStoresForToast.emitChange();
	}

	AppStoresForToast.initData = {
	  data: {
	    style: {
	      display: "none"
	    }
	  }
	};

	module.exports = AppStoresForToast;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Img = __webpack_require__(16);
	var AppActions = __webpack_require__(14);
	var AppActionsCommon = __webpack_require__(11);
	var lib = __webpack_require__(13);
	var Header = React.createClass({
		displayName: 'Header',

		setMainList: function setMainList(params) {
			var queryThing = {
				type: params.type
			};
			var headerText = document.querySelectorAll('.header-text');
			if (params.type == 'lost') {
				headerText[0].classList.remove('header-text-active');
				headerText[1].classList.add('header-text-active');
			} else if (params.type == 'found') {
				headerText[1].classList.remove('header-text-active');
				headerText[0].classList.add('header-text-active');
			}
			AppActions.setMainList({
				queryThing: queryThing,
				page: 1
			});
			AppActions.setFloorActiveId({ activeId: 0 });
		},
		showSelfCenter: function showSelfCenter(params) {
			var mainList = document.querySelector('.mainList');
			var AllComponents = document.querySelector('.AllComponents');
			var selfCenterWrap = document.querySelector('.self-center-wrap');
			var FloatFixed = document.querySelector('.FloatFixed');
			AllComponents.scrollTop = 0;
			mainList.classList.add('mainListforselfcenter');
			selfCenterWrap.classList.remove('hidden');
			setTimeout(function () {
				FloatFixed.classList.remove('hidden');
			}, 480);
			AppActions.selfCenter();
		},
		showPublish: function showPublish() {
			$.ajax({
				url: lib.returnHost() + 'graduationDesign/api/lostAndFound/isLogin',
				dataType: "jsonp",
				success: function success(data) {
					if (data && data.status == true) {
						AppActions.setPublish({ active: true });
					} else {
						AppActions.setLogin({ active: true });
					}
				},
				error: function error() {
					AppActionsCommon.setToast({
						title: "失物招领提示",
						content: "网络请求异常"
					});
				}
			});
		},
		render: function render() {
			var self = this;
			return React.createElement(
				'div',
				{ className: 'header' },
				React.createElement(
					'div',
					{ className: 'header-wrap' },
					React.createElement(
						'div',
						{ className: 'header-showl', onClick: this.showSelfCenter },
						React.createElement(Img, { src: '../build/img/btn_self.png', 'static': true, rname: 'img-box' })
					),
					React.createElement(
						'div',
						{ className: 'header-text header-text-active', onClick: function () {
								self.setMainList({ type: "found" });
							} },
						'已捡到'
					),
					React.createElement(
						'div',
						{ className: 'header-text', onClick: function () {
								self.setMainList({ type: "lost" });
							} },
						'已丢失'
					),
					React.createElement(
						'div',
						{ className: 'header-showr', onClick: this.showPublish },
						React.createElement(Img, { src: '../build/img/edit.png', 'static': true, rname: 'img-box' })
					)
				)
			);
		}

	});

	module.exports = Header;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Img = __webpack_require__(16);
	var List = __webpack_require__(28);
	var ListWrap = React.createClass({
		displayName: 'ListWrap',

		render: function render() {
			var img = this.props.img;
			var list = this.props.listData.list.map(function (data) {
				return React.createElement(List, { img: img, data: data });
			});
			return React.createElement(
				'div',
				{ className: 'list-wrap overflowScrolling' },
				list
			);
		}

	});

	module.exports = ListWrap;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Img = __webpack_require__(16);
	var Tag = __webpack_require__(20);
	var AppActions = __webpack_require__(14);
	var List = React.createClass({
		displayName: 'List',

		setSelfDetail: function setSelfDetail(params) {
			AppActions.setSelfDetail(params);
		},
		componentDidUpdate: function componentDidUpdate() {
			var img = this.props.img;
			img.fireLazyload();
		},
		render: function render() {
			var data = this.props.data;
			var tag = data && data.tags && data.tags.map(function (data) {
				return React.createElement(Tag, { data: data });
			});
			var self = this;
			return React.createElement(
				'div',
				{ className: 'list' },
				React.createElement(
					'div',
					{ className: 'list-in' },
					React.createElement(
						'div',
						{ className: 'list-head' },
						React.createElement(Img, { src: data.img || '../build/img/logo.png', 'static': data.img ? false : true, rname: 'p-pic' }),
						React.createElement(
							'div',
							{ className: 'p-name' },
							data.name
						),
						React.createElement(
							'div',
							{ className: 'p-time' },
							data.time && data.time.minute
						)
					),
					React.createElement(
						'div',
						{ className: 'list-content' },
						data.ttimg ? React.createElement(Img, { src: data.ttimg, rname: 'content-img' }) : React.createElement('div', null),
						React.createElement(
							'div',
							{ className: 'content-text-tag', onClick: function () {
									self.setSelfDetail({ ArticleID: data.ArticleID });
								} },
							React.createElement(
								'div',
								{ className: 'content-des' },
								data.des
							),
							React.createElement(
								'div',
								{ className: 'content-tag' },
								tag
							)
						)
					)
				)
			);
		}

	});

	module.exports = List;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppActions = __webpack_require__(14);
	var lib = __webpack_require__(13);
	var Img = __webpack_require__(16);
	var Tag = __webpack_require__(20);
	var twice = 1;
	var Detail = React.createClass({
		displayName: 'Detail',

		componentDidUpdate: function componentDidUpdate() {
			var detail = this.props.detail;
			var publish = this.props.publish;
			var mainList = document.querySelector('.mainList');
			if (detail && detail.active) {
				mainList.classList.add('mainListforDetail');
			} else if (!detail.active && !publish.active) {
				mainList.classList.remove('mainListforDetail');
			}
			if (twice < 3 && detail.active == true) {
				var img = this.props.img;
				img.fireLazyload();
				twice++;
			}
		},
		touchMove: function touchMove(e) {
			e.preventDefault();
		},
		back: function back() {
			AppActions.setSelfDetail({ back: true });
		},
		render: function render() {
			var detail = this.props.detail;
			var data = detail && detail.data || {};
			var self = this;
			var listTag = detail && detail.data && detail.data.tags && detail.data.tags.map(function (data) {
				return React.createElement(Tag, { data: data });
			});
			return React.createElement(
				'div',
				{ className: detail && detail.active ? "detail detail-act" : "detail" },
				React.createElement(
					'div',
					{ className: 'detail-wrap' },
					React.createElement(
						'div',
						{ className: 'detail-head' },
						React.createElement(
							'div',
							{ className: 'back', onClick: this.back },
							React.createElement('img', { src: '../build/img/btn_fanhui.png' })
						),
						React.createElement(
							'div',
							{ className: 'detail-text' },
							'详情页'
						)
					),
					React.createElement(
						'div',
						{ className: 'detail-content overflowScrolling' },
						React.createElement(
							'div',
							{ className: 'detail-c-p-message' },
							React.createElement(
								'div',
								{ className: 'detail-pp-img' },
								React.createElement('img', { src: data.img || "../build/img/logo.png" })
							),
							React.createElement(
								'div',
								{ className: 'nameanddate' },
								React.createElement(
									'div',
									{ className: 'name' },
									data.name
								),
								React.createElement(
									'div',
									{ className: 'time' },
									data.time && data.time.minute
								)
							)
						),
						React.createElement(
							'ul',
							{ className: 'detail-message' },
							React.createElement(
								'li',
								null,
								data.des
							),
							React.createElement(
								'li',
								null,
								'联系人：',
								data.name
							),
							React.createElement(
								'li',
								null,
								'手机号：',
								React.createElement(
									'a',
									{ href: "tel:" + data.phone },
									data.phone
								)
							),
							React.createElement(
								'li',
								null,
								'物品ID：',
								data.ArticleID
							)
						),
						React.createElement(
							'div',
							{ className: 'content-tags clear' },
							listTag
						),
						React.createElement(
							'div',
							{ className: 'detail-b-img' },
							data.ttimg ? React.createElement('img', { src: lib.returnHost() + data.ttimg }) : React.createElement('div', null)
						)
					)
				)
			);
		}

	});

	module.exports = Detail;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	var FloatFixed = React.createClass({
		displayName: 'FloatFixed',

		touchMove: function touchMove(e) {
			e.preventDefault();
		},
		hide: function hide(e) {
			var mainList = document.querySelector('.mainList');
			mainList.classList.remove('mainListforselfcenter');
			e.target.classList.add('hidden');
		},
		render: function render() {
			return React.createElement('div', { className: 'FloatFixed hidden', onClick: this.hide.bind(this), onTouchMove: this.touchMove.bind(this) });
		}

	});

	module.exports = FloatFixed;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppActions = __webpack_require__(14);
	var AppActionsCommon = __webpack_require__(11);
	var lib = __webpack_require__(13);
	var queryData = {}; //ttimg
	var timer = null;
	var Publish = React.createClass({
		displayName: 'Publish',

		componentDidUpdate: function componentDidUpdate() {
			var publish = this.props.publish;
			var detail = this.props.detail;
			var mainList = document.querySelector('.mainList');
			if (publish && publish.active) {
				mainList && mainList.classList.add('mainListforDetail');
			} else if (!detail.active && !publish.active) {
				mainList && mainList.classList.remove('mainListforDetail');
			}
		},
		submit: function submit(params) {
			if (!queryData || queryData.des == "描述......" || !queryData.des || !queryData.type || !queryData.itemType || !queryData.Ltime || !queryData.area) {
				AppActionsCommon.setToast({
					title: "失物招领提示",
					content: '请填写完整信息，再提交'
				});
			} else {
				AppActions.publish({
					data: queryData
				});
			}
		},
		componentDidMount: function componentDidMount() {
			//onfocus 和 onblur
			var text = document.querySelector('#text');
			text.addEventListener('focus', function () {
				this.style.border = "0";
				if (this.value == '描述......') {
					this.value = '';
				}
			}, false);

			text.addEventListener('blur', function () {
				if (this.value == '') {
					this.value = '描述......';
				}
			}, false);
		},
		touchMove: function touchMove(e) {
			e.preventDefault();
		},
		back: function back() {
			AppActions.setPublish({ active: false });
		},
		getDate: function getDate() {
			var date = new Date();
			var nowDate = date.getDate();
			var str = [];
			for (var i = 0; i < 8; i++) {
				date.setDate(nowDate - i);
				str.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
			}
			return str;
		},
		show: function show(params) {
			var className = params['class'];
			var id = params.id;
			var height = params.height;
			var jiantou = document.querySelector(className);
			var iHeight = document.querySelector(id);
			iHeight.classList.add(height);
			jiantou.classList.add('jiantouActive');
		},
		choose: function choose(params) {
			var chooseClass = params.chooseClass;
			var className = params['class'];
			var id = params.id;
			var height = params.height;
			var jiantou = document.querySelector(className);
			var iHeight = document.querySelector(id);
			var choose = document.querySelector(chooseClass);
			var type = params.type;
			var target = params.e.target;
			if (target.nodeName == 'LI') {
				jiantou.classList.remove('jiantouActive');
				iHeight.classList.remove(height);
				choose.innerHTML = target.innerHTML;
				if (type == "type" && choose.innerHTML == '丢失') {
					queryData[type] = "lost";
				} else if (type == "type" && choose.innerHTML == '捡到') {
					queryData[type] = "found";
				} else {
					queryData[type] = choose.innerHTML;
				}
			}
		},
		onTextChange: function onTextChange(params) {
			clearTimeout(timer);
			timer = setTimeout(function () {
				var target = params.ev.target;
				queryData.des = target.value;
			}, 200);
		},
		upLoad: function upLoad(ev) {
			var target = ev.target;
			if (target && target.files && target.files.length > 0) {
				var fileObj = target.files[0]; //获取文件对象
				var FileController = lib.returnHost() + "graduationDesign/api/lostAndFound/upload_file"; // 接收上传文件的后台地址
				// FormData 对象
				var form = new FormData();
				form.append("file", fileObj); // 文件对象
				// XMLHttpRequest 对象
				var xhr = new XMLHttpRequest();
				xhr.open("post", FileController, true);

				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							var response = xhr.responseText;
							var J_pzImg = document.querySelector("#J_pzImg");
							try {
								response = JSON.parse(response);
							} catch (ex) {
								console.log(ex);
							}
							J_pzImg.src = lib.returnHost() + response.url;
							queryData.ttimg = response.url;
							AppActionsCommon.setToast({
								title: '失物招领提示',
								type: 'toast',
								content: '上传成功'
							});
						}
					}
				};
				xhr.send(form);
			} else {
				AppActionsCommon.setToast({
					title: '失物招领提示',
					content: '请选择一个图片！'
				});
			}
		},
		render: function render() {
			var publish = this.props.publish;
			var self = this;
			var date = this.getDate();
			var left = '';
			var right = '';
			for (var i = 0; i < date.length; i++) {
				if (i % 2) {
					right += '<li>' + date[i] + '</li>';
				} else {
					left += '<li>' + date[i] + '</li>';
				}
			}

			return React.createElement(
				'div',
				{ className: publish && publish.active ? "publish publish-act" : "publish", onTouchMove: function (e) {
						self.touchMove(e);
					} },
				React.createElement(
					'div',
					{ className: 'publish-wrap' },
					React.createElement(
						'div',
						{ className: 'publish-head' },
						React.createElement(
							'div',
							{ className: 'back', onClick: this.back },
							React.createElement('img', { src: '../build/img/btn_fanhui.png' })
						),
						React.createElement(
							'div',
							{ className: 'publish-text' },
							'发布信息'
						),
						React.createElement(
							'div',
							{ className: 'publish-btn', onClick: this.submit },
							'提交'
						)
					),
					React.createElement(
						'div',
						{ className: 'intro' },
						React.createElement(
							'textarea',
							{ className: 'text', id: 'text', onChange: function (e) {
									self.onTextChange({ ev: e });
								} },
							'描述......'
						),
						React.createElement(
							'div',
							{ className: 'photo' },
							React.createElement(
								'div',
								{ className: 'photoKuang' },
								React.createElement('img', { src: '', id: 'J_pzImg' }),
								React.createElement(
									'div',
									{ className: 'content-uploadfile', style: { width: "1.6rem", height: "1.6rem", position: "absolute", zIndex: 999 } },
									React.createElement(
										'form',
										{ method: 'post', enctype: 'multipart/form-data' },
										React.createElement('input', { type: 'file', id: 'file', accept: 'image/*;capture=camera', style: { "width": "1.6rem", "height": "1.6rem", "opacity": 0, "border": 0 }, onChange: this.upLoad.bind(this) })
									)
								)
							),
							React.createElement(
								'p',
								{ className: 'addphoto' },
								'添加图片'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'fl fl1 mt', onClick: function () {
								self.show({ "class": '.fl1 .jiantou', "id": '#J_flMain0', "height": 'height1' });
							} },
						React.createElement(
							'p',
							{ className: 'fl-text' },
							'类别'
						),
						React.createElement('p', { className: 'choose' }),
						React.createElement(
							'div',
							{ className: 'jiantou' },
							React.createElement('img', { src: '../build/img/jt.png' })
						)
					),
					React.createElement(
						'i',
						{ className: 'fl-box', id: 'J_flMain0', onClick: function (e) {
								self.choose({ "type": 'type', 'chooseClass': '.fl1 .choose', "class": '.fl1 .jiantou', "id": "#J_flMain0", e: e, height: 'height1' });
							} },
						React.createElement(
							'div',
							{ className: 'fl-box-left' },
							React.createElement(
								'ul',
								null,
								React.createElement(
									'li',
									null,
									'丢失'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'fl-box-right' },
							React.createElement(
								'ul',
								null,
								React.createElement(
									'li',
									null,
									'捡到'
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'fl fl2 mt', onClick: function () {
								self.show({ "class": '.fl2 .jiantou', "id": '#J_flMain1', height: 'height2' });
							} },
						React.createElement(
							'p',
							{ className: 'fl-text' },
							'分类'
						),
						React.createElement('p', { className: 'choose' }),
						React.createElement(
							'div',
							{ className: 'jiantou' },
							React.createElement('img', { src: '../build/img/jt.png' })
						)
					),
					React.createElement(
						'i',
						{ className: 'fl-box', id: 'J_flMain1', onClick: function (e) {
								self.choose({ "type": 'itemType', 'chooseClass': '.fl2 .choose', "class": '.fl2 .jiantou', "id": "#J_flMain1", e: e, height: 'height2' });
							} },
						React.createElement(
							'div',
							{ className: 'fl-box-left' },
							React.createElement(
								'ul',
								{ id: 'left-fl' },
								React.createElement(
									'li',
									null,
									'电子产品'
								),
								React.createElement(
									'li',
									null,
									'办公用品'
								),
								React.createElement(
									'li',
									null,
									'各类卡'
								),
								React.createElement(
									'li',
									null,
									'雨伞'
								),
								React.createElement(
									'li',
									null,
									'钥匙'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'fl-box-right' },
							React.createElement(
								'ul',
								{ id: 'right-fl' },
								React.createElement(
									'li',
									null,
									'学习资料'
								),
								React.createElement(
									'li',
									null,
									'水杯'
								),
								React.createElement(
									'li',
									null,
									'衣服'
								),
								React.createElement(
									'li',
									null,
									'钱包'
								),
								React.createElement(
									'li',
									null,
									'其他'
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'fl fl3', onClick: function () {
								self.show({ "class": '.fl3 .jiantou', "id": '#J_flMain2', height: 'height3' });
							} },
						React.createElement(
							'p',
							{ className: 'fl-text' },
							'时间'
						),
						React.createElement('p', { className: 'choose' }),
						React.createElement(
							'div',
							{ className: 'jiantou' },
							React.createElement('img', { src: '../build/img/jt.png' })
						)
					),
					React.createElement(
						'i',
						{ className: 'fl-box', id: 'J_flMain2', onClick: function (e) {
								self.choose({ "type": 'Ltime', 'chooseClass': '.fl3 .choose', "class": '.fl3 .jiantou', "id": "#J_flMain2", e: e, height: 'height3' });
							} },
						React.createElement(
							'div',
							{ className: 'fl-box-left' },
							React.createElement('ul', { id: 'left-sj', dangerouslySetInnerHTML: { __html: left } })
						),
						React.createElement(
							'div',
							{ className: 'fl-box-right' },
							React.createElement('ul', { id: 'right-sj', dangerouslySetInnerHTML: { __html: right } })
						)
					),
					React.createElement(
						'div',
						{ className: 'fl fl4', onClick: function () {
								self.show({ "class": '.fl4 .jiantou', "id": '#J_flMain3', height: 'height4' });
							} },
						React.createElement(
							'p',
							{ className: 'fl-text' },
							'地点'
						),
						React.createElement('p', { className: 'choose' }),
						React.createElement(
							'div',
							{ className: 'jiantou' },
							React.createElement('img', { src: '../build/img/jt.png' })
						)
					),
					React.createElement(
						'i',
						{ className: 'fl-box', id: 'J_flMain3', onClick: function (e) {
								self.choose({ "type": 'area', 'chooseClass': '.fl4 .choose', "class": '.fl4 .jiantou', "id": "#J_flMain3", e: e, height: 'height4' });
							} },
						React.createElement(
							'div',
							{ className: 'fl-box-left' },
							React.createElement(
								'ul',
								{ id: 'left-dd' },
								React.createElement(
									'li',
									null,
									'教学区南一门'
								),
								React.createElement(
									'li',
									null,
									'生活区南一门'
								),
								React.createElement(
									'li',
									null,
									'运动场南一门'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'fl-box-right' },
							React.createElement(
								'ul',
								{ id: 'right-dd' },
								React.createElement(
									'li',
									null,
									'教学区南二门'
								),
								React.createElement(
									'li',
									null,
									'生活区南二门'
								),
								React.createElement(
									'li',
									null,
									'运动场南二门'
								)
							)
						)
					)
				)
			);
		}
	});

	module.exports = Publish;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppActions = __webpack_require__(14);
	var AppActionsCommon = __webpack_require__(11);
	var twice = 1;
	var Img = __webpack_require__(16);
	var timer = null;
	var timerPhone = null;
	var timerpassword = null;
	var loginArea = {};
	var Login = React.createClass({
		displayName: 'Login',

		touchmove: function touchmove(e) {
			e.preventDefault();
		},
		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			var loginPart = this.props.loginPart;
			if (twice < 3 && loginPart.active == true) {
				var img = this.props.img;
				clearTimeout(timer);
				timer = setTimeout(function () {
					img.fireLazyload();
					twice++;
				}, 500);
			}
		},
		back: function back() {
			AppActions.setLogin({
				active: false
			});
		},
		phone: function phone(ev) {
			clearTimeout(timerPhone);
			timerPhone = setTimeout(function () {
				loginArea.phone = ev.target.value;
			}, 100);
		},
		password: function password(ev) {
			clearTimeout(timerpassword);
			timerpassword = setTimeout(function () {
				loginArea.password = ev.target.value;
			}, 100);
		},
		setRegister: function setRegister(params) {
			AppActions.setRegister({
				active: true
			});
		},
		goLogin: function goLogin() {
			if (!loginArea || !loginArea.phone || !loginArea.password) {
				AppActionsCommon.setToast({
					title: '失物招领提示',
					content: '请正确填写手机号码和密码！'
				});
			} else {
				var loginPart = this.props.loginPart;
				loginArea.selfcenter = loginPart.selfcenter;
				AppActions.goLogin(loginArea);
			}
		},
		render: function render() {
			var loginPart = this.props.loginPart;
			return React.createElement(
				'div',
				{ className: loginPart.active ? "loginpart loginpartAct" : "loginpart", onTouchMove: this.touchmove.bind(this) },
				React.createElement(
					'div',
					{ className: 'loginpart-wrap' },
					React.createElement(
						'div',
						{ className: 'loginpart-head' },
						React.createElement(
							'div',
							{ className: 'back', onClick: this.back },
							React.createElement('img', { src: '../build/img/close.png' })
						),
						React.createElement(
							'div',
							{ className: 'loginpart-text' },
							'登录'
						)
					),
					React.createElement(
						'div',
						{ className: 'part-l' },
						React.createElement(Img, { src: '../build/img/logo.png', 'static': true, rname: 'part-logo' }),
						React.createElement(
							'div',
							{ className: 'login-input' },
							React.createElement(
								'div',
								{ className: 'login-input-wrap' },
								React.createElement(
									'div',
									{ className: 'loging-phone' },
									React.createElement(Img, { src: '../build/img/icon_shoujihao.png', 'static': true, rname: 'phone-img' }),
									React.createElement('input', { className: 'part-input', type: 'text', onChange: this.phone, placeholder: '请输入手机号' })
								),
								React.createElement(
									'div',
									{ className: 'login-password' },
									React.createElement(Img, { src: '../build/img/icon_mimaqueren.png', 'static': true, rname: 'password-img' }),
									React.createElement('input', { className: 'part-input', type: 'password', onChange: this.password.bind(this), placeholder: '请输入密码' })
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'login-reg-btn' },
							React.createElement(
								'div',
								{ className: 'login-reg-btn-wrap' },
								React.createElement(
									'div',
									{ className: 'login-btn', onClick: this.goLogin },
									'登录'
								),
								React.createElement(
									'div',
									{ className: 'reg-btn', onClick: this.setRegister },
									'注册'
								)
							)
						)
					)
				)
			);
		}

	});

	module.exports = Login;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppActions = __webpack_require__(14);
	var AppActionsCommon = __webpack_require__(11);
	var Img = __webpack_require__(16);
	var timer = null;
	var regData = {};
	var twice = 1;
	var Register = React.createClass({
		displayName: 'Register',

		touchMove: function touchMove(e) {
			e.preventDefault();
		},
		back: function back() {
			AppActions.setRegister({
				active: false
			});
		},
		register: function register() {
			if (regData.password != regData.passwordagin) {
				AppActionsCommon.setToast({
					title: '失物招领提示',
					content: '两次密码不一致！'
				});
			} else if (!regData.name || !regData.phone || !regData.password || !regData.passwordagin) {
				AppActionsCommon.setToast({
					title: '失物招领提示',
					content: '请补充完整注册信息！'
				});
			} else {
				AppActions.register(regData);
			}
		},
		reg: function reg(params) {
			clearTimeout(timer);
			timer = setTimeout(function () {
				var ele = params.ev.target;
				var type = params.type;
				regData[type] = ele.value;
			}, 200);
		},
		componentDidUpdate: function componentDidUpdate() {
			var register = this.props.register;
			if (twice < 3 && register.active == true) {
				var img = this.props.img;
				img.fireLazyload();
				twice++;
			}
		},
		render: function render() {
			var register = this.props.register;
			var self = this;
			return React.createElement(
				'div',
				{ className: register.active ? "register register-act" : "register", onTouchMove: this.touchMove.bind(this) },
				React.createElement(
					'div',
					{ className: 'register-wrap' },
					React.createElement(
						'div',
						{ className: 'register-head' },
						React.createElement(
							'div',
							{ className: 'back', onClick: this.back },
							React.createElement('img', { src: '../build/img/btn_fanhui.png' })
						),
						React.createElement(
							'div',
							{ className: 'register-text' },
							'注册'
						)
					),
					React.createElement(
						'div',
						{ className: 'part-r' },
						React.createElement(
							'div',
							{ className: 'reg-input' },
							React.createElement(
								'div',
								{ className: 'reg-input-wrap' },
								React.createElement(
									'div',
									{ className: 'reg-phone' },
									React.createElement(Img, { src: '../build/img/icon_nicheng.png', 'static': true, rname: 'phone-img' }),
									React.createElement('input', { className: 'part-input', type: 'text', placeholder: '请设置昵称', onChange: function (ev) {
											self.reg({ type: "name", ev: ev });
										} })
								),
								React.createElement(
									'div',
									{ className: 'reg-password' },
									React.createElement(Img, { src: '../build/img/icon_shoujihao.png', 'static': true, rname: 'password-img' }),
									React.createElement('input', { className: 'part-input', type: 'text', placeholder: '请输入手机号码', onChange: function (ev) {
											self.reg({ type: "phone", ev: ev });
										} })
								),
								React.createElement(
									'div',
									{ className: 'reg-phone' },
									React.createElement(Img, { src: '../build/img/icon_mimaqueren.png', 'static': true, rname: 'phone-img' }),
									React.createElement('input', { className: 'part-input', type: 'password', placeholder: '请输入密码', onChange: function (ev) {
											self.reg({ type: "password", ev: ev });
										} })
								),
								React.createElement(
									'div',
									{ className: 'reg-password' },
									React.createElement(Img, { src: '../build/img/icon_mimaqueren.png', 'static': true, rname: 'password-img' }),
									React.createElement('input', { className: 'part-input', type: 'password', placeholder: '请再次输入密码', onChange: function (ev) {
											self.reg({ type: "passwordagin", ev: ev });
										} })
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'regBtn', onClick: this.register },
						'注册'
					)
				)
			);
		}

	});

	module.exports = Register;

/***/ }
/******/ ]);