import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2';

import { ModelFrontendSG } from './model-frontendSG';

interface NetworkingProps {
    cidr: string,
    maxAzs: number
    natGateways: number,
    cidrMask: number
}


export class ModelNetworking extends cdk.Construct {

    public modelVPC: ec2.IVpc;
    public frontendServerSG: ec2.ISecurityGroup;

    constructor(scope: cdk.Construct, id: string, props: NetworkingProps) {
        super(scope, id);

        this.modelVPC = new ec2.Vpc(this, 'Model-VPC-POC', {
            cidr: props.cidr, //Networking props
            enableDnsHostnames: true,
            enableDnsSupport: true,
            maxAzs: props.maxAzs,  // Networking props
            natGateways: props.natGateways,  // Networking props
            subnetConfiguration: [
                {
                    cidrMask: props.cidrMask,
                    name: 'Model-VPC-PublicSubnet',
                    subnetType: ec2.SubnetType.PUBLIC

                },
                {
                    cidrMask: props.cidrMask,
                    name: 'Model-VPC-PrivateSubnet',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_NAT
                },
            ]
        });

        // Front-End Security Group
        const frontendServerSG = new ec2.SecurityGroup(this, 'Frontend-Server-SG', {
            vpc: this.modelVPC,
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

          // Back-End Security Group
        const backendServerSG = new ec2.SecurityGroup(this, 'Backend-SG', {
            vpc: this.modelVPC,
            allowAllOutbound: true,
            description: 'Security group for the backend server'
        });

          // Back-End Security Group - Traffic only allows from frontend SG
        backendServerSG.connections.allowFrom(
            new ec2.Connections({
                securityGroups: [frontendServerSG],
            }),
            ec2.Port.allTcp(),
            'Allow all traffic from frontend server SG'
        );

    }
}