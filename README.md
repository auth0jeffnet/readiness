# readiness
Performs a series of readiness checks for PSaaS environments as described at https://auth0.com/docs/appliance/infrastructure

# Overview
readiness runs as a systemd service and manages results from a set of plugins performing
checks for properties of the environment and system configuration. These checks include
but are not limited to properties such as disk size, available memory and network
connectivity.

# npm requirements - core
* http
* bunyan
* fs

# npm requirements - plugins
* diskusage (disk_check_slash.js)
* os (cpu_check.js)
* fs (mem_check_proc_meminfo.js)
* child_process (curl_check_updates_http.js)

# Service Control
## systemd
The preferred method for starting, reloading and stopping the service is through
the systemd interface (i.e. `systemctl start readiness` to start the service).

## Signals
While systemd should be used to control the service under normal circumstances,
signals can be issued directly to the process to perform various actions:
* **SIGTERM** terminates the service/daemon gracefully

# Configuration

## systemd
**WorkingDirectory**: the directory/folder where readiness.js resides
**ExecStart**: the full path of the Node.js executable and the readiness.js file

## readiness.js
* **report port (iPortNumber)**: the HTTP port for exposing the readiness results
* **plugin folder (sFolderNamePlugins)**: the absolute folder that contains the plugins
* **bunyan log file (sLogFileInfoLog)**: the log file for the bunyan log
* **loop delay time (iTimeInSecondsPluginLoop)**: the "sleep" time between polling intervals in milliseconds

# Plugins
A plugin architecture is used to extend the functionalty of the readiness checks.

## Plugin definition
To extend the readiness service with a Node.js plugin, these attributes and functions
should be exposed/exported by the plugin:
* **name**: this is the name associated to the key for the result data and should be unique
  for each plugin and associated result set
* **runPlugin(log,callback)**: this is the method readiness.js calls to request the
  check from a plugin

The plugin should provide a JSON response containing at least these attributes:
* **name**: this is the name associated to the key for the result data and should be unique
  for each plugin and associated result set
* **results**: the response of the check. This can be any format that can be embedded within
  the JSON value (such as text for /proc/meminfo, a buffer for wget, strings, etc.) since
  interpretation of these results will be handled differently depending upon their acquisition method

# Known Issues
* only Node.js plugins with a .js extension are handled (i.e. python files, bash
  scripts, etc. are not yet handled)
* plugins must expose the required interfaces otherwise the service will crash:
  * name
  * runPlugin()

# Future Enhancements
* **profiles**: create a set of configuration "profiles" that define the desired
  values for specific environments (minimum, recommended) and then
  applies these requirements against the determined readiness data
  values and then reports an overall "failed", "minimum" or
  "recommended"
* **rendering plugins**: create a plugin environment for different rendering methods
  using the readiness JSON data (HTML, text, XML, /proc/readiness, etc.)
* **tools plugins**: create a plugin environment for the underlying tools that can
  facilitate simpler plugin creation (i.e. create a plugin tool
  called networkConnectCheckTcp and the plugin would "include"
  this module, call the check with a URL and then return the results
  without requiring the user to create or copy code to perform a
  TCP connectivity check)
* **SIGHUP signal ** catch the SIGHUP signal to reload the configuration for the service/daemon
  and the plugins (since Node.js caches any "require"d file(s), any updates would appear
  to be running "old code" until the SIGHUP signal triggers clearing and reloading these,
  see https://github.com/lorenwest/node-config/issues/34 for more details)

