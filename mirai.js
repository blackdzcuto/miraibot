const {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
  rm
} = require("fs-extra");
const {
  join,
  resolve
} = require("path");
const {
  execSync
} = require("child_process");
const logger = require("./utils/log.js");
const login = require("fca-kaneki");
const axios = require("axios");
const listPackage = JSON.parse(readFileSync("./package.json")).dependencies;
const listbuiltinModules = require("module").builtinModules;
const fs = require("fs");
const crypto = require("crypto");
const aes = require("aes-js");
const moment = require("moment-timezone");
global.client = new Object({
  commands: new Map(),
  events: new Map(),
  cooldowns: new Map(),
  eventRegistered: new Array(),
  handleSchedule: new Array(),
  handleReaction: new Array(),
  handleReply: new Array(),
  mainPath: process.cwd(),
  configPath: new String(),
  getTime: function (option) {
    switch (option) {
      case "seconds":
        return `${moment.tz("Asia/Ho_Chi_minh").format("ss")}`;
      case "minutes":
        return `${moment.tz("Asia/Ho_Chi_minh").format("mm")}`;
      case "hours":
        return `${moment.tz("Asia/Ho_Chi_minh").format("HH")}`;
      case "date":
        return `${moment.tz("Asia/Ho_Chi_minh").format("DD")}`;
      case "month":
        return `${moment.tz("Asia/Ho_Chi_minh").format("MM")}`;
      case "year":
        return `${moment.tz("Asia/Ho_Chi_minh").format("YYYY")}`;
      case "fullHour":
        return `${moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss")}`;
      case "fullYear":
        return `${moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY")}`;
      case "fullTime":
        return `${moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss DD/MM/YYYY")}`;
    }
  }
});
global.data = new Object({
  threadInfo: new Map(),
  threadData: new Map(),
  userName: new Map(),
  userBanned: new Map(),
  threadBanned: new Map(),
  commandBanned: new Map(),
  threadAllowNSFW: new Array(),
  allUserID: new Array(),
  allCurrenciesID: new Array(),
  allThreadID: new Array()
});
global.utils = require("./utils");
global.nodemodule = new Object();
global.config = new Object();
global.configModule = new Object();
global.moduleData = new Array();
global.language = new Object();
global.account = new Object();

//////////////////////////////////////////////
//========== Connect sever uptime ==========//
//////////////////////////////////////////////
const config = {
  status: true,
  name: "Mirai Project",
  timestamp: Date.now()
};
if (config.status == true) {
  var username = process.env.REPL_OWNER;
}
if (username !== undefined) {
  var urlRepl = `https://${process.env.REPL_SLUG}.${username}.repl.co`;
  logger("Bạn đang chạy bot ở link: " + urlRepl, "[ CHECK HOST ]");
  if (process.env.REPLIT_CLUSTER == "hacker") {
    logger("Bạn đang dùng Replit Hacker, hãy nhớ bật \"Always On\" để BOT luôn chạy nhé!", "[ CHECK HOST ]");
  }
  logger("Bạn đang dùng Replit thường, hệ thống sẽ tự động kết nối với UptimeRobot cho bạn!", "[ CHECK HOST ]");
  connectUptime(urlRepl, config.name);
}
;
async function connectUptime(url) {
  try {
    const res = (await axios.get(`https://uptime.sp20bse.repl.co/?add=${url}`)).data;
    if (res.error) {
      return logger("Đã hoàn thành kết nối Uptime cho bạn!", "[ UPTIME ]");
    }
    return logger("Đã hoàn thành kết nối Uptime cho bạn!", "[ UPTIME ]");
  } catch {
    return logger("Server Uptime gặp sự cố, không thể bật uptime cho bạn!", "[ UPTIME ]");
  }
}
;

////////////////////////////////////////////////////////////////////////
//=========== Encrypt, Decrypt State && Get Token Facebook ===========//
//================= Find and get variable from Config ================//
// Login account, start Listen Event && Get Appstate auto from config //
////////////////////////////////////////////////////////////////////////

