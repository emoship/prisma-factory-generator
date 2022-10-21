"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUser = createUser;
exports.createPost = createPost;
exports.createComment = createComment;
exports.commentDefaultVariables = exports.postDefaultVariables = exports.userDefaultVariables = void 0;
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
var _client = require("@prisma/client");
var _faker = _interopRequireDefault(require("faker"));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
var prisma = new _client.PrismaClient();
var userDefaultVariables = {
    email: _faker.default.name.title(),
    userName: _faker.default.name.title()
};
exports.userDefaultVariables = userDefaultVariables;
function createUser(args) {
    return _createUser.apply(this, arguments);
}
function _createUser() {
    _createUser = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(args) {
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    _ctx.next = 2;
                    return prisma.user.create({
                        data: _objectSpread({
                        }, userDefaultVariables, args)
                    });
                case 2:
                    return _ctx.abrupt("return", _ctx.sent);
                case 3:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return _createUser.apply(this, arguments);
}
var postDefaultVariables = {
    title: _faker.default.name.title(),
    body: _faker.default.name.title()
};
exports.postDefaultVariables = postDefaultVariables;
function createPost(args) {
    return _createPost.apply(this, arguments);
}
function _createPost() {
    _createPost = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(args) {
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    _ctx.next = 2;
                    return prisma.post.create({
                        data: _objectSpread({
                        }, postDefaultVariables, args)
                    });
                case 2:
                    return _ctx.abrupt("return", _ctx.sent);
                case 3:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return _createPost.apply(this, arguments);
}
var commentDefaultVariables = {
    body: _faker.default.name.title()
};
exports.commentDefaultVariables = commentDefaultVariables;
function createComment(args) {
    return _createComment.apply(this, arguments);
}
function _createComment() {
    _createComment = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(args) {
        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    _ctx.next = 2;
                    return prisma.comment.create({
                        data: _objectSpread({
                        }, commentDefaultVariables, args)
                    });
                case 2:
                    return _ctx.abrupt("return", _ctx.sent);
                case 3:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return _createComment.apply(this, arguments);
}
