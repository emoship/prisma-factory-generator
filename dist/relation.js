"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRelationFields = getRelationFields;
exports.hasRequiredRelation = hasRequiredRelation;
function getRelationFields(model, models) {
    return model.fields.filter(function(field) {
        return field.kind === 'object';
    }).map(function(field) {
        var relationKind = field.isList ? 'many' : 'one';
        var isOptional = !field.isRequired || field.isList;
        var relationDest = models.find(function(m) {
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
        return field.name;
    });
}
function hasRequiredRelation(model, models) {
    return model.fields.filter(function(field) {
        return field.kind === 'object';
    }).some(function(field) {
        return field.isRequired && !field.isList;
    });
}
