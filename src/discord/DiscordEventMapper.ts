import {Client, Message} from "discord.js";
import {EventEmitter} from "events";
import {NaviMessage} from "../common/NaviMessage";

export class DiscordEventMapper {
    constructor(private client:Client, private eventOut:EventEmitter) {
        const events = [
            "ready",
            "message"
        ];
        events.forEach(event => {
            client.on(<any>event, this[event].bind(this));
        });
    }

    reply(src:Message, message:string, reply?:boolean) {
        if (reply === false) {
            this.client.sendMessage(src.channel, message, {}, (err, msg) => {
                if (err) {
                    console.warn("Error sending message", err);
                }
            });
        } else {
            this.client.reply(src, message, {}, (err, msg) => {
                if (err) {
                    console.warn("Error sending message", err);
                }
            });
        }
    }

    ready() {
        console.log("Connected to discord");
    }

    message(message:Message) {
        let out = new NaviMessage();
        out.original = message;
        out.message = message.cleanContent;
        out.sender = message.author.name;
        out.reply = this.reply.bind(this, out.original);
        this.eventOut.emit("message", out);
    }

}
