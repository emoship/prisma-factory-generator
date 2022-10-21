"use strict";
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
var _sdk = require("@prisma/sdk");
var _relation = require("../relation");
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
var accessTokenModel;
var postModel;
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
            case 7:
            case "end":
                return _ctx.stop();
        }
    }, _callee);
})));
test('get relation field', function() {
    var models = dmmf.datamodel.models;
    var userRelationFields = (0, _relation).getRelationFields(userModel, models);
    expect(userRelationFields.sort()).toEqual([
        'posts',
        'accessToken'
    ].sort());
    var accessTokenRelationFields = (0, _relation).getRelationFields(accessTokenModel, models);
    expect(accessTokenRelationFields).toStrictEqual([
        'user'
    ]);
    var postRelationFields = (0, _relation).getRelationFields(postModel, models);
    expect(postRelationFields).toStrictEqual([
        'user'
    ]);
});
test('has required relation', function() {
    var models = dmmf.datamodel.models;
    var userHasRequiredRelation = (0, _relation).hasRequiredRelation(userModel, models);
    expect(userHasRequiredRelation).toBeFalsy();
    var accessTokenHasRequiredRelation = (0, _relation).hasRequiredRelation(accessTokenModel, models);
    expect(accessTokenHasRequiredRelation).toBeTruthy();
    var postHasRequiredRelation = (0, _relation).hasRequiredRelation(postModel, models);
    expect(postHasRequiredRelation).toBeTruthy();
});
