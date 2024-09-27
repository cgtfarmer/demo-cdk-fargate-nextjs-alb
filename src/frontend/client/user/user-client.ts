import { User } from "@/frontend/model/user";

export interface UserClient {
  fetchAll(): Promise<User[]>;

  fetch(userId: number): Promise<User | undefined>;

  create(user: User): Promise<User | undefined>;

  update(user: User): Promise<User | undefined>;

  destroy(userId: number): Promise<boolean>;
}
