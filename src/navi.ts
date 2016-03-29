import {NaviBot, NaviConf} from "./NaviBot";
import * as fs from "fs";

export function run() {
    const confFile = "config/config.json";
    let conf: NaviConf = JSON.parse(fs.readFileSync(confFile).toString("UTF-8"));
    const bot = new NaviBot(conf);
    bot.start();
}