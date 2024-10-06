import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "express-async-errors";
import WebSocket, { WebSocketServer } from "ws";
import { CronJob } from "cron";
import cors from "cors"

import { mainRouter } from "./routes";


//запускал app.ts через -> npx tsx src/app.ts

export const PORT = 2024;
const WS_PORT = 2023;
const crypto = ["bitcoin", "ethereum", "polkadot", "cosmos", "chia"];
const currencies = ["usd", "cny", "eur", "idr", "jpy", "krw", "rub", "twd"];

const server = express();
const ws = new WebSocketServer({ port: WS_PORT, path: "/" });


async function connectToDatabase() {
    const CONNECTION_STRING = "mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT";
    const DB_NAME = "main";
  
    await mongoose.connect("mongodb://0.0.0.0/banance");
}  


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400).json({ error: err.message });
}

async function run() {
    await connectToDatabase();

    //NEW!!!
    server.use(cors({
        credentials: true,
        origin: "http://localhost:3000"
    }));
    //NEW!!!

    server.use(express.json());
    server.use(cookieParser());

    server.use(mainRouter);

    server.use(errorHandler);
  
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}. Listening....`)
    });
}

run();


let clients: WebSocket[] = [];
let clientsCurrency: string[] = [];

ws.on("listening", () => {
    console.log("Websocket Server is started at port " + 2023);
});

ws.on("connection", (client) => {
    console.log("CONNECTED WS");
    clients.push(client);
    console.log("after push: ", clients);
    client.on("message", (data) => {
        let flag = false;
        const parsedData = JSON.parse(data.toString()).replace(/"/g, '');
        console.log("data came: ", parsedData, "typeof: ", typeof(parsedData));
        console.log("availible ", currencies);
        currencies.forEach(element => {
            if (element === parsedData) {
                flag = true;
            }
        });
        if (!flag) {
            console.log("invalid Data");
            clients.splice(clients.indexOf(client), 1);
        }
        else {
            clientsCurrency[clients.indexOf(client)] = parsedData;
            console.log("currencies: ", clientsCurrency);  
            //NEW!!!
            sendingData(clients.indexOf(client));
            //NEW!!!
        }
    });
});



//NEW!!!
const sendingData = async (index: number) => {
    let cryptoData : any[] = [];
    let obj;
    for(let j = 0; j < 5; j++){
        await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto[j]}&vs_currencies=${clientsCurrency[index]}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=2`)
        .then(data => data.json())
        .then(request => {
            console.log(request); 
            obj = request;
        });
        cryptoData.push(obj);
    }
    clients[index].send(JSON.stringify(cryptoData));
}
//NEW!!!



//const job = new CronJob(
//    '* */1 * * * *',
//	  async function () {
//        if (clients.length > 0) {
//            console.log(clients);
//            for(let i = 0; i < clients.length; i++) {
//                sendingData(i);
//            }
//        }
//	  },
//	  null,
//	  true,
//);