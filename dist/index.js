#!/usr/bin/env node
"use strict";
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
var _generatorHelper = require("@prisma/generator-helper");
var _tsMorph = require("ts-morph");
var fs = _interopRequireWildcard(require("fs"));
var path = _interopRequireWildcard(require("path"));
var _generator = require("./generator");
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
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                    };
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
(0, _generatorHelper).generatorHandler({
    onManifest: function() {
        return {
            defaultOutput: 'node_modules/.prisma/factory',
            prettyName: 'Prisma Factory Generator'
        };
    },
    onGenerate: function(options) {
        return _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
            var ref, output, project, sourceFile, models, packageJsonTargetPath, pkgJson;
            return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                while(1)switch(_ctx.prev = _ctx.next){
                    case 0:
                        ;
                        output = (ref = options.generator.output) === null || ref === void 0 ? void 0 : ref.value;
                        if (!output) {
                            _ctx.next = 26;
                            break;
                        }
                        project = new _tsMorph.Project({
                            compilerOptions: {
                                declaration: true,
                                module: _tsMorph.ModuleKind.CommonJS
                            }
                        });
                        sourceFile = project.createSourceFile("".concat(output, "/index.ts"), undefined, {
                            overwrite: true
                        });
                        (0, _generator).addPrismaImportDeclaration(sourceFile);
                        models = options.dmmf.datamodel.models;
                        options.dmmf.datamodel.models.forEach(function(model) {
                            (0, _generator).addModelFactoryDeclaration(sourceFile, model, models);
                        });
                        sourceFile.formatText({
                            indentSize: 2,
                            semicolons: _tsMorph.ts.SemicolonPreference.Remove
                        });
                        _ctx.prev = 9;
                        _ctx.next = 12;
                        return fs.promises.mkdir(output, {
                            recursive: true
                        });
                    case 12:
                        _ctx.next = 14;
                        return sourceFile.emit();
                    case 14:
                        packageJsonTargetPath = path.join(output, 'package.json');
                        pkgJson = JSON.stringify({
                            name: '.prisma/client',
                            main: 'index.js',
                            types: 'index.d.ts'
                        }, null, 2);
                        _ctx.next = 18;
                        return fs.promises.writeFile(packageJsonTargetPath, pkgJson);
                    case 18:
                        _ctx.next = 24;
                        break;
                    case 20:
                        _ctx.prev = 20;
                        _ctx.t0 = _ctx["catch"](9);
                        console.error('Error: unable to write files for Prisma Factory Generator');
                        throw _ctx.t0;
                    case 24:
                        _ctx.next = 27;
                        break;
                    case 26:
                        throw new Error('No output was specified for Prisma Factory Generator');
                    case 27:
                    case "end":
                        return _ctx.stop();
                }
            }, _callee, null, [
                [
                    9,
                    20
                ]
            ]);
        }))();
    }
});
