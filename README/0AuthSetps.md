Please note that these instructions are subject to change as Google updates its platform and procedures. Always refer to the official Google documentation for the most accurate and up-to-date information.
1. **Create a New Project**
    - Visit the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
    - Create a new project and give it a name.

2. **Configure API & Services**
    - From the sidebar, click on "API & Services".
    - Visit the [API Dashboard](https://console.cloud.google.com/apis/dashboard).

3. **Set Up the Consent Screen**
    - Click on the [Consent Screen](https://console.cloud.google.com/apis/credentials/consent).
    - Choose "External" and click on "Create".
    - Fill in the details:
        - Name: Codexam
        - User Support Email: codexam@gmail.com
        - Developer Contact Information: maitysubham4041@gmail.com
    - Click on "Save and Continue". Skip the scope and click on "Save and Continue" again.
    - Add your email ID or another ID for the test user and save.
    - Review the summary of your app and click on "Back to Dashboard".

4. **Create OAuth Client ID**
    - Click on [Credentials](https://console.cloud.google.com/apis/credentials).
    - Click on "Create Credentials" and choose "OAuth client ID".
    - Choose "Web Application" and add the Redirect URIs ([https://developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)). Make sure not to use a forward slash (/) after the redirect URIs.
    - After creating the OAuth client ID, you will receive the client ID and client secret.

5. **Authorize APIs**
    - Visit the [OAuth Playground](https://developers.google.com/oauthplayground).
    - Input your own scope: https://mail.google.com.
    - Select the settings icon and click on "Use your own OAuth credentials". Input your client ID and client secret and click on "Close".
    - Click on "Authorize APIs" and select your account. Click on "Allow".
    - You will receive the refresh token and access token. Click on "Exchange authorization code for tokens".

