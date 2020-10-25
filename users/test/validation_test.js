const assert = require('assert');
const User = require('../src/user');

describe('validating records', () => {
    it('requires a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;
        //const { message } = vlidationResult.errors.name;
        console.log("===>",message);

        assert(message === 'Name is required.')
    });
});