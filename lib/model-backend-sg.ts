import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';


interface SecurityGroupProps {
    vpc: ec2.IVpc
}

export class ModelBackendSG extends cdk.Construct {

    constructor(scope: cdk.Construct, id: string, props: SecurityGroupProps) {
        super(scope, id);

        const backendServerSG = new ec2.SecurityGroup(this, 'Frontend-Server-SG', {
            vpc: props.vpc,
            allowAllOutbound: true,
            description: 'Security group for the backend server'
        });
           
        
    }
}