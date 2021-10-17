import * as cdk from '@aws-cdk/core';

import { ModelNetworking } from './model-networking';



export class CdkModelVpcStack extends cdk.Stack {

  //public readonly modelVPC: ModelNetworking;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const modelVPC = new ModelNetworking(this, 'ModelNetworkingConstruct', {
      cidr: '10.0.0.0/16',
      maxAzs: 1,
      natGateways: 0,
      cidrMask: 24
    });

  }
}
