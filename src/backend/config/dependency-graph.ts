import UserController from '@/backend/controller/user-controller';
import StaticUserRepository from '@/backend/repository/user/static-user-repository';
import { UserRepository } from '@/backend/repository/user/user-repository';

export default class DependencyGraph {

  private static singleton: DependencyGraph;

  public static async getInstance() {
    if (DependencyGraph.singleton) return DependencyGraph.singleton;

    const userRepository: UserRepository = new StaticUserRepository();

    const userController = new UserController(userRepository);

    DependencyGraph.singleton = new DependencyGraph(userController);

    return DependencyGraph.singleton;
  }

  constructor(public readonly userController: UserController) {
  }
}

// export default DependencyGraph.getInstance();
  // .then(() => console.log('Dependency graph initialized'));
