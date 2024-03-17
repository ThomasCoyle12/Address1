# AWS user address service

This is a serverless API to store user addresses and retrieve with
optinal suburb/post code filtering. This code leverages and is deployed
via AWS Cloud Development kit (CDK) and Node.js

# How to deploy code repository

### Make sure you have the following software installed on your system:
Git: For cloning and managing versions of the source code.
Node.js: The JavaScript runtime environment.
npm: The package manager for JavaScript, installed with Node.js.
AWS CLI: The AWS Command Line Interface to interact with AWS services.
AWS CDK: The AWS Cloud Development Kit to define cloud resources in code.
TypeScript: This project is developed using TypeScript and as such required.

Please follow these steps to inplement this API into AWS profile

1. Configure your AWS credentials on local machines for deployment to your AWS.
    - In your terminal enter 'aws configure'
    - followed by your 'AWS Access Key ID', 'AWS Secret Access Key' & region
2. Clone the repository to your local console
    -  In your terminal enter 'git clone https://github.com/ThomasCoyle12/Address1.git'
3. Create a new repository on github for this new version
    - Go to settings in your github repository/secrets and variables
    - Create new repository secret named 'AWS_ACCESS_KEY_ID' & 'AWS_SECRET_ACCESS_KEY'
    - DO NOT SHARE YOUR ACCESS KEYS WITH ANYONE OR HAVE IN PLAIN TEXT
4. Push the cloned code to your new GitHub repository.
    - Enter the following git commands
    - git init
    - git add .
    - git commit -m "New deploy"
    - git branch -M main
    - git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
    - git push -u origin main
    - The included CI/CD pipeline (ci.yaml and cd.yaml in the .github/workflows directory) 
      will automatically handle deployment to your AWS account when changes are pushed to the main branch.

## Potential future improvements
    - More secure endpoints needed with better authorisation
    - Better data validation required, with clearer messaging
    - More error handling for more HTTP codes
    - Potentially add conditional logic for userId as well to search for users with postcode/suburb 
    - More pre-tests before deployment with CI/CD pipeline/Currently only dynamo tested, get/add test would be good
