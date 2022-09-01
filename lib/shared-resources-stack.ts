import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigtw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as codecommit from "aws-cdk-lib/aws-codecommit";

interface sharedStackProps extends StackProps {
    repositoryName: string;
    lambdaHandlerFunction: lambda.Function;
}
export class sharedResourcesStack extends Stack {
    public readonly urlOutput;
    constructor(scope: Construct, id: string, props: sharedStackProps) {
        super(scope, id, props);
        const backendFastapiServerless = codecommit.Repository.fromRepositoryName(this, "fastApiRepo", props.repositoryName);
        const restApi = new apigtw.LambdaRestApi(this, "restApi", {
            handler: props.lambdaHandlerFunction,
        });

        this.urlOutput = restApi.url
    }


}
