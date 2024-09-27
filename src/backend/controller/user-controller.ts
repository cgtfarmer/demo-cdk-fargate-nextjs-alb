import { User } from '@/backend/model/user';
import { UserRepository } from '@/backend/repository/user/user-repository';

export type UserParams = {
  userId: string
};

export default class UserController {

  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async index(request: Request) {
    console.log('[UserController#index]');

    const response = await this.userRepository.findAll();

    console.log(`Response: ${JSON.stringify(response)}`);
    return Response.json(response, { status: 200 });
  }

  async create(request: Request) {
    const data: User = await request.json();
    console.log(`[UserController#create] ${JSON.stringify(data)}`);

    const response = await this.userRepository.create(data);

    console.log(`Response: ${JSON.stringify(response)}`);
    return Response.json(response, { status: 201 });
  }

  async show(request: Request, params: UserParams) {
    const userId = params.userId;
    console.log(`[UserController#show] ${userId}`);

    const response = await this.userRepository.findById(Number(userId));

    console.log(`Response: ${JSON.stringify(response)}`);
    return Response.json(response, { status: 200 });
  }

  async update(request: Request, params: UserParams) {
    const userId = params.userId;
    const data: User = await request.json();
    console.log(`[UserController#update] ${userId}, ${JSON.stringify(data)}`);

    data.id = Number(userId);
    const response = await this.userRepository.update(data);

    console.log(`Response: ${JSON.stringify(response)}`);
    return Response.json(response, { status: 200 });
  }

  async destroy(request: Request, params: UserParams) {
    const userId = params.userId;
    console.log(`[UserController#destroy] ${userId}`);

    await this.userRepository.destroy(Number(userId));

    const response = { message: 'Deleted successfully' };

    console.log(`Response: ${JSON.stringify(response)}`);
    return Response.json(response, { status: 200 });
  }
}
