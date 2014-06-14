This is a demo implementation of CallPixels Results. See http://support.callpixels.com/callpixels-results/ for more
information.

# Prerequisites

## Ruby

Install Ruby 2.0.0 with either [rvm] for Mac/Linux or [windows installer] for Windows.

## Git

Git is the SCM used. Check out [this page][1] at Github.

## Amazon EB CLI Tools

Install Amazon's command line interface for Elastic Beanstalk by going to [Getting Started with EB] [2]
and following the instructions in Step 2.

## MaxMind

This app uses MaxMind for IP to Zip resolution. If you want to use this feature, you'll need a MaxMind account from
https://www.maxmind.com

# Setup

Using the terminal, run:

    git clone https://github.com/callpixels/results-demo-rails.git

    cd results-demo-rails

    bundle install

    bundle exec rake db:migrate

    bin/rails server

Now you can navigate to http://0.0.0.0:3000 to see the site. 

The default login and password for the /admin interface is admin@example.com / password1234.

## application.yml

This app uses the [figaro gem] to store ENV variables/secrets in YAML file config/application.yml. You'll need to
create your own application.yml and fill it in with the information below. Make sure you restart the server afterwards.

     # ENVIRONMENT VARIABLES
     DOMAIN: ""
     SENDER_EMAIL: ""
     MAILER_DOMAIN: ""
     SMTP_SERVER: ""
     SMTP_PORT: 0
     SMTP_USER: ""
     SMTP_PWD: ""
     CALLPIXELS_API_KEY: ""
     CALLPIXELS_CAMPAIGN_ID: 0
     CALLPIXELS_SHOW_KEY: ""
     CALLPIXELS_COMPANY_ID: 0
     AWS_ACCESS_KEY_ID: ""
     AWS_SECRET_KEY: ""
     DEVISE_SECRET_KEY: ""
     DEVISE_PEPPER: ""

## Add Targets

Add your targets via the admin interface. See http://support.callpixels.com/callpixels-results/ for more information
on using CallPixels Results.


# Making changes

Changes you make in the source will be automatically reloaded by the server running on your computer. Just
refresh your browser.

Once you're ready to commit, run:

    git commit -a -m "Summary of changes goes here"

# Deploying

Push your changes to EB by running:

    git aws.push

_If everything works, push your changes back to Github._

    git push

[rvm]:http://rvm.io
[windows installer]:http://rubyinstaller.org/downloads/
[1]:https://help.github.com/articles/set-up-git
[2]:http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-reference-get-started.html
[figaro gem]:https://github.com/laserlemon/figaro

# Landing Page Toggles

The hide and auto parameters allow you to toggle visibility of the "My choice" section, and to choose what happens
when they submit the form.

http://0.0.0.0:3000/?auto=call&hide=true    _Automatically call, Hide "my choice"_

http://0.0.0.0:3000/?auto=results           _Pre-select Results option_

http://0.0.0.0:3000/?auto=both&hide=true    _Auto call AND show CallPixels Results, Hide "my choice"_

# License

This project is licensed under the terms of the MIT license.