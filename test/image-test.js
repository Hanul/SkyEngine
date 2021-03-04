/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@hanul/el.js/el.js":
/*!*****************************************!*\
  !*** ./node_modules/@hanul/el.js/el.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst el = (tag, ...children) => {\r\n    let id;\r\n    const idIndex = tag.indexOf(\"#\");\r\n    if (idIndex !== -1) {\r\n        id = tag.substring(idIndex + 1);\r\n        tag = tag.substring(0, idIndex);\r\n        const cindex = id.indexOf(\".\");\r\n        if (cindex !== -1) {\r\n            id = id.substring(0, cindex);\r\n            tag += id.substring(cindex);\r\n        }\r\n    }\r\n    let className;\r\n    const classNameIndex = tag.indexOf(\".\");\r\n    if (classNameIndex !== -1) {\r\n        className = tag.substring(classNameIndex + 1).replace(/\\./g, \" \");\r\n        tag = tag.substring(0, classNameIndex);\r\n    }\r\n    if (tag === \"\") {\r\n        tag = \"div\";\r\n    }\r\n    const element = document.createElement(tag);\r\n    if (id !== undefined) {\r\n        element.id = id;\r\n    }\r\n    if (className !== undefined) {\r\n        element.className = className;\r\n    }\r\n    const fragment = new DocumentFragment();\r\n    for (const child of children) {\r\n        if (child !== undefined) {\r\n            if (typeof child === \"string\") {\r\n                const strs = child.split(\"\\n\");\r\n                for (const [index, str] of strs.entries()) {\r\n                    if (index > 0) {\r\n                        fragment.append(document.createElement(\"br\"));\r\n                    }\r\n                    fragment.append(str);\r\n                }\r\n            }\r\n            else if (child instanceof HTMLElement || child instanceof DocumentFragment) {\r\n                fragment.append(child);\r\n            }\r\n            else {\r\n                for (const [name, value] of Object.entries(child)) {\r\n                    if (value === undefined) {\r\n                        element.removeAttribute(name);\r\n                    }\r\n                    else if (typeof value === \"string\") {\r\n                        element.setAttribute(name, value);\r\n                    }\r\n                    else if (typeof value === \"function\") {\r\n                        element.addEventListener(name, (event) => {\r\n                            value(event, element);\r\n                        });\r\n                    }\r\n                    else if (name === \"style\") {\r\n                        el.style(element, value);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n    element.append(fragment);\r\n    return element;\r\n};\r\nel.fragment = (...children) => {\r\n    const fragment = new DocumentFragment();\r\n    fragment.append(...children);\r\n    return fragment;\r\n};\r\nel.append = (parent, ...children) => {\r\n    parent.append(...children.filter((c) => c !== undefined));\r\n};\r\nel.clone = (target) => {\r\n    return target.cloneNode(true);\r\n};\r\nel.resImage = (tag, src, ...children) => {\r\n    const src2x = src.substring(0, src.lastIndexOf(\".png\")) + \"@2x.png\";\r\n    const src3x = src.substring(0, src.lastIndexOf(\".png\")) + \"@3x.png\";\r\n    return el(tag, ...children, { src, srcSet: `${src2x} 2x, ${src3x} 3x` });\r\n};\r\nel.changeResImage = (target, src) => {\r\n    const src2x = src.substring(0, src.lastIndexOf(\".png\")) + \"@2x.png\";\r\n    const src3x = src.substring(0, src.lastIndexOf(\".png\")) + \"@3x.png\";\r\n    target.src = src;\r\n    target.srcset = `${src2x} 2x, ${src3x} 3x`;\r\n};\r\nel.faraway = (...targets) => {\r\n    for (const target of targets) {\r\n        if (target.dataset.originLeft === undefined) {\r\n            target.dataset.originPosition = target.style.position;\r\n            target.dataset.originLeft = target.style.left;\r\n            target.dataset.originTop = target.style.top;\r\n            target.style.position = \"fixed\";\r\n            target.style.left = \"-999999px\";\r\n            target.style.top = \"-999999px\";\r\n        }\r\n    }\r\n};\r\nel.bringback = (...targets) => {\r\n    for (const target of targets) {\r\n        if (target.dataset.originLeft !== undefined) {\r\n            target.style.position = target.dataset.originPosition;\r\n            target.style.left = target.dataset.originLeft;\r\n            target.style.top = target.dataset.originTop;\r\n            delete target.dataset.originPosition;\r\n            delete target.dataset.originLeft;\r\n            delete target.dataset.originTop;\r\n        }\r\n    }\r\n};\r\nel.empty = (target) => {\r\n    while (target.firstChild) {\r\n        target.removeChild(target.firstChild);\r\n    }\r\n};\r\nel.style = (target, style) => {\r\n    for (const [key, value] of Object.entries(style)) {\r\n        if (typeof value === \"number\" && key !== \"zIndex\" && key !== \"opacity\") {\r\n            target.style[key] = `${value}px`;\r\n        }\r\n        else {\r\n            target.style[key] = value;\r\n        }\r\n    }\r\n};\r\nel.distance = (target, position) => {\r\n    const left = position.left;\r\n    const top = position.top;\r\n    const rect = target.getBoundingClientRect();\r\n    const blLeft = rect.left;\r\n    const blTop = rect.top;\r\n    const trLeft = rect.right;\r\n    const trTop = rect.bottom;\r\n    if ((left >= blLeft && left <= trLeft) &&\r\n        (top >= blTop && top <= trTop)) {\r\n        return { rect, distance: 0 };\r\n    }\r\n    if ((left >= blLeft && left <= trLeft)) {\r\n        return { rect, distance: Math.min(Math.abs(top - blTop), Math.abs(top - trTop)) };\r\n    }\r\n    else if ((top >= blTop && top <= trTop)) {\r\n        return { rect, distance: Math.min(Math.abs(left - blLeft), Math.abs(left - trLeft)) };\r\n    }\r\n    else {\r\n        return {\r\n            rect, distance: Math.sqrt((Math.pow(Math.min(Math.abs(left - blLeft), Math.abs(left - trLeft)), 2)) +\r\n                (Math.pow(Math.min(Math.abs(top - blTop), Math.abs(top - trTop)), 2))),\r\n        };\r\n    }\r\n};\r\nel.fill = (templates, targetText, add) => {\r\n    let result = [];\r\n    for (const template of templates) {\r\n        if (typeof template === \"string\") {\r\n            const index = template.indexOf(targetText);\r\n            if (index !== -1) {\r\n                const first = template.substring(0, index);\r\n                if (first !== \"\") {\r\n                    result.push(first);\r\n                }\r\n                result.push(add);\r\n                result = result.concat(el.fill([template.substring(index + targetText.length)], targetText, add));\r\n            }\r\n            else {\r\n                result.push(template);\r\n            }\r\n        }\r\n        else {\r\n            result.push(template);\r\n        }\r\n    }\r\n    return result;\r\n};\r\nexports.default = el;\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./node_modules/@hanul/el.js/el.js?");

/***/ }),

