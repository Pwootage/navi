/// <reference path="../typings/node/node.d.ts" />

declare module 'discord.js' {
    import {EventEmitter} from "events";

    export type Events = "ready" | "debug" | "message" | "warn" | "messageDeleted" | "messageUpdated" | "disconnected"
        | "error" | "raw"| "serverCreated" | "serverDeleted" | "serverUpdated" | "channelCreated" | "channelDeleted"
        | "channelUpdated" | "serverRoleCreated" | "serverRoleDeleted" | "serverRoleUpdated" | "serverNewMember"
        | "serverMemberRemoved" | "serverMemberUpdated" | "presence" | "userTypingStarted" | "userTypingStopped"
        | "userBanned" | "userUnbanned" | "voiceJoin" | "voiceLeave" | "voiceStateUpdate";

    export class Client extends EventEmitter {
        constructor();

        on(event:Events, listener:Function):this;

        login(user:string, password:string, cb?:Function)
        reply(message: Message, content: string, options?:{tts?:boolean}, callback?:(error:any, message:Message)=>void);
        sendMessage(channel: ChannelResolveable, content: string, options?:{tts?:boolean}, callback?:(error:any, message:Message)=>void);
    }

    export interface Message {
        channel: Channel;
        client: Client;
        attachments: any[];
        tts: boolean;
        embeds: any[];
        timestamp: number;
        everyoneMentioned: boolean;
        id: string;
        editedTimestamp?: number;
        author: User;
        content: string;
        cleanContent: string;
        mentions: User[];
        isMentioned(user:UserResolvable): boolean;
    }

    export interface TextChannel {
    }

    export interface PMChannel {
    }

    export type Channel = TextChannel | PMChannel;

    export interface User {
        client: Client;
        username: string;
        name: string;
        discriminator: number;
        id: string;
        avatar: string;
        status: "online" | "offline" | "idle";
        game?: {
            name: string
        };
        typing?: {
            since: number;
            channel: Channel;
        };
        avatarUrl: string;
        voiceChannel?: VoiceChannel;

        mention():string;
    }

    export interface Server {
    }

    export interface VoiceChannel {
    }

    export type UserResolvable = User | Message | TextChannel | PMChannel | Server | string;
    export type ChannelResolveable = Channel | Server | Message | User | string;
}