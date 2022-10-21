"use strict";
var _helper = require("../helper");
test('if field name is `lastName` then `faker.name.lastName`', function() {
    expect((0, _helper).fakerForStringField('lastName')).toBe('faker.name.lastName()');
});
test('if field name is `firstName` then `faker.name.firstName', function() {
    expect((0, _helper).fakerForStringField('firstName')).toBe('faker.name.firstName()');
});
test('if field name is `email` then `faker.internet.email`', function() {
    expect((0, _helper).fakerForStringField('email')).toBe('faker.internet.email()');
});
