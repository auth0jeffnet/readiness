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

# Service Control
## systemd
The preferred method for starting, reloading and stopping the service is through
the systemd interface (i.e. `systemctl start readiness` to start the service).

## Signals
While systemd should be used to control the service under normal circumstances,
signals can be issued directly to the process to perform various actions:
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

# Enhancements
* **profiles**: create a set of configuration "profiles" that define the desired
  values for specific environments (minimum, recommended) and then
  use this data to apply these requirements against the determined
  values and then report an overall "failed", "minimum" or
  "recommended" based on the results from the readiness URL
* **rendering plugins**: create a plugin environment for different rendering methods
  using the readiness JSON data (HTML, text, XML, /proc/readiness, etc.)
* **tools plugins**: create a plugin environment for the underlying tools that can
  facilitate simpler plugin creation (i.e. create a plugin tool
  called networkConnectCheckTcp and the plugin would "include"
  this module, call the check with a URL and then return the results
  without requiring the user to create or copy code to perform a
  TCP connectivity check)