async function encryptState(_0x239a5d, _0x4ab069) {
  let _0x533ca1 = crypto.createHash("sha256");
  let _0x4ecfd1 = _0x533ca1.update(_0x4ab069).digest();
  let _0x43af64 = aes.utils.utf8.toBytes(_0x239a5d);
  let _0x3c0675 = new aes.ModeOfOperation.ctr(_0x4ecfd1);
  let _0x5b66b4 = _0x3c0675.encrypt(_0x43af64);
  return aes.utils.hex.fromBytes(_0x5b66b4);
}
function decryptState(_0x302a7b, _0x4e4fb5) {
  let _0x269f91 = crypto.createHash("sha256");
  let _0x3f4cfa = _0x269f91.update(_0x4e4fb5).digest();
  let _0x457f69 = aes.utils.hex.toBytes(_0x302a7b);
  let _0x588398 = new aes.ModeOfOperation.ctr(_0x3f4cfa);
  let _0x4539dd = _0x588398.decrypt(_0x457f69);
  return aes.utils.utf8.fromBytes(_0x4539dd);
}
var configValue;
try {
  global.client.configPath = join(global.client.mainPath, "config.json");
  configValue = require(global.client.configPath);
  logger.loader("Đã tìm thấy file config.json!");
} catch {
  logger.loader("Không tìm thấy file config.json", "error");
}
try {
  for (const key in configValue) {
    global.config[key] = configValue[key];
  }
  logger.loader("Config Loaded!");
} catch {
  logger.loader("Can't load file config!", "error");
}
const {
  Sequelize,
  sequelize
} = require("./includes/database");
const langFile = readFileSync(__dirname + "/languages/" + (global.config.language || "en") + ".lang", {
  encoding: "utf-8"
}).split(/\r?\n|\r/);
const langData = langFile.filter(_0xc1938e => _0xc1938e.indexOf("#") != 0 && _0xc1938e != "");
for (const item of langData) {
  const getSeparator = item.indexOf("=");
  const itemKey = item.slice(0, getSeparator);
  const itemValue = item.slice(getSeparator + 1, item.length);
  const head = itemKey.slice(0, itemKey.indexOf("."));
  const key = itemKey.replace(head + ".", "");
  const value = itemValue.replace(/\\n/gi, "\n");
  if (typeof global.language[head] == "undefined") {
    global.language[head] = new Object();
  }
  global.language[head][key] = value;
}
global.getText = function (..._0x1a4327) {
  const _0x51841e = global.language;
  if (!_0x51841e.hasOwnProperty(_0x1a4327[0])) {
    throw __filename + " - Not found key language: " + _0x1a4327[0];
  }
  var _0x280e38 = _0x51841e[_0x1a4327[0]][_0x1a4327[1]];
  for (var _0xbc7b63 = _0x1a4327.length - 1; _0xbc7b63 > 0; _0xbc7b63--) {
    const _0x42c52a = RegExp("%" + _0xbc7b63, "g");
    _0x280e38 = _0x280e38.replace(_0x42c52a, _0x1a4327[_0xbc7b63 + 1]);
  }
  return _0x280e38;
};
try {
  var appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
  var appState = process.env.KEY && fs.readFileSync(appStateFile, "utf8")[0] != "[" && global.config.encryptSt ? JSON.parse(decryptState(fs.readFileSync(appStateFile, "utf8"), process.env.KEY)) : require(appStateFile);
  logger.loader(global.getText("mirai", "foundPathAppstate"));
} catch {
  logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error");
}
if (global.config.version != "1.3.0") {
  logger("Phiên bản sử dụng không hợp lệ!", "[CHECK VERSION]");
}
async function uptime() {
  const _0x4ef874 = require("./config.json");
  _0x4ef874.UPTIME = process.uptime() + _0x4ef874.UPTIME;
  writeFileSync(global.client.configPath, JSON.stringify(_0x4ef874, null, 4), "utf-8");
  return logger("Đã lưu uptime của lần restart vừa rồi!", "UPTIME");
}
async function loginAppstate() {
  const _0x8153d6 = require("fca-kaneki");
  const _0x4d200a = require("./config.json");
  const _0xf08f57 = {
    logLevel: "silent",
    forceLogin: true,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"
  };
  const _0x30a458 = _0xf08f57;
  let _0x5e1e4f = _0x4d200a.EMAIL;
  let _0x196397 = _0x4d200a.PASSWORD;
  let _0x7e468a = _0x4d200a.OTPKEY.replace(/\s+/g, "").toLowerCase();
  const _0x14afba = {
    email: _0x5e1e4f,
    password: _0x196397,
    keyotp: _0x7e468a
  };
  const _0x1ade61 = _0x14afba;
  _0x8153d6(_0x1ade61, _0x30a458, async (_0x429be1, _0x40ecb9) => {
    if (_0x429be1) {
      switch (_0x429be1.error) {
        case "login-approval":
          {
            logger("Vui lòng tắt 2FA trước khi sử dụng BOT!", "LOGIN");
            return process.exit(0);
          }
        default:
          logger("Không thể tiến hành đăng nhập qua mật khẩu, vui lòng thay thế appstate hoặc mật khẩu để tiếp tục!", "LOGIN");
          return process.exit(0);
      }
    }
    const _0x44ce51 = JSON.stringify(_0x40ecb9.getAppState(), null, 4);
    writeFileSync("./" + _0x4d200a.APPSTATEPATH, _0x44ce51, "utf-8");
    uptime();
    return logger("Đăng nhập thành công, đang tiến hành khởi động lại!", "LOGIN");
  });
}
function onBot({
  models: _0x2673ce
}) {
  const _0x51d3de = {
    appState: appState
  };
  login(_0x51d3de, async (_0x1ece78, _0x5316b7) => {
    if (_0x1ece78) {
      logger("Không thể đăng nhập bằng appState, tiến hành đăng nhập qua mật khẩu Facebook!", "LOGIN");
      var _0x6e6415 = await loginAppstate();
      _0x6e6415;
      await new Promise(_0x3a40ca => setTimeout(_0x3a40ca, 7000));
      logger("Bắt đầu khởi động lại!", "RESTART");
      process.exit(1);
    }
    const _0x4fb3a5 = require("./appstate.json");
    try {
      var _0x42255b = _0x4fb3a5.map(_0x4f2d16 => _0x4f2d16 = _0x4f2d16.key + "=" + _0x4f2d16.value).join(";");
      const _0x182591 = {
        cookie: _0x42255b
      };
      const _0x566db6 = _0x182591;
      const _0x10554a = {
        headers: _0x566db6
      };
      const _0x255fea = _0x10554a;
      var _0x41d297 = (await axios.get("https://business.facebook.com/content_management/", _0x255fea)).data;
      const _0x4b7fca = _0x41d297.match(/EAAG[0-9A-Za-z]+/);
      if (_0x4b7fca == null) {}
      global.account.accessToken = _0x4b7fca[0];
      global.account.cookie = _0x42255b;
    } catch (_0x434919) {
      logger("Không thể lấy accessToken của Bot", "TOKEN");
    }
    _0x5316b7.setOptions(global.config.FCAOption);
    let _0x970862 = _0x5316b7.getAppState();
    _0x970862 = JSON.stringify(_0x970862, null, "\t");
    if (process.env.KEY && global.config.encryptSt) {
      _0x970862 = await encryptState(_0x970862, process.env.KEY);
      writeFileSync(appStateFile, _0x970862);
    } else {
      writeFileSync(appStateFile, _0x970862);
    }
    global.client.timeStart = new Date().getTime();
    (function () {
      const _0xaf3354 = readdirSync(global.client.mainPath + "/modules/commands").filter(_0x19abe7 => _0x19abe7.endsWith(".js") && !_0x19abe7.includes("example") && !global.config.commandDisabled.includes(_0x19abe7));
      for (const _0x570425 of _0xaf3354) {
        try {
          var _0x7955af = require(global.client.mainPath + "/modules/commands/" + _0x570425);
          if (!_0x7955af.config || !_0x7955af.run || !_0x7955af.config.commandCategory) {
            throw new Error(global.getText("mirai", "errorFormat"));
          }
          if (global.client.commands.has(_0x7955af.config.name || "")) {
            throw new Error(global.getText("mirai", "nameExist"));
          }
          if (_0x7955af.config.dependencies && typeof _0x7955af.config.dependencies == "object") {
            for (const _0xabdf6f in _0x7955af.config.dependencies) {
              const _0x482585 = join(__dirname, "nodemodules", "node_modules", _0xabdf6f);
              try {
                if (!global.nodemodule.hasOwnProperty(_0xabdf6f)) {
                  if (listPackage.hasOwnProperty(_0xabdf6f) || listbuiltinModules.includes(_0xabdf6f)) {
                    global.nodemodule[_0xabdf6f] = require(_0xabdf6f);
                  } else {
                    global.nodemodule[_0xabdf6f] = require(_0x482585);
                  }
                } else {
                  "";
                }
              } catch {
                var _0x1e7a91 = false;
                var _0x2700ad;
                logger.loader(global.getText("mirai", "notFoundPackage", _0xabdf6f, _0x7955af.config.name), "warn");
                execSync("npm ---package-lock false --save install " + _0xabdf6f + (_0x7955af.config.dependencies[_0xabdf6f] == "*" || _0x7955af.config.dependencies[_0xabdf6f] == "" ? "" : "@" + _0x7955af.config.dependencies[_0xabdf6f]), {
                  stdio: "inherit",
                  env: process.env,
                  shell: true,
                  cwd: join(__dirname, "nodemodules")
                });
                for (let _0x353fe6 = 1; _0x353fe6 <= 3; _0x353fe6++) {
                  try {
                    require.cache = {};
                    if (listPackage.hasOwnProperty(_0xabdf6f) || listbuiltinModules.includes(_0xabdf6f)) {
                      global.nodemodule[_0xabdf6f] = require(_0xabdf6f);
                    } else {
                      global.nodemodule[_0xabdf6f] = require(_0x482585);
                    }
                    _0x1e7a91 = true;
                    break;
                  } catch (_0x32dfe2) {
                    _0x2700ad = _0x32dfe2;
                  }
                  if (_0x1e7a91 || !_0x2700ad) {
                    break;
                  }
                }
                if (!_0x1e7a91 || _0x2700ad) {
                  throw global.getText("mirai", "cantInstallPackage", _0xabdf6f, _0x7955af.config.name, _0x2700ad);
                }
              }
            }
          }
          if (_0x7955af.config.envConfig) {
            try {
              for (const _0x1fa9cd in _0x7955af.config.envConfig) {
                if (typeof global.configModule[_0x7955af.config.name] == "undefined") {
                  global.configModule[_0x7955af.config.name] = {};
                }
                if (typeof global.config[_0x7955af.config.name] == "undefined") {
                  global.config[_0x7955af.config.name] = {};
                }
                if (typeof global.config[_0x7955af.config.name][_0x1fa9cd] !== "undefined") {
                  global.configModule[_0x7955af.config.name][_0x1fa9cd] = global.config[_0x7955af.config.name][_0x1fa9cd];
                } else {
                  global.configModule[_0x7955af.config.name][_0x1fa9cd] = _0x7955af.config.envConfig[_0x1fa9cd] || "";
                }
                if (typeof global.config[_0x7955af.config.name][_0x1fa9cd] == "undefined") {
                  global.config[_0x7955af.config.name][_0x1fa9cd] = _0x7955af.config.envConfig[_0x1fa9cd] || "";
                }
              }
            } catch (_0xc13b6b) {
              throw new Error(global.getText("mirai", "loadedConfig", _0x7955af.config.name, JSON.stringify(_0xc13b6b)));
            }
          }
          if (_0x7955af.onLoad) {
            try {
              const _0x287edb = {
                api: _0x5316b7,
                models: _0x2673ce
              };
              _0x7955af.onLoad(_0x287edb);
            } catch (_0x4a4606) {
              throw new Error(global.getText("mirai", "cantOnload", _0x7955af.config.name, JSON.stringify(_0x4a4606)), "error");
            }
            ;
          }
          if (_0x7955af.handleEvent) {
            global.client.eventRegistered.push(_0x7955af.config.name);
          }
          global.client.commands.set(_0x7955af.config.name, _0x7955af);
        } catch (_0x30b137) {
          logger.loader(global.getText("mirai", "failLoadModule", _0x7955af.config.name, _0x30b137), "error");
        }
        ;
      }
    })();
    (function () {
      const _0x21ee29 = readdirSync(global.client.mainPath + "/modules/events").filter(_0x2a2fa3 => _0x2a2fa3.endsWith(".js") && !global.config.eventDisabled.includes(_0x2a2fa3));
      for (const _0x2a871f of _0x21ee29) {
        try {
          var _0x3cb88b = require(global.client.mainPath + "/modules/events/" + _0x2a871f);
          if (!_0x3cb88b.config || !_0x3cb88b.run) {
            throw new Error(global.getText("mirai", "errorFormat"));
          }
          if (global.client.events.has(_0x3cb88b.config.name) || "") {
            throw new Error(global.getText("mirai", "nameExist"));
          }
          if (_0x3cb88b.config.dependencies && typeof _0x3cb88b.config.dependencies == "object") {
            for (const _0x209472 in _0x3cb88b.config.dependencies) {
              const _0x2e570c = join(__dirname, "nodemodules", "node_modules", _0x209472);
              try {
                if (!global.nodemodule.hasOwnProperty(_0x209472)) {
                  if (listPackage.hasOwnProperty(_0x209472) || listbuiltinModules.includes(_0x209472)) {
                    global.nodemodule[_0x209472] = require(_0x209472);
                  } else {
                    global.nodemodule[_0x209472] = require(_0x2e570c);
                  }
                } else {
                  "";
                }
              } catch {
                let _0x56f375 = false;
                let _0x302954;
                logger.loader(global.getText("mirai", "notFoundPackage", _0x209472, _0x3cb88b.config.name), "warn");
                execSync("npm --package-lock false --save install" + _0x209472 + (_0x3cb88b.config.dependencies[_0x209472] == "*" || _0x3cb88b.config.dependencies[_0x209472] == "" ? "" : "@" + _0x3cb88b.config.dependencies[_0x209472]), {
                  stdio: "inherit",
                  env: process.env,
                  shell: true,
                  cwd: join(__dirname, "nodemodules")
                });
                for (let _0x45052d = 1; _0x45052d <= 3; _0x45052d++) {
                  try {
                    require.cache = {};
                    if (global.nodemodule.includes(_0x209472)) {
                      break;
                    }
                    if (listPackage.hasOwnProperty(_0x209472) || listbuiltinModules.includes(_0x209472)) {
                      global.nodemodule[_0x209472] = require(_0x209472);
                    } else {
                      global.nodemodule[_0x209472] = require(_0x2e570c);
                    }
                    _0x56f375 = true;
                    break;
                  } catch (_0x295a5a) {
                    _0x302954 = _0x295a5a;
                  }
                  if (_0x56f375 || !_0x302954) {
                    break;
                  }
                }
                if (!_0x56f375 || _0x302954) {
                  throw global.getText("mirai", "cantInstallPackage", _0x209472, _0x3cb88b.config.name);
                }
              }
            }
          }
          if (_0x3cb88b.config.envConfig) {
            try {
              for (const _0x41de7f in _0x3cb88b.config.envConfig) {
                if (typeof global.configModule[_0x3cb88b.config.name] == "undefined") {
                  global.configModule[_0x3cb88b.config.name] = {};
                }
                if (typeof global.config[_0x3cb88b.config.name] == "undefined") {
                  global.config[_0x3cb88b.config.name] = {};
                }
                if (typeof global.config[_0x3cb88b.config.name][_0x41de7f] !== "undefined") {
                  global.configModule[_0x3cb88b.config.name][_0x41de7f] = global.config[_0x3cb88b.config.name][_0x41de7f];
                } else {
                  global.configModule[_0x3cb88b.config.name][_0x41de7f] = _0x3cb88b.config.envConfig[_0x41de7f] || "";
                }
                if (typeof global.config[_0x3cb88b.config.name][_0x41de7f] == "undefined") {
                  global.config[_0x3cb88b.config.name][_0x41de7f] = _0x3cb88b.config.envConfig[_0x41de7f] || "";
                }
              }
            } catch (_0x393536) {
              throw new Error(global.getText("mirai", "loadedConfig", _0x3cb88b.config.name, JSON.stringify(_0x393536)));
            }
          }
          if (_0x3cb88b.onLoad) {
            try {
              const _0x1f4fe0 = {
                api: _0x5316b7,
                models: _0x2673ce
              };
              _0x3cb88b.onLoad(_0x1f4fe0);
            } catch (_0x7e38b4) {
              throw new Error(global.getText("mirai", "cantOnload", _0x3cb88b.config.name, JSON.stringify(_0x7e38b4)), "error");
            }
          }
          global.client.events.set(_0x3cb88b.config.name, _0x3cb88b);
        } catch (_0x1d31dc) {
          logger.loader(global.getText("mirai", "failLoadModule", _0x3cb88b.config.name, _0x1d31dc), "error");
        }
      }
    })();
    logger.loader(global.getText("mirai", "finishLoadModule", global.client.commands.size, global.client.events.size));
    logger.loader("Thời gian khởi động: " + (Date.now() - global.client.timeStart) / 1000 + "s");
    writeFileSync(global.client.configPath, JSON.stringify(global.config, null, 4), "utf8");
    const _0x4c2807 = {
      api: _0x5316b7,
      models: _0x2673ce
    };
    const _0x11f657 = _0x4c2807;
    const _0x3f295f = require("./includes/listen")(_0x11f657);
    async function _0x4b7160(_0x41b36e, _0x4f0cba) {
      if (_0x41b36e) {
        logger("Acc bị logout, đang tiến hành đăng nhập lại!", "LOGIN");
        var _0x4ed328 = await loginAppstate();
        _0x4ed328;
        await new Promise(_0x45e5bb => setTimeout(_0x45e5bb, 7000));
        process.exit(1);
      }
      if (["presence", "typ", "read_receipt"].some(_0x376483 => _0x376483 == _0x4f0cba.type)) {
        return;
      }
      return _0x3f295f(_0x4f0cba);
    }
    var _0xa4234 = setInterval(function (_0x5c4624) {
      uptime();
      process.exit(1);
    }, 1800000);
    _0xa4234;
    global.handleListen = _0x5316b7.listenMqtt(_0x4b7160);
    global.client.api = _0x5316b7;
  });
}
//////////////////////////////////////////////
//========= Connecting to Database =========//
//////////////////////////////////////////////
(async () => {
  try {
    await sequelize.authenticate();
    const authentication = {
      Sequelize,
      sequelize
    };
    const models = require("./includes/database/model")(authentication);
    logger(global.getText("mirai", "successConnectDatabase"), "[ DATABASE ]");
    const botData = {
      models: models
    };
    onBot(botData);
  } catch (error) {
    logger(global.getText("mirai", "successConnectDatabase", JSON.stringify(error)), "[ DATABASE ]");
  }
})();
process.on("unhandledRejection", (err, p) => {}).on("uncaughtException", err => {
  console.log(err);
});