/***/ "../eventcontainer/EventContainer.js":
/*!*******************************************!*\
  !*** ../eventcontainer/EventContainer.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass EventContainer {\r\n    constructor() {\r\n        this.eventMap = {};\r\n    }\r\n    on(eventName, eventHandler) {\r\n        if (this.eventMap[eventName] === undefined) {\r\n            this.eventMap[eventName] = [];\r\n        }\r\n        this.eventMap[eventName].push(eventHandler);\r\n    }\r\n    pass(target, eventName) {\r\n        target.on(eventName, (...params) => this.fireEvent(eventName, ...params));\r\n    }\r\n    off(eventName, eventHandler) {\r\n        if (eventHandler === undefined) {\r\n            delete this.eventMap[eventName];\r\n        }\r\n        else if (this.eventMap[eventName] !== undefined) {\r\n            const index = this.eventMap[eventName].indexOf(eventHandler);\r\n            if (index !== -1) {\r\n                this.eventMap[eventName].splice(index, 1);\r\n            }\r\n            if (this.eventMap[eventName].length === 0) {\r\n                delete this.eventMap[eventName];\r\n            }\r\n        }\r\n    }\r\n    async fireEvent(eventName, ...params) {\r\n        if (this.eventMap[eventName] !== undefined) {\r\n            for (const eventHandler of this.eventMap[eventName]) {\r\n                await eventHandler(...params);\r\n            }\r\n        }\r\n    }\r\n    delete() {\r\n        this.fireEvent(\"delete\");\r\n        this.eventMap = undefined;\r\n    }\r\n}\r\nexports.default = EventContainer;\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/../eventcontainer/EventContainer.js?");

/***/ }),

/***/ "../skynode/lib/BodyNode.js":
/*!**********************************!*\
  !*** ../skynode/lib/BodyNode.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst _1 = __webpack_require__(/*! . */ \"../skynode/lib/index.js\");\r\nclass BodyNode extends _1.DomNode {\r\n    constructor() {\r\n        super(document.body);\r\n    }\r\n}\r\nexports.default = new BodyNode();\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/../skynode/lib/BodyNode.js?");

/***/ }),

