# How to Securely Use Secrets in AWS Lambda?

This repository showcases how to use the [Middy SSM Middleware](https://middy.js.org/docs/middlewares/ssm) to securely retrieve secrets from AWS SSM Parameter Store.

Make sure to create the referenced parameter in your AWS account before running the example:

`aws ssm put-parameter --name "/dev/service-a/secret-key" --type "SecureString" --value "my-super-secret-secret"`

It is referenced in this blog post: https://blog.jannikwempe.com/how-to-securely-use-secrets-in-aws-lambda
