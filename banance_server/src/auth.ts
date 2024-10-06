import { NextFunction, Request, Response, Router } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { User, UserModel } from "./users";
import { WalletModel } from "./WalletModel";

const SECRETE_KEY = "I_need_to_reduce_number_of_my_secretes";

export const authRouter = Router();

const
    ACCESS_LIFE_TIME = 60,
    REFRESH_LIFE_TIME = "1 day";



type SignInPayload = Pick<User, "username" | "password">;




authRouter.post("/signin", async (req, res, next) => {
    const payload: SignInPayload = req.body;
    const { username, password } = payload;

    const user = await UserModel.findOne({ username });
    if (!user) {
        throw new Error("There is no such a username");
    }
    if (password !== user.password) {
        throw new Error("Password does not match");
    }

    const accessToken = jwt.sign({ userId: user._id }, SECRETE_KEY, { expiresIn: ACCESS_LIFE_TIME });
    const refreshToken = jwt.sign({ userId: user._id }, SECRETE_KEY, { expiresIn: REFRESH_LIFE_TIME });

    user.refreshToken = refreshToken;
    await user.save();


    console.log(accessToken);
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    console.log(req.cookies.test);


    res.json(user);
});



authRouter.post("/logout", async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.locals.user = null;
    res.locals.wallet = null;

    res.end();
});




interface AccessPayload {
    userId: string
}


//NEW!!!
async function accessCheckerMiddleware(req: Request, res: Response, next: NextFunction) {

}
//NEW!!!



//NEW!!!
async function refreshCheckerMiddleware(req: Request, res: Response, next: NextFunction) {
    
}
//NEW!!!


async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("Access started");
    console.log(req.cookies.test);
    const { accessToken } = req.cookies;
    console.log(accessToken);

    try {
        console.log("Before verify");
        const { userId } = jwt.verify(accessToken, SECRETE_KEY) as AccessPayload;
        console.log("Before Model");
        const user = await UserModel.findById(userId);
        console.log("After Model");

        if (!user) {
            throw new Error("There is no such user in DB");
        }

        res.locals.user = user;
        console.log("Before Model1");
        const wallet = await WalletModel.findOne({ owner: user._id });
        console.log("After Model1");
        res.locals.wallet = wallet;

        next();
    }
    catch (e) {
        if (e instanceof TokenExpiredError) {
            res.locals.accessTokenError = true;
            next();
        }
        else {
            throw new Error("corrupted or missing access token");
        }
    }
}




async function refreshMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("Refresh started");
    if (!res.locals.accessTokenError) {
        next();
        return;
    }

    const { accessToken, refreshToken } = req.cookies;
    if (!refreshToken) {
        throw new Error("refresh token is missing");
    }

    try {
        jwt.verify(refreshToken, SECRETE_KEY);
    }
    catch {
        throw new Error("refreshtoken is corrupted");
    }

    const { userId } = jwt.decode(accessToken) as AccessPayload;
    console.log(userId);
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error('there is no such user')
    }
    if (refreshToken !== user.refreshToken) {
        throw Error('refresh token is not valid')
    }

    const newAccessToken = jwt.sign({ userId: user._id }, SECRETE_KEY, { expiresIn: ACCESS_LIFE_TIME });
    const newRefreshToken = jwt.sign({ userId: user._id }, SECRETE_KEY, { expiresIn: REFRESH_LIFE_TIME });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("accessToken", newAccessToken);
    res.cookie("refreshToken", newRefreshToken);

    res.locals.user = user;
    const wallet = await WalletModel.findOne({ owner: user._id });
    res.locals.wallet = wallet;

    next();
}



export const authMiddlewares = [authMiddleware, refreshMiddleware];