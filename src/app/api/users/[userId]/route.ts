import DependencyGraph from '@/backend/config/dependency-graph';
import UserController, { UserParams } from '@/backend/controller/user-controller';
// import { Context } from 'vm';

let userController: UserController;

export async function GET(request: Request, context: { params: UserParams }) {
// export async function GET(request: Request, context: Context) {
  return userController.show(request, context.params);
}

export async function PUT(request: Request, context: { params: UserParams }) {
  return userController.update(request, context.params);
}

export async function DELETE(request: Request, context: { params: UserParams }) {
  return userController.destroy(request, context.params);
}

DependencyGraph.getInstance()
  .then(e => userController = e.userController);
