import { Construct } from 'constructs';
import { CfnOutput, Duration, Size, Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { AwsLogDriverMode, Cluster, FargateService, FargateTaskDefinition, LogDrivers, Protocol, AssetImage } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancer, ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

interface AppStackProps extends StackProps {
  vpc: Vpc;

  ecsCluster: Cluster

  fargateServiceDisabled: boolean;
}

export class AppStack extends Stack {

  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const taskDefinition = new FargateTaskDefinition(this, 'TaskDef', {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    const appPort = 80;

    const healthCheckRoute = '/api/health';

    taskDefinition.addContainer('DefaultContainer', {
      image: AssetImage.fromAsset('../', {
        // References: Dockerfile "FROM (...) AS <target-name>"
        target: 'production',
      }),
      logging: LogDrivers.awsLogs({
        streamPrefix: 'cdk-demo-stream',
        mode: AwsLogDriverMode.NON_BLOCKING,
        maxBufferSize: Size.mebibytes(25),
        logRetention: RetentionDays.THREE_DAYS,
      }),
      portMappings: [ { hostPort: appPort, containerPort: appPort, protocol: Protocol.TCP, } ],
      healthCheck: {
        command: ['CMD-SHELL', `curl -f http://localhost:${appPort}${healthCheckRoute} || exit 1`],
        interval: Duration.seconds(30),
        retries: 3,
        startPeriod: Duration.seconds(15),
        timeout: Duration.seconds(5),
      },
      environment: {
        ENV: 'production',
        PORT: appPort.toString(),
      },
    });

    const fargateService = new FargateService(this, 'FargateService', {
      cluster: props.ecsCluster,
      taskDefinition: taskDefinition,
      assignPublicIp: false,
      desiredCount: props.fargateServiceDisabled ? 0 : 2,
      circuitBreaker: {
        enable: true,
        rollback: true
      },
      healthCheckGracePeriod: Duration.minutes(2),
    });

    const scalableTarget = fargateService.autoScaleTaskCount({
      minCapacity: props.fargateServiceDisabled ? 0 : 1,
      maxCapacity: props.fargateServiceDisabled ? 0 : 2,
    });

    scalableTarget.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 80,
    });

    const alb = new ApplicationLoadBalancer(this, 'ApplicationLoadBalancer', {
      vpc: props.vpc,
      internetFacing: true,
    });

    const listener = alb.addListener('AlbListener', { protocol: ApplicationProtocol.HTTP });

    listener.addTargets('ApiFargateTg', {
      protocol: ApplicationProtocol.HTTP,
      port: appPort,
      targets: [fargateService],
      healthCheck: {
        path: healthCheckRoute,
        interval: Duration.seconds(30),
        timeout: Duration.seconds(6),
        healthyThresholdCount: 5,
        unhealthyThresholdCount: 2,
      }
    });

    new CfnOutput(this, 'LbDnsName', {
      value: alb.loadBalancerDnsName,
      description: 'Load balancer DNS name',
    });
  }
}
