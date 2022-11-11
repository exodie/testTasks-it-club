import { config } from "dotenv";
import ExpressApp from "./app";
import './database';

config();

class Server {
    constructor() {
        new ExpressApp(Number(process.env.EXPRESS_APP_PORT)).listen(); // ...
    }
}

new Server();

/**
 * Извиняюсь за такой "плохой" код, увидел только сегодня (11 нояб.) 
 * ближе к 20 часам, был вынужден писать быстро :/
 */