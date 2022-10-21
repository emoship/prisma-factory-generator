"use strict";
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
var _sdk = require("@prisma/sdk");
var _generator = require("../generator");
var _tsMorph = require("ts-morph");
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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var datamodel = "\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n\n  @@map(name: \"users\")\n  AccessToken AccessToken[]\n}\n\nmodel AccessToken {\n  id        Int      @id @default(autoincrement())\n  user      User     @relation(fields: [userId], references: [id])\n  userId    Int      @unique @map(name: \"user_id\")\n  createdAt DateTime @default(now()) @map(name: \"created_at\")\n  isActive  Boolean  @default(false)\n\n  @@map(\"access_tokens\")\n}\n";
var dmmf;
var userModel;
var accessTokenModel;
var initializer;
beforeAll(_asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
    return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
        while(1)switch(_ctx.prev = _ctx.next){
            case 0:
                _ctx.next = 2;
                return (0, _sdk).getDMMF({
                    datamodel: datamodel
                });
            case 2:
                dmmf = _ctx.sent;
                userModel = dmmf.datamodel.models[0];
                accessTokenModel = dmmf.datamodel.models[1];
                initializer = (0, _generator).getModelDefaultValueVariableInitializer(accessTokenModel);
            case 6:
            case "end":
                return _ctx.stop();
        }
    }, _callee);
})));
test('@id field is not generate', function() {
    expect(initializer.id).toBeUndefined();
});
test('@relation field is not generate', function() {
    expect(initializer.user).toBeUndefined();
});
test('@relation id field is not generate', function() {
    expect(initializer.userId).toBeUndefined();
});
test('set @default field is not generate', function() {
    expect(initializer.createdAt).toBeUndefined();
    expect(initializer.isActive).toBeUndefined();
});
test('snapshot', function() {
    var project = new _tsMorph.Project();
    var sourceFile = project.createSourceFile('tmp');
    (0, _generator).addModelAttributeForFunction(sourceFile, userModel);
    expect(sourceFile.getText()).toMatchSnapshot();
});
