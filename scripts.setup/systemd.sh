#!/bin/sh

echo TODO: checking for auth0 readiness.service

# check that the user is root (via sudo ideally) since systemctl
# requires escalated priviliges 
# 
# check for the systemd configuration in /etc/auth0/readiness.service
# and if it already exists, these steps should not be performed since
# they have likely already been performed
# 

# TODO: this should attempt to copy the readiness.service file into
# its appropriate location

# reload systemctl to find new services
systemctl daemon-reload

# enable the newly created service
systemctl enable readiness

# run the service
systemctl start readiness

