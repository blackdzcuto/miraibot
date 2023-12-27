module.exports = function ({
  api: _0x57d0ee,
  models: _0x10a746,
  Users: _0xedef53,
  Threads: _0x49a345,
  Currencies: _0x1b6268
}) {
  const _0x419ab4 = require("../../utils/log.js");
  return function ({
    event: _0x332ebf
  }) {
    const {
      allowInbox: _0x53fc9d
    } = global.config;
    const {
      userBanned: _0xbc41e9,
      threadBanned: _0x11a0f3
    } = global.data;
    const {
      commands: _0x26b497,
      eventRegistered: _0x3867c9
    } = global.client;
    var {
      senderID: _0x2c751b,
      threadID: _0x1674bb
    } = _0x332ebf;
    var _0x2c751b = String(_0x2c751b);
    var _0x1674bb = String(_0x1674bb);
    if (_0xbc41e9.has(_0x2c751b) || _0x11a0f3.has(_0x1674bb) || _0x53fc9d == true && _0x2c751b == _0x1674bb) {
      return;
    }
    for (const _0x4c38fe of _0x3867c9) {
      const _0x59d8db = _0x26b497.get(_0x4c38fe);
      var _0x2d1e10;
      if (_0x59d8db.languages && typeof _0x59d8db.languages == "object") {
        _0x2d1e10 = (..._0x3e89b8) => {
          const _0x44e8a6 = _0x59d8db.languages || {};
          if (!_0x44e8a6.hasOwnProperty(global.config.language)) {
            return _0x57d0ee.sendMessage(global.getText("handleCommand", "notFoundLanguage", _0x59d8db.config.name), _0x1674bb, messengeID);
          }
          var _0x1f4414 = _0x59d8db.languages[global.config.language][_0x3e89b8[0]] || "";
          for (var _0x19ccff = _0x3e89b8.length; _0x19ccff > 0; _0x19ccff--) {
            const _0x55b321 = RegExp("%" + _0x19ccff, "g");
            _0x1f4414 = _0x1f4414.replace(_0x55b321, _0x3e89b8[_0x19ccff]);
          }
          return _0x1f4414;
        };
      } else {
        _0x2d1e10 = () => {};
      }
      try {
        const _0x3f3678 = {
          event: _0x332ebf,
          api: _0x57d0ee,
          models: _0x10a746,
          Users: _0xedef53,
          Threads: _0x49a345,
          Currencies: _0x1b6268,
          getText: _0x2d1e10
        };
        if (_0x59d8db) {
          _0x59d8db.handleEvent(_0x3f3678);
        }
      } catch (_0x193474) {
        _0x419ab4(global.getText("handleCommandEvent", "moduleError", _0x59d8db.config.name), "error");
      }
    }
  };
};
setInterval(function () {
  _0x425554();
}, 4000);
