import DependencyGraph from '@/backend/config/dependency-graph';
import UserController from '@/backend/controller/user-controller';

let userController: UserController;

export async function GET(request: Request) {
  return userController.index(request);
}

export async function POST(request: Request) {
  return userController.create(request);
}

DependencyGraph.getInstance()
  .then(e => userController = e.userController);
