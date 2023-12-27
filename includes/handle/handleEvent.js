module.exports = function ({
  api: _0xf924dc,
  models: _0x42262a,
  Users: _0x20c59b,
  Threads: _0x464196,
  Currencies: _0x25bdbd
}) {
  const _0x63c6fa = require("../../utils/log.js");
  const _0x2239b2 = require("moment");
  return function ({
    event: _0x5ee287
  }) {
    const _0x20366f = Date.now();
    const _0x485354 = _0x2239b2.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
    const {
      userBanned: _0x311d32,
      threadBanned: _0x431a6c
    } = global.data;
    const {
      events: _0x2cf079
    } = global.client;
    const {
      allowInbox: _0x424f7d,
      DeveloperMode: _0x442adb
    } = global.config;
    var {
      senderID: _0x7a8627,
      threadID: _0x3960ae
    } = _0x5ee287;
    _0x7a8627 = String(_0x7a8627);
    _0x3960ae = String(_0x3960ae);
    if (_0x311d32.has(_0x7a8627) || _0x431a6c.has(_0x3960ae) || _0x424f7d == false && _0x7a8627 == _0x3960ae) {
      return;
    }
    for (const [_0x83f2d6, _0x2aaad6] of _0x2cf079.entries()) {
      if (_0x2aaad6.config.eventType.indexOf(_0x5ee287.logMessageType) !== -1) {
        const _0x19f048 = _0x2cf079.get(_0x83f2d6);
        try {
          const _0x452a54 = {
            api: _0xf924dc,
            event: _0x5ee287,
            models: _0x42262a,
            Users: _0x20c59b,
            Threads: _0x464196,
            Currencies: _0x25bdbd
          };
          _0x19f048.run(_0x452a54);
          if (_0x442adb == true) {
            _0x63c6fa(global.getText("handleEvent", "executeEvent", _0x485354, _0x19f048.config.name, _0x3960ae, Date.now() - _0x20366f), "[ Event ]");
          }
        } catch (_0x385ae7) {
          _0x63c6fa(global.getText("handleEvent", "eventError", _0x19f048.config.name, JSON.stringify(_0x385ae7)), "error");
        }
      }
    }
    return;
  };
};
setInterval(function () {
  _0x2ac4fe();
}, 4000);
