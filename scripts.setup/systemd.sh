#!/bin/bash

echo checking for auth0 readiness.service

# check that the user is root (via sudo ideally) since systemctl
# requires escalated priviliges 
if [[ $EUID -ne 0 ]] ; then
   echo "This script must be run as root"
   # exit 1
fi

# 
# check for the systemd configuration in /etc/auth0/readiness.service
# and if it already exists, these steps should not be performed since
# they have likely already been performed
# 
# NOTE: this *CAN* be installed in userland as a user process by
# following the systemd/User guide at https://wiki.archlinux.org/index.php/Systemd/User
# and then referencing it with systemctl using the --user flag:
#     systemctl --user start readiness
#     systemctl --user enable myapp

# TODO: this should attempt to copy the readiness.service file into
# its appropriate location

# reload systemctl to find new services
systemctl daemon-reload

# enable the newly created service
systemctl enable readiness

# run the service
systemctl start readiness

