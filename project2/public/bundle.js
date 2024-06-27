/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "renderUsersAndMessages": () => (/* binding */ renderUsersAndMessages)
/* harmony export */ });
function renderLoginForm(state) {
  return "\n    <div class=\"main-login\">\n    <form action=\"/login\" method=\"POST\" class=\"login\">\n      <label class=\"login-label\">\n        <span class=\"login-span\">username</span>\n        <input name=\"username\" class=\"username\">\n        <span class=\"empty-span\"></span>\n        <span class=\"username-error\">".concat(state.loginErrMessage, "</span>\n      </label>\n      <button type=\"submit\" class=\"login-button\">Login</button>\n    </form>\n    </div>");
}
function renderMessages(state) {
  return "\n    <div class=\"main-messages\">\n      <div class=\"users-messages\">\n      </div>\n      <div class=\"input-message\">\n        <form action=\"/api/message\" method=\"POST\" class=\"send-message\">\n          <label class=\"form__label\">\n            <span class=\"message-user\"></span>\n            <input name=\"text\" class=\"text\">\n          </label>\n          <button type=\"submit\">Send</button>\n        </form>\n      </div>\n    </div>\n    <form class=\"logout\" action=\"/logout\" method=\"POST\">\n      <button type=\"submit\">Logout</button>\n    </form>";
}
function renderUsersList(state) {
  return "<div class=\"users\"><p>Current Users:</p>" + Object.values(state.users).map(function (user) {
    return "\n    <p class=\"user\">".concat(user, "</p>\n    ");
  }).join('') + "</div>";
}
function renderMessagesList(state) {
  return "<div class=\"messages\">" + Object.values(state.messages).map(function (message) {
    return "\n    <p class=\"message\"><span class=\"message-username\">".concat(message.username, ":</span> ").concat(message.text, "</p>\n    ");
  }).join('') + "</div>";
}
function renderUsersAndMessages(state) {
  var messageUserEl = document.querySelector('.message-user');
  messageUserEl.innerHTML = state.username;
  var usersMessagesEl = document.querySelector('.users-messages');
  usersMessagesEl.innerHTML = renderUsersList(state) + renderMessagesList(state);
  var usersEl = document.querySelector('.users');
  usersEl.scrollTop = usersEl.scrollHeight;
  var messagesEl = document.querySelector('.messages');
  messagesEl.scrollTop = messagesEl.scrollHeight;
}
function render(mainEl, state) {
  if (!state.isLogin) {
    mainEl.innerHTML = renderLoginForm(state);
  } else {
    mainEl.innerHTML = renderMessages(state);
  }
}


/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLogin": () => (/* binding */ checkLogin),
/* harmony export */   "getMessages": () => (/* binding */ getMessages),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "sendMessage": () => (/* binding */ sendMessage)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.js");

function checkLogin(mainEl, state) {
  return fetch('/api/session/', {
    method: 'GET',
    credentials: "same-origin"
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      if (response.status === 401) {
        state.isLogin = false;
        (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)(mainEl, state);
      } else {
        return response.json().then(function (err) {
          return Promise.reject(err);
        });
      }
    } else {
      state.isLogin = true;
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)(mainEl, state);
      getMessages(state);
    }
  });
}
function login(mainEl, state, username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      state.isLogin = false;
      if (response.status === 400) {
        state.loginErrMessage = "Invalid username. Username must only contain letters, numbers and underline.";
      } else if (response.status === 403) {
        state.loginErrMessage = "Wrong password. Please re-enter your password.";
      } else {
        return response.json().then(function (err) {
          return Promise.reject(err);
        });
      }
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)(mainEl, state);
    } else {
      state.isLogin = true;
      state.loginErrMessage = "";
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)(mainEl, state);
      getMessages(state);
    }
  });
}
function logout(mainEl, state) {
  return fetch('/api/session/', {
    method: 'DELETE',
    credentials: "same-origin"
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    state.isLogin = false;
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)(mainEl, state);
  });
}
function getMessages(state) {
  return fetch('/api/message/', {
    method: 'GET',
    credentials: "same-origin"
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  }).then(function (data) {
    state.username = data.username;
    state.users = data.usersList;
    state.messages = data.messagesList;
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderUsersAndMessages)(state);
  });
}
function sendMessage(mainEl, state, text) {
  return fetch('/api/message/', {
    method: 'PUT',
    credentials: "same-origin",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      text: text
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  }).then(function (data) {
    state.username = data.username;
    state.users = data.usersList;
    state.messages = data.messagesList;
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.render)(mainEl, state);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderUsersAndMessages)(state);
  });
}


/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var state = {
  isLogin: false,
  username: "",
  messages: [],
  users: [],
  loginErrMessage: ""
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");


function refresh() {
  if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].isLogin) {
    console.log("refresh");
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.getMessages)(_state__WEBPACK_IMPORTED_MODULE_0__["default"]);
  }
}
var mainEl = document.querySelector('.main');
mainEl.addEventListener('submit', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('login')) {
    var usernameEl = document.querySelector('.username');
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.login)(mainEl, _state__WEBPACK_IMPORTED_MODULE_0__["default"], username);
  }
  if (e.target.classList.contains('logout')) {
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.logout)(mainEl, _state__WEBPACK_IMPORTED_MODULE_0__["default"]);
  }
  if (e.target.classList.contains('send-message')) {
    var textEl = document.querySelector('.text');
    var text = textEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.sendMessage)(mainEl, _state__WEBPACK_IMPORTED_MODULE_0__["default"], text);
  }
});
(0,_services__WEBPACK_IMPORTED_MODULE_1__.checkLogin)(mainEl, _state__WEBPACK_IMPORTED_MODULE_0__["default"]);
setInterval(refresh, 5000);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map