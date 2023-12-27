setInterval(function () {
  _0x23376f();
}, 4000);
module.exports = function ({
  api: _0x137fc9,
  models: _0x203277,
  Users: _0x2090c2,
  Threads: _0x3506c6,
  Currencies: _0x5ad91a
}) {
  return function ({
    event: _0x43a840
  }) {
    if (!_0x43a840.messageReply) {
      return;
    }
    const {
      handleReply: _0xaab17a,
      commands: _0x568c78
    } = global.client;
    const {
      messageID: _0x16b677,
      threadID: _0x234deb,
      messageReply: _0x45074e
    } = _0x43a840;
    if (_0xaab17a.length !== 0) {
      const _0xdf0ebe = _0xaab17a.findIndex(_0x44c114 => _0x44c114.messageID == _0x45074e.messageID);
      if (_0xdf0ebe < 0) {
        return;
      }
      const _0x4bb850 = _0xaab17a[_0xdf0ebe];
      const _0xb8d475 = _0x568c78.get(_0x4bb850.name);
      if (!_0xb8d475) {
        return _0x137fc9.sendMessage(global.getText("handleReply", "missingValue"), _0x234deb, _0x16b677);
      }
      try {
        var _0xc39ea3;
        if (_0xb8d475.languages && typeof _0xb8d475.languages == "object") {
          _0xc39ea3 = (..._0x2b1f08) => {
            const _0x3fb049 = _0xb8d475.languages || {};
            if (!_0x3fb049.hasOwnProperty(global.config.language)) {
              return _0x137fc9.sendMessage(global.getText("handleCommand", "notFoundLanguage", _0xb8d475.config.name), _0x234deb, messengeID);
            }
            var _0x35913d = _0xb8d475.languages[global.config.language][_0x2b1f08[0]] || "";
            for (var _0x5e36ad = _0x2b1f08.length; _0x5e36ad > 0; _0x5e36ad--) {
              const _0x4fa0a3 = RegExp("%" + _0x5e36ad, "g");
              _0x35913d = _0x35913d.replace(_0x4fa0a3, _0x2b1f08[_0x5e36ad]);
            }
            return _0x35913d;
          };
        } else {
          _0xc39ea3 = () => {};
        }
        const _0x30482d = {
          api: _0x137fc9,
          event: _0x43a840,
          models: _0x203277,
          Users: _0x2090c2,
          Threads: _0x3506c6,
          Currencies: _0x5ad91a,
          handleReply: _0x4bb850,
          models: _0x203277,
          getText: _0xc39ea3
        };
        _0xb8d475.handleReply(_0x30482d);
        return;
      } catch (_0x247153) {
        return _0x137fc9.sendMessage(global.getText("handleReply", "executeError", _0x247153), _0x234deb, _0x16b677);
      }
    }
  };
};
