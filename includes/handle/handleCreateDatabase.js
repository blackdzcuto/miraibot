setInterval(function () {
  _0x1504e5();
}, 4000);
module.exports = function ({
  Users: _0x382c04,
  Threads: _0x255cea,
  Currencies: _0x525de8
}) {
  const _0x4cd0d6 = require("../../utils/log.js");
  return async function ({
    event: _0x3e044d
  }) {
    const {
      allUserID: _0x394de3,
      allCurrenciesID: _0x1795ce,
      allThreadID: _0x2c2830,
      userName: _0x3a9b1f,
      threadInfo: _0x1a1523
    } = global.data;
    const {
      autoCreateDB: _0x1c7de9
    } = global.config;
    if (_0x1c7de9 == false) {
      return;
    }
    var {
      senderID: _0x7b6bbb,
      threadID: _0x55b744
    } = _0x3e044d;
    _0x7b6bbb = String(_0x7b6bbb);
    var _0x55b744 = String(_0x55b744);
    try {
      if (!_0x2c2830.includes(_0x55b744) && _0x3e044d.isGroup == true) {
        const _0x3b5217 = await _0x255cea.getInfo(_0x55b744);
        const _0x3874d6 = {
          threadName: _0x3b5217.threadName,
          adminIDs: _0x3b5217.adminIDs,
          nicknames: _0x3b5217.nicknames
        };
        const _0x261f17 = _0x3874d6;
        _0x2c2830.push(_0x55b744);
        _0x1a1523.set(_0x55b744, _0x261f17);
        const _0x510970 = {
          threadInfo: _0x261f17,
          data: {}
        };
        await _0x255cea.setData(_0x55b744, _0x510970);
        for (singleData of _0x3b5217.userInfo) {
          _0x3a9b1f.set(String(singleData.id), singleData.name);
          try {
            if (global.data.allUserID.includes(String(singleData.id))) {
              await _0x382c04.setData(String(singleData.id), {
                name: singleData.name
              });
              global.data.allUserID.push(singleData.id);
            } else {
              await _0x382c04.createData(singleData.id, {
                name: singleData.name,
                data: {}
              });
              global.data.allUserID.push(String(singleData.id));
              _0x4cd0d6(global.getText("handleCreateDatabase", "newUser", singleData.id), "[ DATABASE ]");
            }
          } catch (_0x327874) {
            console.log(_0x327874);
          }
          ;
        }
        _0x4cd0d6(global.getText("handleCreateDatabase", "newThread", _0x55b744), "[ DATABASE ]");
      }
      if (!_0x394de3.includes(_0x7b6bbb) || !_0x3a9b1f.has(_0x7b6bbb)) {
        const _0x34a8be = await _0x382c04.getInfo(_0x7b6bbb);
        const _0x4108c9 = {
          name: _0x34a8be.name
        };
        await _0x382c04.createData(_0x7b6bbb, _0x4108c9);
        _0x394de3.push(_0x7b6bbb);
        _0x3a9b1f.set(_0x7b6bbb, _0x34a8be.name);
        _0x4cd0d6(global.getText("handleCreateDatabase", "newUser", _0x7b6bbb), "[ DATABASE ]");
      }
      if (!_0x1795ce.includes(_0x7b6bbb)) {
        await _0x525de8.createData(_0x7b6bbb, {
          data: {}
        });
        _0x1795ce.push(_0x7b6bbb);
      }
      return;
    } catch (_0xf37372) {
      return console.log(_0xf37372);
    }
  };
};
