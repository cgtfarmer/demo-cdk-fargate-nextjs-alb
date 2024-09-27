import { User } from '@/backend/model/user';
import { UserRepository } from './user-repository';

export default class StaticUserRepository implements UserRepository {

  async findAll() {
    console.log('[UserRepository#findAll]');

    const users: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', age: 32, weight: 185.3, smoker: false },
      { id: 2, firstName: 'Jane', lastName: 'Doe', age: 31, weight: 142.7, smoker: false },
      { id: 3, firstName: 'Chad', lastName: 'Doe', age: 15, weight: 153.5, smoker: false },
    ];

    return users;
  }

  async findById(id: number) {
    console.log(`[UserRepository#findById] ${id}`);

    const user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 32,
      weight: 185.3,
      smoker: false
    };

    return user;
  }

  async create(user: User) {
    console.log(`[UserRepository#create] ${JSON.stringify(user)}`);

    user.id = 1;

    return user;
  }

  async update(user: User) {
    console.log(`[UserRepository#update] ${JSON.stringify(user)}`);

    return user;
  }

  async destroy(id: number) {
    console.log(`[UserRepository#destroy] ${id}`);
  }
}
