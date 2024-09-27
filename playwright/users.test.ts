import { test, expect } from '@playwright/test';
import PlaywrightUtils from './playwright-utils';
import { User } from '@/model/user';

test('retrieve users', async ({ request }) => {
  const response = await request.get('/api/users');

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(0);
});

test('create user', async ({ request }) => {
  const requestBody: User = {
    firstName: 'John',
    lastName: 'Doe',
    age: 32,
    weight: 185.3,
    smoker: false,
  };

  const response = await request.post('/api/users', { data: requestBody });

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();

  expect(responseBody.id).toBeGreaterThanOrEqual(0);
  expect(responseBody.firstName).toBe(requestBody.firstName);
  expect(responseBody.lastName).toBe(requestBody.lastName);
  expect(responseBody.age).toBe(requestBody.age);
  expect(responseBody.weight).toBe(requestBody.weight);
  expect(responseBody.smoker).toBe(requestBody.smoker);
});

test('retrieve user', async ({ request }) => {
  const createUserBody = await PlaywrightUtils.createDefaultUser(request);

  const newUserId = createUserBody.id;

  const getUserResponse = await request.get(`/api/users/${newUserId}`);

  expect(getUserResponse.ok()).toBeTruthy();

  const getUserBody = await getUserResponse.json();

  expect(getUserBody.id).toBe(newUserId);
});

test('update user', async ({ request }) => {
  const createUserBody = await PlaywrightUtils.createDefaultUser(request);

  const newFirstName = 'Test';

  const requestBody: User = {
    id: createUserBody.id,
    firstName: newFirstName,
    lastName: createUserBody.lastName,
    age: createUserBody.age,
    weight: createUserBody.weight,
    smoker: createUserBody.smoker,
  };

  const response = await request.put(`/api/users/${requestBody.id}`, { data: requestBody });

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();

  expect(Number(responseBody.id)).toBe(requestBody.id);
  expect(responseBody.firstName).toBe(requestBody.firstName);
  expect(responseBody.lastName).toBe(requestBody.lastName);
  expect(responseBody.age).toBe(requestBody.age);
  expect(responseBody.weight).toBe(requestBody.weight);
  expect(responseBody.smoker).toBe(requestBody.smoker);
});

test('destroy user', async ({ request }) => {
  const createUserBody = await PlaywrightUtils.createDefaultUser(request);

  const newUserId = createUserBody.id;

  const destroyUserResponse = await request.delete(`/api/users/${newUserId}`);

  expect(destroyUserResponse.ok()).toBeTruthy();

  const destroyUserBody = await destroyUserResponse.json();

  expect(destroyUserBody.message).toBe('Deleted successfully');
});
