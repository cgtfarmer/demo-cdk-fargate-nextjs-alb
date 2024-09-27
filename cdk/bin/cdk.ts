#!/usr/bin/env node

import { App, Environment } from 'aws-cdk-lib';
import { AppStack } from '../lib/stacks/app-stack';
import { InfraStack } from '../lib/stacks/infra-stack';

const sandboxEnv: Environment = {
  account: '',
  region: 'us-east-1'
};

const app = new App();

const infraStack = new InfraStack(app, 'InfraStack', {
  env: sandboxEnv
});

const appStack = new AppStack(app, 'AppStack', {
  env: sandboxEnv,
  vpc: infraStack.vpc,
  ecsCluster: infraStack.ecsCluster,
  fargateServiceDisabled: false
});
