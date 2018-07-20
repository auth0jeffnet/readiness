#!/bin/bash

echo disabling auth0 readiness.service

# check that the user is root (via sudo ideally) since systemctl
# requires escalated priviliges 
if [[ $EUID -ne 0 ]] ; then
   echo "This script must be run as root"
   # exit 1
fi


# check for the systemd configuration in /etc/auth0/readiness.service
# and if it does not exist, these steps should not be performed since
# they have likely already been performed
# 
# NOTE: this *CAN* be installed (and therefore uninstalled) in
# userland as a user process by following the
# systemd/User guide at https://wiki.archlinux.org/index.php/Systemd/User
# and then referencing it with systemctl using the --user flag:
#     systemctl --user stop readiness
#     systemctl --user disable readiness

# stop the service
systemctl stop readiness

# disable the service
systemctl disable readiness

