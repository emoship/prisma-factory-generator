"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addModelFactoryParameterType = addModelFactoryParameterType;
exports.addPrismaImportDeclaration = addPrismaImportDeclaration;
exports.getModelFactoryParameterInterfaceProperties = getModelFactoryParameterInterfaceProperties;
exports.addModelAttributeForFunction = addModelAttributeForFunction;
exports.addModelFactoryParameterInterface = addModelFactoryParameterInterface;
exports.getModelDefaultValueVariableInitializer = getModelDefaultValueVariableInitializer;
exports.addModelFactoryDeclaration = addModelFactoryDeclaration;
var _camelcase = _interopRequireDefault(require("camelcase"));
var _helper = require("./helper");
var _args = require("./args");
var _relation = require("./relation");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getModelFactoryParameterTypeName(model) {
    return (0, _camelcase).default([
        'create',
        model.name,
        'Args'
    ]);
}
function addModelFactoryParameterType(sourceFile, model) {
    sourceFile.addStatements("type ".concat(getModelFactoryParameterTypeName(model), " = ").concat(getModelFactoryParameterInterfaceName(model), " & Partial<Prisma.").concat((0, _camelcase).default([
        model.name,
        'CreateArgs'
    ], {
        pascalCase: true
    }), ">"));
}
function addPrismaImportDeclaration(sourceFile) {
    sourceFile.addImportDeclaration({
        moduleSpecifier: '@prisma/client',
        namedImports: [
            'PrismaClient'
        ]
    });
    sourceFile.addImportDeclaration({
        moduleSpecifier: '.prisma/client',
        namedImports: [
            'Prisma'
        ]
    });
    sourceFile.addImportDeclaration({
        moduleSpecifier: 'faker',
        namespaceImport: 'faker'
    });
    sourceFile.addStatements("const prisma = new PrismaClient()");
}
function getModelFactoryParameterInterfaceProperties(model, models) {
    return Object.fromEntries(model.fields.filter(function(field) {
        return field.kind === 'object';
    }).map(function(field) {
        var relationKind = field.isList ? 'many' : 'one';
        var isOptional = !field.isRequired || field.isList;
        var relationDest = models.find(function(m) {
            if (m.name === model.name) {
                return false;
            }
            return m.fields.find(function(f) {
                return f.relationName === field.relationName;
            });
        });
        if (!relationDest) {
            throw new Error("missing relation dest error, model: ".concat(model.name, ", field: ").concat(field.name));
        }
        var relationField = relationDest === null || relationDest === void 0 ? void 0 : relationDest.fields.find(function(f) {
            return f.relationName === field.relationName;
        });
        if (!relationField) {
            throw new Error('missing relation field error');
        }
        return [
            isOptional ? "".concat(field.name, "?") : field.name,
            "Prisma.".concat((0, _camelcase).default([
                relationKind === 'one' ? field.name : field.type.toString(),
                'CreateNested',
                relationKind,
                'Without',
                relationField.name,
                'Input', 
            ], {
                pascalCase: true
            })), 
        ];
    }));
}
function getModelFactoryParameterInterfaceName(model) {
    return (0, _camelcase).default([
        'RequiredParametersFor',
        model.name,
        'creation'
    ], {
        pascalCase: true
    });
}
function addModelAttributeForFunction(sourceFile, model) {
    sourceFile.addFunction({
        isExported: true,
        name: getAttributesForFunctionName(model),
        statements: function(writer) {
            writer.write('return').block(function() {
                var initializer = getModelDefaultValueVariableInitializer(model);
                Object.keys(getModelDefaultValueVariableInitializer(model)).map(function(key) {
                    writer.write("".concat(key, ": ").concat(initializer[key], ","));
                });
            });
        }
    });
}
function addModelFactoryParameterInterface(sourceFile, model, models) {
    var properties = getModelFactoryParameterInterfaceProperties(model, models);
    sourceFile.addInterface({
        name: getModelFactoryParameterInterfaceName(model),
        properties: Object.keys(properties).map(function(key) {
            return {
                name: key,
                type: properties[key]
            };
        })
    });
    return Object.keys(properties).some(function(key) {
        return !key.endsWith('?');
    });
}
function getModelDefaultValueVariableInitializer(model) {
    return Object.fromEntries(model.fields.filter(function(field) {
        return !field.isId;
    }).filter(function(field) {
        return field.kind === 'scalar';
    }).filter(function(field) {
        return !model.fields.find(function(it) {
            var ref;
            return (ref = it.relationFromFields) === null || ref === void 0 ? void 0 : ref.includes(field.name);
        });
    }).filter(function(field) {
        return !field.hasDefaultValue;
    }).map(function(field) {
        return [
            field.name,
            (0, _helper).fakerForField(field)
        ];
    }));
}
function getAttributesForFunctionName(model) {
    return (0, _camelcase).default([
        'inputsFor',
        model.name
    ]);
}
function addModelFactoryDeclaration(sourceFile, model, models) {
    var modelName = model.name;
    addModelAttributeForFunction(sourceFile, model);
    (0, _args).args(sourceFile, model, models);
    var isRequired = (0, _relation).hasRequiredRelation(model, models);
    sourceFile.addFunction({
        isExported: true,
        isAsync: true,
        name: (0, _camelcase).default([
            'create',
            modelName
        ]),
        parameters: [
            {
                name: isRequired ? 'args' : 'args?',
                type: "".concat((0, _args).factoryArgsTypeName(model))
            }, 
        ],
        statements: "\n      return await prisma.".concat((0, _camelcase).default(modelName), ".create({\n        ...args,\n        data: {\n          ...").concat(getAttributesForFunctionName(model), "(),\n          ...args?.data\n        },\n      })\n    ")
    });
}
