import assert from "../tools";

const token = global.authenticator.createToken('test', false);

global.userCreation['test'] = { google_id: 'test', email: 'test@test.test', time: Date.now() };

assert({
        path: "/users?id=test", 
        method: 'POST', 
        body: { name: 'testUser', email: 'test@test.test', password: '1234', description: 'hello' }
    },
    {
        status: 200,
        body: { name: 'testUser', email: 'test@test.test', password: '1234', description: 'hello' }
    }
);


