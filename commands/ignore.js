/*
 * /ignore command for Talker (http://talkerapp.com)
 * Allows you to ignore messages from a particular user
 *
 * License: MIT
 * Author: Quin Hoxie (qhoxie)
 */

(function() {
  plugin.command = 'ignore';
  plugin.usage = '/' + plugin.command;
  plugin.ignores = [];

  var fail = function(msg) {
    alert(msg);
    return false;
  };

  plugin.onCommand = function(event){
    if (event.command === plugin.command) {
      var userName = event.args[0];

      if (typeof userName !== 'string') {
        return fail('Invalid user');
      }
      if (Talker.getRoomUsernames().indexOf(userName) < 0) {
        return fail('User is not present');
      }

      plugin.ignores.push(userName);
      var noticeEvent = {
        user: Talker.getCurrentUser(),
        type: 'notice',
        time: (new Date).getTime()
      };
      Talker.insertNotice(noticeEvent, "Now ignoring " + userName);
      plugin.onMessageReceived = function(event) {
        if (plugin.ignores.indexOf(event.user.name) >= 0) { return false; }
      };

      $('#msgbox').val('');
      return false;
    }
  };
})();
