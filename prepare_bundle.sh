#!/usr/bin/env bash

. /opt/elasticbeanstalk/containerfiles/envvars
set -xe

cd $EB_CONFIG_APP_ONDECK

/usr/local/bin/bundle config build.nokogiri --use-system-libraries