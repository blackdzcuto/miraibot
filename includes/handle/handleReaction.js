setInterval(function () {
  _0x3f7fe9();
}, 4000);
module.exports = function ({
  api: _0x2b97ac,
  models: _0x4be4ed,
  Users: _0x164b7b,
  Threads: _0x1b958f,
  Currencies: _0x5ace82
}) {
  return function ({
    event: _0x3e9681
  }) {
    const {
      handleReaction: _0x2fa341,
      commands: _0x370a40
    } = global.client;
    const {
      messageID: _0x597af2,
      threadID: _0x659a4a
    } = _0x3e9681;
    if (_0x2fa341.length !== 0) {
      const _0x38fbcc = _0x2fa341.findIndex(_0x5249a9 => _0x5249a9.messageID == _0x597af2);
      if (_0x38fbcc < 0) {
        return;
      }
      const _0x3e6d62 = _0x2fa341[_0x38fbcc];
      const _0x560deb = _0x370a40.get(_0x3e6d62.name);
      if (!_0x560deb) {
        return _0x2b97ac.sendMessage(global.getText("handleReaction", "missingValue"), _0x659a4a, _0x597af2);
      }
      try {
        var _0x323223;
        if (_0x560deb.languages && typeof _0x560deb.languages == "object") {
          _0x323223 = (..._0x515d2b) => {
            const _0x306bf6 = _0x560deb.languages || {};
            if (!_0x306bf6.hasOwnProperty(global.config.language)) {
              return _0x2b97ac.sendMessage(global.getText("handleCommand", "notFoundLanguage", _0x560deb.config.name), _0x659a4a, _0x597af2);
            }
            var _0x2ae598 = _0x560deb.languages[global.config.language][_0x515d2b[0]] || "";
            for (var _0x219046 = _0x515d2b.length; _0x219046 > 0; _0x219046--) {
              const _0x94a764 = RegExp("%" + _0x219046, "g");
              _0x2ae598 = _0x2ae598.replace(_0x94a764, _0x515d2b[_0x219046]);
            }
            return _0x2ae598;
          };
        } else {
          _0x323223 = () => {};
        }
        const _0x19dcfa = {
          api: _0x2b97ac,
          event: _0x3e9681,
          models: _0x4be4ed,
          Users: _0x164b7b,
          Threads: _0x1b958f,
          Currencies: _0x5ace82,
          handleReaction: _0x3e6d62,
          models: _0x4be4ed,
          getText: _0x323223
        };
        _0x560deb.handleReaction(_0x19dcfa);
        return;
      } catch (_0x4f2888) {
        return _0x2b97ac.sendMessage(global.getText("handleReaction", "executeError", _0x4f2888), _0x659a4a, _0x597af2);
      }
    }
  };
};
