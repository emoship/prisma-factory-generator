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
var datamodel = "\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n  accessToken AccessToken?\n  posts Post[]\n\n  @@map(name: \"users\")\n}\n\nmodel AccessToken {\n  id        Int      @id @default(autoincrement())\n  user      User     @relation(fields: [userId], references: [id])\n  userId    Int      @unique @map(name: \"user_id\")\n  createdAt DateTime @default(now()) @map(name: \"created_at\")\n  isActive  Boolean  @default(false)\n\n  @@map(\"access_tokens\")\n}\n\nmodel Post {\n  id        Int       @id @default(autoincrement())\n  user      User      @relation(fields: [userId], references: [id])\n  userId    Int       @unique @map(name: \"user_id\")\n  body      String\n\n  @@map(\"posts\")\n}\n";
var dmmf;
var userModel;
var userInterfaceProperties;
var accessTokenModel;
var accessTokenInterfaceProperties;
var postModel;
var postInterfaceProperties;
beforeAll(_asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
    var models;
    return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
        while(1)switch(_ctx.prev = _ctx.next){
            case 0:
                _ctx.next = 2;
                return (0, _sdk).getDMMF({
                    datamodel: datamodel
                });
            case 2:
                dmmf = _ctx.sent;
                models = dmmf.datamodel.models;
                userModel = models[0];
                userInterfaceProperties = (0, _generator).getModelFactoryParameterInterfaceProperties(userModel, models);
                accessTokenModel = models[1];
                accessTokenInterfaceProperties = (0, _generator).getModelFactoryParameterInterfaceProperties(accessTokenModel, models);
                postModel = models[2];
                postInterfaceProperties = (0, _generator).getModelFactoryParameterInterfaceProperties(postModel, models);
            case 10:
            case "end":
                return _ctx.stop();
        }
    }, _callee);
})));
test('@id field is not generate', function() {
    expect(accessTokenInterfaceProperties.id).toBeUndefined();
});
test('@relation field is generate', function() {
    expect(accessTokenInterfaceProperties.user).toBeDefined();
    expect(accessTokenInterfaceProperties.user).toBe('Prisma.UserCreateNestedOneWithoutAccessTokenInput');
});
test('Scalar field is not generate', function() {
    expect(accessTokenInterfaceProperties.userId).toBeUndefined();
    expect(accessTokenInterfaceProperties.createdAt).toBeUndefined();
    expect(accessTokenInterfaceProperties.isActive).toBeUndefined();
});
test('optional @relation field is generate', function() {
    expect(userInterfaceProperties['accessToken?']).toBe('Prisma.AccessTokenCreateNestedOneWithoutUserInput');
});
test('list field is generate as optional', function() {
    expect(userInterfaceProperties['posts?']).toBe('Prisma.PostCreateNestedManyWithoutUserInput');
});
test('list reference field is generate', function() {
    expect(postInterfaceProperties['user']).toBe('Prisma.UserCreateNestedOneWithoutPostsInput');
});
test('snapshot', function() {
    var project = new _tsMorph.Project();
    var userInterfaceFile = project.createSourceFile('tmp1');
    var models = dmmf.datamodel.models;
    (0, _generator).addModelFactoryParameterInterface(userInterfaceFile, userModel, models);
    expect(userInterfaceFile.getText()).toMatchSnapshot();
    var accessToken = project.createSourceFile('tmp2');
    (0, _generator).addModelFactoryParameterInterface(accessToken, accessTokenModel, models);
    expect(accessToken.getText()).toMatchSnapshot();
}) // test('dmmf snapshot', async () => {
 //   const dmmf = await getDMMF({ datamodel })
 //   expect(dmmf).toMatchSnapshot()
 // })
;
