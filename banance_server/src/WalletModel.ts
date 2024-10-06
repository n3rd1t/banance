import { model } from "mongoose";
import { HydratedDocument, Schema, Types } from "mongoose";
import { string } from "yup";

//Вынес в отдельный файл, потому, что происходило какое-то зацикливание и вы давало ошибку cannot access "authsMiddlewares" befor initialization
//Сначала всё было в Decimal.js, но работать совсем отказывалось. Потратил не один час, чтобы просто оставить string и перейти на Big.js

export interface Wallet {
    usd: string;
    btc: string;
    eth: string;
    dot: string;
    atom: string;
    xch: string;
    owner: string | Types.ObjectId;
}

export type WalletDocument = HydratedDocument<Wallet>;

export const WalletSchema = new Schema<Wallet>({
    usd: { type: String, required: true, default: "0" },
    btc: { type: String, required: true, default: "0" },
    eth: { type: String, required: true, default: "0" },
    dot: { type: String, required: true, default: "0" },
    atom: { type: String, required: true, default: "0" },
    xch: { type: String, required: true, default: "0" },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" }
});

export type BuyWalletPayload = Pick<Wallet, "usd">;
export type TradeWalletPayload = {
    rate: string;
    amount: string;
}


export const WalletModel = model("Wallet", WalletSchema, "wallets");