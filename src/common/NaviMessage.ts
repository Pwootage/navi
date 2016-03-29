import * as Discord from "discord.js";

export type MessageType = NaviMessage | Discord.Message;

export class NaviMessage {
    message: string;
    sender: string;
    original: MessageType;
    reply:(message:string, mention?:boolean)=>void;
}