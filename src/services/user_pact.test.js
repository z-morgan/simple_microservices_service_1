import request from 'supertest';
import server from '../index';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import path from 'node:path';
import UserService from './user.js'

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'service_1',
  provider: 'user_service',
});

const expectedUser = {
  userId: 1,
  username: "mimmy",
  touchedBy: [
    "user_service",
  ]
};
const EXPECTED_BODY = MatchersV3.like(expectedUser);

test('GET /user/:id response with a well-formed user', () => {
  provider
    .given('a user with userId = 1 exists')
    .uponReceiving('a request for the user with a userId of 1')
    .withRequest({
      method: 'GET',
      path: '/users/1',
      headers: {
        Accept: 'application/json',
      },
    })
    .willRespondWith({
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: EXPECTED_BODY,
    });

  return provider.executeTest(async (mockServer) => {
    const userService = new UserService(mockServer.url);
    const userRes = await userService.getUserById('1');
    const user = await userRes.json();
    expect(user).toEqual(expectedUser);
  });
});

afterAll(() => {
  server.close();
});