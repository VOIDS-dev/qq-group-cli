"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookies_1 = require("../model/cookies");
const utils_1 = require("../utils");
const config_json_1 = require("../config.json");
const token_1 = require("./token");
const fetch_1 = require("./fetch");
const isOnline = async (cb) => {
    if (!cookies_1.jar.getCookieStringSync("http://qun.qzone.qq.com")) {
        return false;
    }
    const callbackFun = "_GroupMember";
    const resp = await fetch_1.fetch(utils_1.withQuery("http://qun.qzone.qq.com/cgi-bin/get_group_member", {
        callbackFun,
        uin: config_json_1.uin,
        groupid: "0",
        neednum: "1",
        r: Math.random(),
        g_tk: token_1.getACSRFToken()
    }));
    const text = await resp.text();
    const { nick } = utils_1.parseJsonp(text, callbackFun);
    cb && cb(nick);
    return true;
};
exports.ensureOnline = async () => {
    const check = () => isOnline(nick => console.log(`${nick} already online.`));
    let online = await check();
    while (!online) {
        console.log("need login!");
        await fetch_1.login();
        online = await check();
    }
};
