import { User } from '@/frontend/model/user';
import { UserClient } from './user-client';

export default class BackendUserClient implements UserClient {

  public async fetchAll() {
    const response = await fetch('/api/users', {
      method: 'GET'
    });

    if (!response.ok) {
      console.error(response);
      return [];
    }

    console.log(response);

    const responseBody: User[] = await response.json();

    console.log(`ResponseBody: ${JSON.stringify(responseBody)}`);
    return responseBody;
  };

  public async fetch(userId: number) {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error(response);
      return undefined;
    }

    console.log(response);

    const responseBody: User = await response.json();

    console.log(`ResponseBody: ${JSON.stringify(responseBody)}`);
    return responseBody;
  }

  public async create(user: User) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      console.error(response);
      return undefined;
    }

    const responseBody: User = await response.json();

    console.log(`ResponseBody: ${JSON.stringify(responseBody)}`);

    return responseBody;
  }

  public async update(user: User) {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      console.error(response);
      return undefined;
    }

    const responseBody: User = await response.json();

    console.log(`ResponseBody: ${JSON.stringify(responseBody)}`);

    return responseBody;
  }

  public async destroy(userId: number) {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      console.error(response);
      return false;
    }

    console.log(response);
    return true;
  }
}
