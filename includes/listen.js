module.exports = function ({
  api,
  models
}) {
  const Users = require("./controllers/users")({
    models,
    api
  });
  const Threads = require("./controllers/threads")({
    models,
    api
  });
  const Currencies = require("./controllers/currencies")({
    models
  });
  const logger = require("../utils/log.js");

  //////////////////////////////////////////////////////////////////////
  //========= Push all variable from database to environment =========//
  //////////////////////////////////////////////////////////////////////
  (async function () {
    try {
      logger(global.getText("listen", "startLoadEnvironment"), "[ DATABASE ]");
      let _0x3d7d55 = await Threads.getAll();
      let _0xaf495c = await Users.getAll(["userID", "name", "data"]);
      let _0x302c9b = await Currencies.getAll(["userID"]);
      for (const _0x4d7a30 of _0x3d7d55) {
        const _0x2830e5 = String(_0x4d7a30.threadID);
        global.data.allThreadID.push(_0x2830e5);
        global.data.threadData.set(_0x2830e5, _0x4d7a30.data || {});
        global.data.threadInfo.set(_0x2830e5, _0x4d7a30.threadInfo || {});
        if (_0x4d7a30.data && _0x4d7a30.data.banned == true) {
          global.data.threadBanned.set(_0x2830e5, {
            reason: _0x4d7a30.data.reason || "",
            dateAdded: _0x4d7a30.data.dateAdded || ""
          });
        }
        if (_0x4d7a30.data && _0x4d7a30.data.commandBanned && _0x4d7a30.data.commandBanned.length != 0) {
          global.data.commandBanned.set(_0x2830e5, _0x4d7a30.data.commandBanned);
        }
        if (_0x4d7a30.data && _0x4d7a30.data.NSFW) {
          global.data.threadAllowNSFW.push(_0x2830e5);
        }
      }
      logger.loader(global.getText("listen", "loadedEnvironmentThread"));
      for (const _0x5cdeec of _0xaf495c) {
        const _0x155e37 = String(_0x5cdeec.userID);
        global.data.allUserID.push(_0x155e37);
        if (_0x5cdeec.name && _0x5cdeec.name.length != 0) {
          global.data.userName.set(_0x155e37, _0x5cdeec.name);
        }
        if (_0x5cdeec.data && _0x5cdeec.data.banned == 1) {
          global.data.userBanned.set(_0x155e37, {
            reason: _0x5cdeec.data.reason || "",
            dateAdded: _0x5cdeec.data.dateAdded || ""
          });
        }
        if (_0x5cdeec.data && _0x5cdeec.data.commandBanned && _0x5cdeec.data.commandBanned.length != 0) {
          global.data.commandBanned.set(_0x155e37, _0x5cdeec.data.commandBanned);
        }
      }
      for (const _0x190264 of _0x302c9b) {
        global.data.allCurrenciesID.push(String(_0x190264.userID));
      }
      logger.loader(global.getText("listen", "loadedEnvironmentUser"));
      logger(global.getText("listen", "successLoadEnvironment"), "[ DATABASE ]");
    } catch (_0x447db1) {
      return logger.loader(global.getText("listen", "failLoadEnvironment", _0x447db1), "error");
    }
  })();
  logger(`${api.getCurrentUserID()} - [ ${global.config.PREFIX} ] • ${!global.config.BOTNAME ? "This bot was made by CatalizCS and SpermLord" : global.config.BOTNAME}`, "[ BOT INFO ]");

  ///////////////////////////////////////////////
  //========= Require all handle need =========//
  //////////////////////////////////////////////

  const handleCommand = require("./handle/handleCommand")({
    api,
    models,
    Users,
    Threads,
    Currencies
  });
  const handleCommandEvent = require("./handle/handleCommandEvent")({
    api,
    models,
    Users,
    Threads,
    Currencies
  });
  const handleReply = require("./handle/handleReply")({
    api,
    models,
    Users,
    Threads,
    Currencies
  });
  const handleReaction = require("./handle/handleReaction")({
    api,
    models,
    Users,
    Threads,
    Currencies
  });
  const handleEvent = require("./handle/handleEvent")({
    api,
    models,
    Users,
    Threads,
    Currencies
  });
  const handleCreateDatabase = require("./handle/handleCreateDatabase")({
    api,
    Threads,
    Users,
    Currencies,
    models
  });
  logger.loader(`====== ${Date.now() - global.client.timeStart}ms ======`);

  //////////////////////////////////////////////////
  //========= Send event to handle need =========//
  /////////////////////////////////////////////////

  return event => {
    switch (event.type) {
      case "message":
      case "message_reply":
      case "message_unsend":
        handleCreateDatabase({
          event
        });
        handleCommand({
          event
        });
        handleReply({
          event
        });
        handleCommandEvent({
          event
        });
        break;
      case "event":
        handleEvent({
          event
        });
        break;
      case "message_reaction":
        handleReaction({
          event
        });
        break;
      default:
        break;
    }
  };
};

//THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
