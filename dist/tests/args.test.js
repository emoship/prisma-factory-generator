"use strict";
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
var _sdk = require("@prisma/sdk");
var _args = require("../args");
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
var datamodel = "\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n  accessToken AccessToken?\n  posts Post[]\n\n  @@map(name: \"users\")\n}\n\nmodel AccessToken {\n  id        Int      @id @default(autoincrement())\n  user      User     @relation(fields: [userId], references: [id])\n  userId    Int      @unique @map(name: \"user_id\")\n  createdAt DateTime @default(now()) @map(name: \"created_at\")\n  isActive  Boolean  @default(false)\n\n  @@map(\"access_tokens\")\n}\n\nmodel Post {\n  id        Int       @id @default(autoincrement())\n  user      User      @relation(fields: [userId], references: [id])\n  userId    Int       @unique @map(name: \"user_id\")\n  body      String\n\n  @@map(\"posts\")\n}\n\nmodel Lecture {\n  id        Int       @id @default(autoincrement())\n  title     String\n}\n";
var dmmf;
var userModel;
var accessTokenModel;
var postModel;
var lectureModel;
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
                accessTokenModel = models[1];
                postModel = models[2];
                lectureModel = models[3];
            case 8:
            case "end":
                return _ctx.stop();
        }
    }, _callee);
})));
test('print type definition', function() {
    var models = dmmf.datamodel.models;
    var project = new _tsMorph.Project();
    var userSource = project.createSourceFile('tmp1');
    var userFactoryArgs = "\ntype UserFactoryArgs = Omit<Prisma.UserCreateArgs, 'data'> & {\n  data: Pick<Prisma.UserCreateInput, 'accessToken'|'posts'> & Partial<Omit<Prisma.UserCreateInput, 'accessToken'|'posts'>>\n}\n";
    (0, _args).args(userSource, userModel, models);
    expect(userSource.getFullText()).toEqual(userFactoryArgs);
    var accessTokenSource = project.createSourceFile('tmp2');
    var accessTokenArgs = "\ntype AccessTokenFactoryArgs = Omit<Prisma.AccessTokenCreateArgs, 'data'> & {\n  data: Pick<Prisma.AccessTokenCreateInput, 'user'> & Partial<Omit<Prisma.AccessTokenCreateInput, 'user'>>\n}\n";
    (0, _args).args(accessTokenSource, accessTokenModel, models);
    expect(accessTokenSource.getFullText()).toEqual(accessTokenArgs);
    var postSource = project.createSourceFile('tmp3');
    var postArgs = "\ntype PostFactoryArgs = Omit<Prisma.PostCreateArgs, 'data'> & {\n  data: Pick<Prisma.PostCreateInput, 'user'> & Partial<Omit<Prisma.PostCreateInput, 'user'>>\n}\n";
    (0, _args).args(postSource, postModel, models);
    expect(postSource.getFullText()).toEqual(postArgs);
    var lectureSource = project.createSourceFile('tmp4');
    var lectureArgs = "\ntype LectureFactoryArgs = Omit<Prisma.LectureCreateArgs, 'data'> & {\n  data: Partial<Prisma.LectureCreateInput>\n}\n";
    (0, _args).args(lectureSource, lectureModel, models);
    expect(lectureSource.getFullText()).toEqual(lectureArgs);
});
