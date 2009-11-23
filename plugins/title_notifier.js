/*
 * Title Notifier for Talker (http://talkerapp.com)
 * Alerts of new messages in title while window is blurred.
 *
 * License: MIT
 * Author: Quin Hoxie (qhoxie)
 */

(function(){
  plugin.origTitle = document.title;
  plugin.newTitle = null;
  plugin.titleToggled = false;
  plugin.intervalID = null;

  plugin.toggleTitle = function() {
    if (plugin.newTitle === null) { return; }
    if (plugin.titleToggled) {
      plugin.titleOff();
    } else {
      plugin.titleOn();
    }
  };

  plugin.titleOn = function() {
    document.title = plugin.newTitle;
    plugin.titleToggled = true;
  };

  plugin.titleOff = function() {
    document.title = plugin.origTitle;
    plugin.titleToggled = false;
  };

  plugin.beginToggle = function() {
    if (plugin.intervalID !== null) { return; }
    plugin.intervalID = window.setInterval(plugin.toggleTitle, 3000);
  };

  plugin.endToggle = function() {
    if (plugin.intervalID === null) { return; }
    plugin.newTitle = null;
    plugin.titleOff();
    window.clearInterval(plugin.intervalID);
    plugin.intervalID = null;
  };

  plugin.onLoaded = function() {
    plugin.onBlur = function() {
      plugin.onMessageReceived = function(event){
        plugin.newTitle = event.user.name + " says " + event.content;
      };
      plugin.beginToggle();
    };

    plugin.onFocus = function() {
      plugin.endToggle();
      plugin.onMessageReceived = function(event) { }
    };
  };
})();
