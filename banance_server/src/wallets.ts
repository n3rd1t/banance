import { Router } from "express";
import { authMiddlewares } from "./auth";
import { UserDocument } from "./users";
import { BuyWalletPayload, TradeWalletPayload, WalletDocument, WalletModel } from "./WalletModel";
import Big from "big-js";



const Operation = (cur: string, usd: string, rate: string, amount: string, sign: boolean, wallet: WalletDocument) => {
    let flag: boolean;
    console.log("In func: " + cur + " " + usd + " " + rate + " " + amount + " " + sign + " " + wallet + " ");
    if (sign) {
        try {
            console.log("try " + usd + " " + typeof(usd) + " " + typeof(rate) + " " + typeof(amount));
            flag = Big(usd).lt(Big(amount).times(rate));
            console.log("Flag: " + flag);
        } catch (e) {
            throw new Error(e);
        }
        if (flag) {
            console.log("flag");
            throw new Error("Not enough money");
        }
        let temp = new Big(usd);
        console.log("Temp-usd: " + temp);
        temp = temp.minus(Big(amount).times(rate));
        console.log("Temp-usd after: " + temp);
        console.log("usd before: " + temp);
        usd = temp.toString();
        console.log("usd after: " + temp + " " + typeof(usd));
        temp = new Big(cur);
        console.log("Temp-cur: " + temp);
        temp = temp.plus(amount);
        console.log("Temp-cur after: " + temp);
        console.log("cur before: " + temp);
        cur = temp.toString();
        console.log("cur after: " + temp + " " + typeof(cur));
        wallet.usd = usd;
        return cur;
    }
    else {
        try {
            console.log("try " + usd + " " + typeof(usd) + " " + typeof(rate) + " " + typeof(amount));
            flag = Big(cur).lt(amount);
            console.log("Flag: " + flag);
        } catch (e) {
            throw new Error(e);
        }
        if (flag) {
            console.log("flag");
            throw new Error("Not enough money");
        }
        let temp = new Big(cur);
        temp.minus(amount);
        cur = temp.toString();
        temp = new Big(usd);
        temp.plus(Big(amount).times(rate));
        usd = temp.toString();
        wallet.usd = usd;
        return cur;
    }
}



export const walletRouter = Router();

walletRouter.get("/", ...authMiddlewares, async (req, res, next) => {
    const wallet: WalletDocument = res.locals.wallet;
  
    const { _id: _id, owner: owner, ...otherUserData } = (wallet as WalletDocument).toObject();

    res.json(otherUserData);
});



walletRouter.post("/", ...authMiddlewares, async (req, res, next) => {
    console.log("Here we go!");
    console.log("user doc: " + res.locals.user);
    const user: UserDocument = res.locals.user;

    console.log("userId " + user._id);

    const newWallet =  new WalletModel({
        owner: user._id,
    });

    await newWallet.save();
    res.json(newWallet);
});




walletRouter.patch("/buy", ...authMiddlewares, async (req, res, next) => {
    const payload: BuyWalletPayload = req.body;
    console.log(payload.usd + typeof(payload.usd));
    const usd = new Big(payload.usd);
    console.log(usd + typeof(usd));

    const wallet: WalletDocument = res.locals.wallet;

    let walletUsd = new Big(wallet.usd);
    try {
        walletUsd = walletUsd.plus(usd);
    } catch (e) {
        console.log(e);
    }

    wallet.usd = walletUsd.toString();
    await wallet.save();
    res.end();
});




walletRouter.patch("/trade/:operation/:currency", ...authMiddlewares, async (req, res, next) => {
    const { currency, operation } = req.params;
    let sign: boolean;
    if (operation === "sell") {
        sign = false;
    }
    else if (operation === "buy") {
        sign = true;
    }
    else{
        throw new Error("Bad request (operation)");
    }

    const payload: TradeWalletPayload = req.body;
    const { rate, amount } = payload;
    console.log(currency + " " + operation + " " + rate + " " + amount);

    const wallet: WalletDocument = res.locals.wallet;

    switch (currency) {
        case "btc":
            wallet.btc = Operation(wallet.btc, wallet.usd, rate, amount, sign, wallet);
            await wallet.save();
            break;
        
        case "eth":
            wallet.eth = Operation(wallet.eth, wallet.usd, rate, amount, sign, wallet);
            await wallet.save();
            break;
    
        case "dot":
            wallet.dot = Operation(wallet.dot, wallet.usd, rate, amount, sign, wallet);
            await wallet.save();
            break;
    
        case "atom":
            wallet.atom = Operation(wallet.atom, wallet.usd, rate, amount, sign, wallet);
            await wallet.save();
            break;
    
        case "xch":
            wallet.xch = Operation(wallet.xch, wallet.usd, rate, amount, sign, wallet);
            await wallet.save();
            break;
    
        default:
            throw new Error("Bad request (currency)");
    }
    res.json(wallet);
});