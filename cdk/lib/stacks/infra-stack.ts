import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';

interface InfraStackProps extends StackProps {
}

export class InfraStack extends Stack {

  public readonly vpc: Vpc;

  public readonly ecsCluster: Cluster;

  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    this.vpc = new Vpc(this, 'Vpc', {
      maxAzs: 2,
    });

    this.ecsCluster = new Cluster(this, 'Cluster', {
      vpc: this.vpc,
    });
  }
}

