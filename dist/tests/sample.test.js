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
var datamodel = "\nmodel User {\n  id          Int          @id @default(autoincrement())\n  email       String       @unique\n  accessToken AccessToken?\n\n  @@map(name: \"users\")\n}\n\nmodel AccessToken {\n  id          Int       @id @default(autoincrement())\n  user        User      @relation(fields: [userId], references: [id])\n  userId      Int       @unique @map(name: \"user_id\")\n\n  @@map(\"access_tokens\")\n}\n";
// test('dmmf snapshot', async() => {
//   const dmmf = await getDMMF({ datamodel })
//   expect(dmmf).toMatchSnapshot()
// })
test('generate model', _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
    var project, sourceFile, dmmf;
    return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
        while(1)switch(_ctx.prev = _ctx.next){
            case 0:
                project = new _tsMorph.Project({
                });
                sourceFile = project.createSourceFile('./src/test-src.ts');
                _ctx.next = 4;
                return (0, _sdk).getDMMF({
                    datamodel: datamodel
                });
            case 4:
                dmmf = _ctx.sent;
                (0, _generator).addPrismaImportDeclaration(sourceFile);
                dmmf.datamodel.models.forEach(function(model) {
                    (0, _generator).addModelFactoryDeclaration(sourceFile, model, dmmf.datamodel.models);
                });
                sourceFile.formatText({
                    indentSize: 2,
                    semicolons: _tsMorph.ts.SemicolonPreference.Remove
                });
                expect(sourceFile.getFullText()).toMatchSnapshot();
            case 9:
            case "end":
                return _ctx.stop();
        }
    }, _callee);
})));
