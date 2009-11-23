/*
 * /me command for Talker (http://talkerapp.com)
 * Inserts a notice about your action
 *
 * License: MIT
 * Author: Quin Hoxie (qhoxie)
 */

(function() {
  plugin.command = 'me';
  plugin.usage = '/' + plugin.command;

  plugin.onCommand = function(event) {
    if (event.command === plugin.command) {
      var currentUser = Talker.getCurrentUser();
      var noticeEvent = {
        user: currentUser,
        type: 'notice',
        time: (new Date).getTime()
      };
      Talker.insertNotice(noticeEvent, ' * ' + currentUser.name + ' ' + event.args.join(' '));
      $('#msgbox').val('');
      var notice = Talker.getLastRow();
      $('.message p', notice).css({fontWeight: 'bold', color: '#7D3905', fontSize: '1.1em'});

      return false;
    }
  };
})();
