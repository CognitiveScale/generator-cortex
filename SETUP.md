# Once Per Machine Setup

## Set Up a Bluemix Account

1. Create a Bluemix account on https://console.bluemix.net
    1. Use your @cognitivescale.com email address
2. Ask the Cortex team to give you access to:
    * Account: **Cognitive Scale**  *(note the space)*
    * Region: **US South**
    * Cloud Foundry Org: **CognitiveScale**  *(note no space)*
    * Cloud Foundry Space: **cortex-cognitive-skills-dev**

→ Consider setting up your Bluemix CLI while you wait for necessary authorization

## Install the Bluemix CLI

1. Log into Bluemix console
2. Download the CLI: https://console.bluemix.net/openwhisk/learn/cli
3. Install the cloud functions plugin:   
```  
  % bx plugin install Cloud-Functions -r Bluemix  
```
4. (You need to wait for authorization now)
5. Log into the appropriate region and account:  
```    
    % bx login -a api.ng.bluemix.net -o CognitiveScale -s cortex-cognitive-skills-dev
    % bx target -c 8181f93cf3b742dbd2ab762ed301af3b
```  

### Sniff Test Against the Echo Function

```
% bx wsk action invoke /CognitiveScale_cortex-cognitive-skills-dev/cortex/echo_processor -i -r
```

Should return something like:

```  
  {
    "payload": {
        "error": "No key \"text\" found. Got: <type 'dict'>"
    }
  }
```

## Install the Cortex CLI

1. The CLI is currently distributed as source. Get the source:

    ```
    % git clone git@bitbucket.org:cognitivescale/cortex-cli.git
    ```

2. Follow the repo's [README.md](https://bitbucket.org/cognitivescale/cortex-cli)

## Install the Yeoman Generator for Cortex

1. The generator is currently distributed as source. Get the source:

    ```
    % git clone git@bitbucket.org:cognitivescale/generator-cortex.git
    ```

2. Link the source:
```
  % cd ~/projects/generator-cortex
  % npm link 
```

# Per Project Setup
    
## Prepare for Isolating Your Work

* Current skill development happens in a cross-tenant shared space.
* It is prudent to use some convention to identify your work from others' work.
* Current proposal is to prefix all cloud functions (lambdas) with a short project name (e.g. 'cba').
* Choose a such a name, and consider using the same for account name in tenant setup below.

## Create Tenant on Cortex

1. Ask for an invitation code from cortex development team. (You will use this during registration)
2. Create a tenant on cortex dev install: https://console.cortex-dev.insights.ai/
2. Register link
3. Fill in form and register
    * Use the invitation code
    * This is the tenant setup, not developer setup. Consider using a mailing list email address.
    * **Keep the administrator ID different from developers.**
        * CogScale engineers -- consider keeping @cognitivecloud.com address for admin users, and the @cognitivescale.com address for developer access
    * Users' ids are derived from their email addresses, so consider using something like `admin` for the administrative userid.
4. Re-login to ensure tenant setup completed.
       * Your password manager may have captured your email address as the login; that will not work. Instead, use the admin userid.

## Set up a Developer Account for Tenant

1. Use the left navigation to go to the **Users** section
2. Invite user -- invite yourself. Need to use a real email address.
3. Check email, and **copy** Register link
4. Open an incognito window -- or use another browser -- to open the link
5. Fill out the user registration, using a different email address from the administrative email
6. Ensure that your login works at https://docs.cortex-dev.insights.ai

## Install Cortex Studio

→ This only needs to be done once per machine, but is easiest once you have login credentials to Cortex.

1. Tutorials → Getting Started with Cortex Studio
2. Download studio
3. By default, studio is pointing the production install of cortex. Update this to point at the development install of cortex following the instructions on the download page.
4. Start studio, and log in using the developer credentials

## Configure Cortex CLI

1. Use the `configure` command:   
```
% cortex configure
```
4. Use the development install URL (https://api.cortex-dev.insights.ai)
5. Use the developer credentials you created [above](#set-up-a-developer-account-for-tenant)
6. Perform a quick check to make sure your configuration and credentials are correct:  
```
% cortex types describe cortex/Text  
```
