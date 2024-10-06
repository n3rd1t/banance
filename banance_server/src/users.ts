import { Router } from "express";
import mongoose, { HydratedDocument, Schema } from "mongoose";
import { object, string } from "yup";
import { authMiddlewares } from "./auth";
import { validationMiddleware } from "./validation";
/* import axios from "axios";
import { PORT } from "./app"; */

export const usersRouter = Router();



export interface User {
    username: string,
    password: string,
    refreshToken: string,
    createdAt: Date
}



export type UserDocument = HydratedDocument<User>;



const UserSchema = new Schema<User>({
    username: { type: String, minlength: 4, maxlength: 12, required: true, unique: true },
    password: { type: String, minlength: 4, maxlength: 24, required: true },
    refreshToken: { type: String }, 
    createdAt: { type: Date, default: Date.now, required: true }
});



export const UserModel = mongoose.model("Users", UserSchema);



usersRouter.get('/', ...authMiddlewares, async (req, res, next) => {
    const users = await UserModel.find();
  
    res.json(users);
});



usersRouter.get('/profile', ...authMiddlewares, (req, res) => {
    const { user } = res.locals;
  
    const { password: _password, _id: _id, ...otherUserData } = (user as UserDocument).toObject();

    res.json(otherUserData);
});




type CreateUserPayload = Pick<User, 'password' | 'username'>;




const createUserPayloadValidationSchema = object<CreateUserPayload>({
    password: string().min(4, 'Password is too short').max(24).required('Where is the password?'),
    username: string().min(4).max(12).required(),
});


  
usersRouter.post("/sign-up",
    validationMiddleware(createUserPayloadValidationSchema, 'body'),
    async (req, res, next) => {
        const payload: CreateUserPayload = req.body;
  
        const { username, password } = payload;
  
        const newUser = await UserModel.create({ username, password });
        console.log("Done with sign-up");


        res.cookie("test", "TestCookie");


        // Это не працуе. много времени потратил, но так и не починил. Cookie в wallet/ не видит
        /* await axios.post(`//localhost:${PORT}/auth/signin`, {
            password: password,
            username: username
        });
        console.log("Done with sign-in");



        await axios.post(`//localhost:${PORT}/wallet/`, {});
        console.log("Done with wallet"); */


        res.json(newUser);
        next();
    }
);