## Creating an AWS Account
1. Go to [AWS Management Signin](https://aws.amazon.com/marketplace/management/signin)
2. Click on `Create a new account`
3. Enter your details:
    - Root user email: `Your email`
    - AWS account name: `Your name`
4. Verify your email
5. Set root user password: `Your password`
6. Choose `Personal` for Personal or professional
7. Enter your Full name: `Your name`
8. Choose Phone number
9. Enter Country code: `Your country code`
10. Enter Address: `Your address`
11. Provide your credit card details and click on `Verify`
12. Choose `Basic plan (free)` and click on `Continue`
13. Click on `Create account and continue`
14. Login with your email and password

## Creating an S3 Bucket
1. Go to this [link](https://s3.console.aws.amazon.com/s3/get-started?region=ap-south-1)
2. Click on `Create bucket`
3. Copy the bucket name and bucket region and paste it in your `.env` file

## Creating an IAM User and Policy
1. Search for `IAM` in the search bar and click on it
2. Click on `Policies` and then click on `Create policy`
3. Choose `Visual` and select `S3`, and then we will give few permissions to the user
    - For `Read`, select `GetObject`
    - For `Write`, select `PutObject` and `DeleteObject`
    - Click on `Review policy`
4. Click on the `Resources` and select the bucket name, so click on the specific bucket and then click on `Add ARNs` add the bucket name and click on `Add` then select any object from the bucket
5. Give the policy a name and description and then click on `Create policy`
6. Go to `Users` and click on `Add user` give username check on `Provide user access to AWS Management Console`
7. Select `I want to create an IAM user`
8. Give custom password and uncheck on `Require password reset`
9. Attach existing policies which we have created and then click on `Next`
10. Click on `Create user` and then download the csv file and then click on `Close`
11. Click on the user and then click on `Security credentials` and then click on `Generate access key` and choose other
12. Click on the `Create access key` and then download the csv file and then click on `Close`
13. Now you will see the access key id and secret access key

Finally, copy that access key id and secret access key and paste it in your `.env` file.