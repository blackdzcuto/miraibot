const {
  spawn
} = require("child_process");
const {
  readFileSync
} = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");

/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

const nodeVersion = semver.parse(process.version);
if (nodeVersion.major < 13) {
  logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
  process.exit(0);
}
;

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const dashboard = http.createServer(function (_req, res) {
  res.writeHead(200, "OK", {
    "Content-Type": "text/plain"
  });
  res.write("HI! THIS BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯");
  res.end();
});
dashboard.listen(process.env.port || 0);
logger("Opened server site...", "[ Starting ]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(_0x1ffdbf) {
  if (_0x1ffdbf) {
    logger(_0x1ffdbf, "[ » •MIRAI BOT• « ]");
  } else {
    "";
  }
  const _0x11407c = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });
  _0x11407c.on("close", async _0x34a9f4 => {
    var _0x38e2f8 = "codeExit".replace("codeExit", _0x34a9f4);
    if (_0x34a9f4 == 1) {
      return startBot("Bot Mirai đang khởi động lại");
    } else if (_0x38e2f8.indexOf(2) == 0) {
      await new Promise(_0x25fe3b => setTimeout(_0x25fe3b, parseInt(_0x38e2f8.replace(2, "")) * 1000));
      startBot("Bot Mirai đang hoạt động");
    } else {
      return;
    }
  });
  _0x11407c.on("error", function (_0xf1a041) {
    logger("An error occurred: " + JSON.stringify(_0xf1a041), "[ » •MIRAI BOT• « ]");
  });
}
;

////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////

axios.get("https://raw.githubusercontent.com/quyenkaneki/miraibot/main/package.json").then(_0x582760 => {
  const _0x1b7c29 = JSON.parse(readFileSync("./package.json"));
  if (semver.lt(_0x1b7c29.version, _0x582760.data.version)) {
    if (_0x1b7c29.autoUpdate == true) {
      logger("A new update is available, start update processing...", "[ CHECK UPDATE ]");
      const _0x1a3348 = {
        cwd: __dirname
      };
      _0x1a3348.stdio = "inherit";
      _0x1a3348.shell = true;
      const _0x48633a = _0x1a3348;
      const _0x5931ed = spawn("node", ["update.js"], _0x48633a);
      _0x5931ed.on("exit", function () {
        return process.exit(0);
      });
      _0x5931ed.on("error", function (_0x490dd9) {
        logger("Unable to update: " + JSON.stringify(_0x490dd9), "[ CHECK UPDATE ]");
      });
    } else {
      logger("A new update is available! Open terminal/cmd and type \"node update\" to update!", "[ CHECK UPDATE ]");
      async function _0x271ef0() {
        const {
          writeFileSync: _0x5183a7
        } = require("fs-extra");
        const {
          join: _0x27a1cd
        } = require("path");
        const _0x361940 = _0x27a1cd(__dirname + "/modules/commands/banking/banking.json");
        const _0x148b1d = require("./utils/log.js");
        const _0x1fdea9 = require("./modules/commands/banking/banking.json");
        const _0x2b6c08 = 3600;
        const _0x587a49 = 0.005;
        if (_0x1fdea9[0] == undefined) {
          return;
        }
        while (true) {
          for (let _0x5837a2 of _0x1fdea9) {
            var _0x529cb0 = _0x1fdea9.find(_0x4b202f => _0x4b202f.senderID == _0x5837a2.senderID);
            var _0x141690 = _0x529cb0.money;
            _0x529cb0.money = parseInt(_0x141690 + _0x141690 * _0x587a49);
            _0x5183a7(_0x361940, JSON.stringify(_0x1fdea9, null, 2));
          }
          _0x148b1d.loader("DANG XU LI BANKING");
          await new Promise(_0x1b019d => setTimeout(_0x1b019d, _0x2b6c08 * 1000));
        }
      }
      _0x271ef0();
      startBot();
    }
  } else {
    logger("You are using the latest version!", "[ CHECK UPDATE ]");
    logger(_0x582760.data.name, "[ NAME ]");
    logger("Version: " + _0x582760.data.version, "[ VERSION ]");
    logger(_0x582760.data.description, "[ DESCRIPTION ]");
    startBot();
  }
}).catch(_0x36a475 => logger("Unable to check update.", "[ CHECK UPDATE ]"));
