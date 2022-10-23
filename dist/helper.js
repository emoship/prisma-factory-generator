"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fakerForStringField = fakerForStringField;
exports.fakerForField = fakerForField;
var faker = _interopRequireWildcard(require("faker"));
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
function fakerForStringField(fieldName) {
    var nameFieldFakers = Object.keys(faker.name);
    if (nameFieldFakers.includes(fieldName)) {
        return "faker.name.".concat(fieldName, "()");
    }
    var internetFakers = Object.keys(faker.internet);
    if (internetFakers.includes(fieldName)) {
        return "faker.internet.".concat(fieldName, "()");
    }
    var addressFakers = Object.keys(faker.address);
    if (addressFakers.includes(fieldName)) {
        return "faker.address.".concat(fieldName, "()");
    }
    return 'faker.name.title()';
}
function fakerForField(field) {
    var fieldType = field.type;
    var fieldKind = field.kind;
    if (fieldType === 'String') {
        return fakerForStringField(field.name);
    }
    if (fieldType === 'Int' || fieldType === 'BigInt') {
        return 'faker.datatype.number()';
    }
    if (fieldType === 'Float') {
        return 'faker.datatype.float()';
    }
    if (fieldType === 'Decimal') {
        return 'faker.datatype.hexaDecimal()';
    }
    if (fieldType === 'DateTime') {
        return 'faker.datatype.datetime()';
    }
    if (fieldType === 'Boolean') {
        var ref;
        return (ref = field.default) !== null && ref !== void 0 ? ref : false;
    }
    if (fieldType === 'Json') {
        return '{}';
    }
    throw new Error("".concat(fieldType, " isn't support now. kind: ").concat(fieldKind));
}
