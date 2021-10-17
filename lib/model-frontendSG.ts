import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';


interface SecurityGroupProps {
    vpc: ec2.IVpc
}

export class ModelFrontendSG extends cdk.Construct {

    constructor(scope: cdk.Construct, id: string, props: SecurityGroupProps) {
        super(scope, id);

        const frontendServerSG = new ec2.SecurityGroup(this, 'Frontend-Server-SG', {
            vpc: props.vpc,
            allowAllOutbound: true,
            description: 'Security group for the frontend server'
        });

        frontendServerSG.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(22),
            'Allow SSH accees fron anywhere'
        );

        frontendServerSG.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(80),
            'Allow HTTP traffic fron anywhere'
        );

        frontendServerSG.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(443),
            'Allow HTTP traffic fron anywhere'
        );

    }
}