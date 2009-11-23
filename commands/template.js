/*
 * PLUGIN_NAME for Talker (http://talkerapp.com)
 * DESCRIPTION
 *
 * License: LICENSE
 * Author: NAME
 */

(function() {
  plugin.command = 'PLUGIN_NAME';
  plugin.usage = '/' + plugin.command;

  plugin.onCommand = function(event){
    if (event.command === plugin.command) {
      // Implementation
      $('#msgbox').val('');
      return false;
    }
  };
})();
