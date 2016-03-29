export interface NaviConf {
    discord: DiscordConf;
}

export interface DiscordConf {
    username: string;
    password: string;
}

import {Client} from "discord.js";
import {EventEmitter} from "events";
import {DiscordEventMapper} from "./discord/DiscordEventMapper";
import {NaviEvent} from "./common/NaviEvent";
import {MessageType, NaviMessage} from "./common/NaviMessage";
import * as fs from "fs";

export class NaviBot {
    private _started = false;
    private discord:Client;
    private discordEventMapper:DiscordEventMapper;
    private eventStream = new EventEmitter();

    constructor(private conf:NaviConf) {
        this.discord = new Client();
        this.discordEventMapper = new DiscordEventMapper(this.discord, this.eventStream);

        this.on("message", (message:NaviMessage) => {
            console.log("Received message", message.sender, ": ", message.message);
            if (message.message.indexOf("!hey") == 0) {
                message.reply(`Hey! Listen!`);
            }
        });
    }

    start() {
        if (this._started) throw Error("Already started!");
        this._started = true;

        console.log("NaviBot starting up");

        //TODO: finish writing this token caching thing
        let token:string = null;
        try {
            //if (fs.readFileSync()) {
            //}
        } catch (e) {
        }


        this.discord.login(this.conf.discord.username, this.conf.discord.password).then(token => {
            //TODO: probably should cache this token
        });

        console.log("Finished starting client libraries.");
    }

    get started():boolean {
        return this._started;
    }

    on(event:NaviEvent, handler:Function) {
        this.eventStream.on(event, handler);
    }
}