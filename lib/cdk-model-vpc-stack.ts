import * as cdk from '@aws-cdk/core';
import { Tags } from '@aws-cdk/core';

import { ModelNetworking } from './model-networking';



export class CdkModelVpcStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Following creates a VPC based on properties passed on to 
    //custom constuct 'ModelNtworking' 
    const networkingStack = new ModelNetworking(this, 'ModelNetworkingConstruct', {
      cidr: '10.0.0.0/16',
      maxAzs: 1,
      natGateways: 1,
      cidrMask: 24
    });
      
     // Tags for networking construct
     Tags.of(networkingStack).add('Module', 'Networking');
  }
}
