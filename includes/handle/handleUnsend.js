module.exports = function ({
  api: _0x1e7ac8
}) {
  const _0x2fb7dc = "";
  return function ({
    event: _0x3edbc3
  }) {
    const {
      senderID: _0x41906b,
      type: _0x48749d,
      reaction: _0x31b317,
      messageID: _0x40f945
    } = _0x3edbc3;
    if (_0x48749d === "message_reaction" && _0x41906b == _0x1e7ac8.getCurrentUserID()) {
      if (_0x31b317 && (_0x2fb7dc === "" || _0x2fb7dc === _0x31b317)) {
        return _0x1e7ac8.unsendMessage(_0x40f945);
      }
    }
  };
};
