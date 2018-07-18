# readiness
Performs a series of readiness checks for PSaaS environments as described at https://auth0.com/docs/appliance/infrastructure

# Overview
readiness runs as a systemd service and manages results from a set of plugins performing
checks for properties of the environment and system configuration. These checks include
but are not limited to properties such as disk size, available memory and network
connectivity.

# npm requirements
* http
* bunyan
* redis

# Signals
* **SIGHUP** reloads the configuration for the service/daemon
* **SIGTERM** terminates the service/daemon gracefully

# Configuration

## systemd
* user
* group
* installation location (where readiness.js and readiness.conf reside)
* log folder ?TODO: OR should this be in readiness.conf?

## readiness.conf
* number of simultaneous tests/checks
* logging
* report port
* plugin folder

