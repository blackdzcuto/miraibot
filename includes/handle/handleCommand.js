module.exports = function ({
  api: _0xdba2d9,
  models: _0x49cfcc,
  Users: _0x3a5efe,
  Threads: _0x21ae7d,
  Currencies: _0x50a45f
}) {
  const _0xb6c6b4 = require("string-similarity");
  const _0x99f37f = _0x354e41 => _0x354e41.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const _0x57d0bd = require("../../utils/log.js");
  const _0x2eb7cf = require("moment-timezone");
  return async function ({
    event: _0x57ad2f
  }) {
    const _0x589e37 = Date.now();
    const _0x5d0100 = _0x2eb7cf.tz("Asia/Ho_Chi_minh").format("HH:MM:ss DD/MM/YYYY");
    const {
      allowInbox: _0x2280b6,
      PREFIX: _0x17b4b9,
      ADMINBOT: _0x548a55,
      DeveloperMode: _0xb333e8,
      adminOnly: _0xaa640a
    } = global.config;
    const {
      userBanned: _0x305f87,
      threadBanned: _0x6e06c8,
      threadInfo: _0x5d55d1,
      threadData: _0x4557cb,
      commandBanned: _0x4739ea
    } = global.data;
    const {
      commands: _0x476473,
      cooldowns: _0x239eee
    } = global.client;
    var {
      body: _0x2fc3dd,
      senderID: _0x3da466,
      threadID: _0x5631aa,
      messageID: _0x5c70ba
    } = _0x57ad2f;
    var _0x3da466 = String(_0x3da466);
    var _0x5631aa = String(_0x5631aa);
    const _0x3e2247 = _0x4557cb.get(_0x5631aa) || {};
    const _0x2db8e2 = new RegExp("^(<@!?" + _0x3da466 + ">|" + _0x99f37f(_0x3e2247.hasOwnProperty("PREFIX") ? _0x3e2247.PREFIX : _0x17b4b9) + ")\\s*");
    if (!_0x2db8e2.test(_0x2fc3dd)) {
      return;
    }
    if (_0x305f87.has(_0x3da466) || _0x6e06c8.has(_0x5631aa) || _0x2280b6 == false && _0x3da466 == _0x5631aa) {
      if (!_0x548a55.includes(_0x3da466.toString())) {
        if (_0x305f87.has(_0x3da466)) {
          const {
            reason: _0x2f0b42,
            dateAdded: _0x5380e2
          } = _0x305f87.get(_0x3da466) || {};
          return _0xdba2d9.sendMessage(global.getText("handleCommand", "userBanned", _0x2f0b42, _0x5380e2), _0x5631aa, async (_0x2ae267, _0x27b2e9) => {
            await new Promise(_0x415757 => setTimeout(_0x415757, 5000));
            return _0xdba2d9.unsendMessage(_0x27b2e9.messageID);
          }, _0x5c70ba);
        } else if (_0x6e06c8.has(_0x5631aa)) {
          const {
            reason: _0x5ecbd5,
            dateAdded: _0x1a5a44
          } = _0x6e06c8.get(_0x5631aa) || {};
          return _0xdba2d9.sendMessage(global.getText("handleCommand", "threadBanned", _0x5ecbd5, _0x1a5a44), _0x5631aa, async (_0x2f6bc2, _0x4a60a9) => {
            await new Promise(_0x4aef85 => setTimeout(_0x4aef85, 5000));
            return _0xdba2d9.unsendMessage(_0x4a60a9.messageID);
          }, _0x5c70ba);
        }
      }
    }
    const [_0x20977f] = _0x2fc3dd.match(_0x2db8e2);
    const _0x130b73 = _0x2fc3dd.slice(_0x20977f.length).trim().split(/ +/);
    commandName = _0x130b73.shift().toLowerCase();
    var _0x53b87c = _0x476473.get(commandName);
    if (!_0x53b87c) {
      var _0x5c43f9 = [];
      const _0x2881b2 = _0x476473.keys();
      for (const _0x551eed of _0x2881b2) {
        _0x5c43f9.push(_0x551eed);
      }
      const _0x2762f3 = _0xb6c6b4.findBestMatch(commandName, _0x5c43f9);
      if (_0x2762f3.bestMatch.rating >= 0.5) {
        _0x53b87c = client.commands.get(_0x2762f3.bestMatch.target);
      } else {
        return _0xdba2d9.sendMessage(global.getText("handleCommand", "commandNotExist", _0x2762f3.bestMatch.target), _0x5631aa);
      }
    }
    if (_0x4739ea.get(_0x5631aa) || _0x4739ea.get(_0x3da466)) {
      if (!_0x548a55.includes(_0x3da466)) {
        const _0x1aa59e = _0x4739ea.get(_0x5631aa) || [];
        const _0x56c884 = _0x4739ea.get(_0x3da466) || [];
        if (_0x1aa59e.includes(_0x53b87c.config.name)) {
          return _0xdba2d9.sendMessage(global.getText("handleCommand", "commandThreadBanned", _0x53b87c.config.name), _0x5631aa, async (_0xbe6797, _0x213058) => {
            await new Promise(_0x48cba1 => setTimeout(_0x48cba1, 5000));
            return _0xdba2d9.unsendMessage(_0x213058.messageID);
          }, _0x5c70ba);
        }
        if (_0x56c884.includes(_0x53b87c.config.name)) {
          return _0xdba2d9.sendMessage(global.getText("handleCommand", "commandUserBanned", _0x53b87c.config.name), _0x5631aa, async (_0x49f424, _0x536b07) => {
            await new Promise(_0x491e3d => setTimeout(_0x491e3d, 5000));
            return _0xdba2d9.unsendMessage(_0x536b07.messageID);
          }, _0x5c70ba);
        }
      }
    }
    if (_0x53b87c.config.commandCategory.toLowerCase() == "nsfw" && !global.data.threadAllowNSFW.includes(_0x5631aa) && !_0x548a55.includes(_0x3da466)) {
      return _0xdba2d9.sendMessage(global.getText("handleCommand", "threadNotAllowNSFW"), _0x5631aa, async (_0x22c7e0, _0x5a5d33) => {
        await new Promise(_0x436956 => setTimeout(_0x436956, 5000));
        return _0xdba2d9.unsendMessage(_0x5a5d33.messageID);
      }, _0x5c70ba);
    }
    var _0x43fb00;
    if (_0x57ad2f.isGroup == true) {
      try {
        _0x43fb00 = _0x5d55d1.get(_0x5631aa) || (await _0x21ae7d.getInfo(_0x5631aa));
        if (Object.keys(_0x43fb00).length == 0) {
          throw new Error();
        }
      } catch (_0x5a7497) {
        _0x57d0bd(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }
    }
    var _0x28c33d = 0;
    var _0x399858 = _0x5d55d1.get(_0x5631aa) || (await _0x21ae7d.getInfo(_0x5631aa));
    const _0x23a529 = _0x399858.adminIDs.find(_0x274dcd => _0x274dcd.id == _0x3da466);
    if (_0x548a55.includes(_0x3da466.toString())) {
      _0x28c33d = 2;
    } else if (!_0x548a55.includes(_0x3da466) && _0x23a529) {
      _0x28c33d = 1;
    }
    if (_0x53b87c.config.hasPermssion > _0x28c33d) {
      return _0xdba2d9.sendMessage(global.getText("handleCommand", "permssionNotEnough", _0x53b87c.config.name), _0x57ad2f.threadID, _0x57ad2f.messageID);
    }
    if (!client.cooldowns.has(_0x53b87c.config.name)) {
      client.cooldowns.set(_0x53b87c.config.name, new Map());
    }
    const _0x55685a = client.cooldowns.get(_0x53b87c.config.name);
    ;
    const _0x3769f7 = (_0x53b87c.config.cooldowns || 1) * 1000;
    if (_0x55685a.has(_0x3da466) && _0x589e37 < _0x55685a.get(_0x3da466) + _0x3769f7) {
      return _0xdba2d9.setMessageReaction("😼", _0x57ad2f.messageID, _0x57e170 => _0x57e170 ? _0x57d0bd("Đã có lỗi xảy ra khi thực thi setMessageReaction", 2) : "", true);
    }
    var _0x48476e;
    if (_0x53b87c.languages && typeof _0x53b87c.languages == "object" && _0x53b87c.languages.hasOwnProperty(global.config.language)) {
      _0x48476e = (..._0x537f3d) => {
        var _0x40122f = _0x53b87c.languages[global.config.language][_0x537f3d[0]] || "";
        for (var _0x489632 = _0x537f3d.length; _0x489632 > 0; _0x489632--) {
          const _0x4667d5 = RegExp("%" + _0x489632, "g");
          _0x40122f = _0x40122f.replace(_0x4667d5, _0x537f3d[_0x489632]);
        }
        return _0x40122f;
      };
    } else {
      _0x48476e = () => {};
    }
    try {
      const _0x52371e = {
        api: _0xdba2d9,
        event: _0x57ad2f,
        args: _0x130b73,
        models: _0x49cfcc,
        Users: _0x3a5efe,
        Threads: _0x21ae7d,
        Currencies: _0x50a45f,
        permssion: _0x28c33d,
        getText: _0x48476e
      };
      _0x53b87c.run(_0x52371e);
      _0x55685a.set(_0x3da466, _0x589e37);
      if (_0xb333e8 == true) {
        _0x57d0bd(global.getText("handleCommand", "executeCommand", _0x5d0100, commandName, _0x3da466, _0x5631aa, _0x130b73.join(" "), Date.now() - _0x589e37), "[ DEV MODE ]");
      }
      return;
    } catch (_0x4085b8) {
      return _0xdba2d9.sendMessage(global.getText("handleCommand", "commandError", commandName, _0x4085b8), _0x5631aa);
    }
  };
};
