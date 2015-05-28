# tech.zalando.de

# Core Components

Gulp: Build and deployment script
Closure Compiler: Compiles javascript files. (requires Java 7 or higher)
SASS: CSS Preprocessor
Metalsmith: Static website generator
Docker: Containers for consistent runtime environments
NodeJS: Application server to trigger static website builds via webhooks

# Development

## Setup

1. Install npm packages `npm install`

2. Install Java 7 or higher (required by Google Closure)

3. Install the RST and MD converter tools with Pip and create an alias `rst2html`
   to match the Dockerized installation:

        sudo easy_install pip
        sudo pip install rst2html5
        sudo pip install markdown
        ln -s /usr/local/bin/rst2html5 /usr/local/bin/rst2html

   Make sure that you actually can run `rst2html` and `markdown_py` now. If you
   get a UTF-8 error, you may need to set the following environment variables:

        export LC_ALL=en_US.UTF-8
        export LANG=en_US.UTF-8

4. Copy and update the default config file `cp config.default.js config-ENV.js`
   (ENV needs to be replaced with the environment string, "dev", "qa" or "prod")

5. Edit the `config-ENV.js` file and fill in your credentials and configurations

6. Install Ruby (required by SASS)

7. run `gem install scss-lint`

8. (Optional/OSX only) Get terminal-notifier by `brew install terminal-notifier`
   from https://github.com/alloy/terminal-notifier to get notifications on
   failed `gulp watch` builds.

9. run `gulp`. The environment needs to be specified via the `-e` option or
   `TFOX_ENV` environment variable.

### Google Analytics config

Property IDs (to be set in config-ENV.js):

- Dev: `UA-62155512-1`
- QA: `UA-5362052-33`


# Deploying website

- To generate and deploy the static website from your local machine manually,
  run `gulp deploy`. The environment (dev/qa/prod) needs to be specified via
  the `-e` option or `TFOX_ENV` environment variable:

        gulp deploy -e dev
        TFOX_ENV=dev gulp deploy

- For AWS-deployed builds: When updating contents on prismic.io, a webhook
  on `POST /prismic-hook` triggers a new build of the public website through the
  integrated NodeJS application and the corresponding gulp `deploy` task.