/***/ "../skynode/lib/DomNode.js":
/*!*********************************!*\
  !*** ../skynode/lib/DomNode.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst SkyNode_1 = __importDefault(__webpack_require__(/*! ./SkyNode */ \"../skynode/lib/SkyNode.js\"));\r\nclass DomNode extends SkyNode_1.default {\r\n    constructor(domElement) {\r\n        super();\r\n        this.domElement = domElement;\r\n        this.children = [];\r\n    }\r\n    add(node, index) {\r\n        super.add(node, index);\r\n        if (index !== undefined && index < this.children.length) {\r\n            this.domElement.insertBefore(node.domElement, this.children[index].domElement);\r\n        }\r\n        else {\r\n            this.domElement.append(node.domElement);\r\n        }\r\n    }\r\n    delete() {\r\n        this.domElement.remove();\r\n        super.delete();\r\n    }\r\n}\r\nexports.default = DomNode;\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/../skynode/lib/DomNode.js?");

/***/ }),

/***/ "../skynode/lib/SkyNode.js":
/*!*********************************!*\
  !*** ../skynode/lib/SkyNode.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst eventcontainer_1 = __importDefault(__webpack_require__(/*! eventcontainer */ \"../eventcontainer/EventContainer.js\"));\r\nconst skyutil_1 = __importDefault(__webpack_require__(/*! skyutil */ \"../skyutil/SkyUtil.js\"));\r\nclass SkyNode extends eventcontainer_1.default {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.children = [];\r\n    }\r\n    add(node, index) {\r\n        if (index !== undefined && index < this.children.length) {\r\n            this.children.splice(index, 0, node);\r\n        }\r\n        else {\r\n            this.children.push(node);\r\n        }\r\n        node.parent = this;\r\n    }\r\n    delete() {\r\n        super.delete();\r\n        if (this.parent !== undefined) {\r\n            skyutil_1.default.pull(this.parent.children, this);\r\n        }\r\n        for (const child of this.children) {\r\n            child.delete();\r\n        }\r\n        this.children = undefined;\r\n    }\r\n}\r\nexports.default = SkyNode;\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/../skynode/lib/SkyNode.js?");

/***/ }),

/***/ "../skynode/lib/index.js":
/*!*******************************!*\
  !*** ../skynode/lib/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BodyNode = exports.DomNode = exports.SkyNode = void 0;\r\nvar SkyNode_1 = __webpack_require__(/*! ./SkyNode */ \"../skynode/lib/SkyNode.js\");\r\nObject.defineProperty(exports, \"SkyNode\", ({ enumerable: true, get: function () { return __importDefault(SkyNode_1).default; } }));\r\nvar DomNode_1 = __webpack_require__(/*! ./DomNode */ \"../skynode/lib/DomNode.js\");\r\nObject.defineProperty(exports, \"DomNode\", ({ enumerable: true, get: function () { return __importDefault(DomNode_1).default; } }));\r\nvar BodyNode_1 = __webpack_require__(/*! ./BodyNode */ \"../skynode/lib/BodyNode.js\");\r\nObject.defineProperty(exports, \"BodyNode\", ({ enumerable: true, get: function () { return __importDefault(BodyNode_1).default; } }));\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/../skynode/lib/index.js?");

/***/ }),

/***/ "../skyutil/SkyUtil.js":
/*!*****************************!*\
  !*** ../skyutil/SkyUtil.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass SkyUtil {\r\n    static pull(array, ...removeList) {\r\n        for (const el of removeList) {\r\n            const index = array.indexOf(el);\r\n            if (index !== -1) {\r\n                array.splice(index, 1);\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.default = SkyUtil;\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/../skyutil/SkyUtil.js?");

/***/ }),

/***/ "./src/Screen.ts":
/*!***********************!*\
  !*** ./src/Screen.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst el_js_1 = __importDefault(__webpack_require__(/*! @hanul/el.js */ \"./node_modules/@hanul/el.js/el.js\"));\r\nconst skynode_1 = __webpack_require__(/*! @hanul/skynode */ \"../skynode/lib/index.js\");\r\nclass Screen extends skynode_1.DomNode {\r\n    constructor() {\r\n        super(el_js_1.default(\"canvas\"));\r\n        this.domElement;\r\n    }\r\n}\r\nexports.default = Screen;\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./src/Screen.ts?");

/***/ }),

/***/ "./test-src/image-test.ts":
/*!********************************!*\
  !*** ./test-src/image-test.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Screen_1 = __importDefault(__webpack_require__(/*! ../src/Screen */ \"./src/Screen.ts\"));\r\nconst skynode_1 = __webpack_require__(/*! @hanul/skynode */ \"../skynode/lib/index.js\");\r\nconst screen = new Screen_1.default();\r\nskynode_1.BodyNode.add(screen);\r\n\n\n//# sourceURL=webpack://@hanul/skyengine/./test-src/image-test.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./test-src/image-test.ts");
/******/ })()
;