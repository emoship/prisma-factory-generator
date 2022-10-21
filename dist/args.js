"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.factoryArgsTypeName = factoryArgsTypeName;
exports.args = args;
var _camelcase = _interopRequireDefault(require("camelcase"));
var _relation = require("./relation");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function factoryArgsTypeName(model) {
    return (0, _camelcase).default([
        model.name,
        'factory',
        'args'
    ], {
        pascalCase: true
    });
}
function args(sourceFile, model, models) {
    var createArgsTypeName = (0, _camelcase).default([
        model.name,
        'create',
        'args'
    ], {
        pascalCase: true
    });
    var createInputTypeName = (0, _camelcase).default([
        model.name,
        'create',
        'input'
    ], {
        pascalCase: true
    });
    var relationFields = (0, _relation).getRelationFields(model, models);
    var hasRelationFields = relationFields.length > 0;
    var data = hasRelationFields ? "Pick<Prisma.".concat(createInputTypeName, ", '").concat(relationFields.join("'|'"), "'> & Partial<Omit<Prisma.").concat(createInputTypeName, ", '").concat(relationFields.join("'|'"), "'>>") : "Partial<Prisma.".concat(createInputTypeName, ">");
    sourceFile.addStatements("\ntype ".concat(factoryArgsTypeName(model), " = Omit<Prisma.").concat(createArgsTypeName, ", 'data'> & {\n  data: ").concat(data, "\n}"));
}
