// #!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { MyApiStack } from '../lib/my-address-api-stack';

const app = new App();
new MyApiStack(app, 'MyApiStack');
