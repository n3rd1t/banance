import axios, { AxiosResponse } from "axios"


/* const [access, setAccess] = useState<string>(''); */



export interface UserData {
    username: string;
    refreshToken: string;
    createdAt: Date;
}
export interface WalletData {
    usd: string;
    btc: string;
    eth: string;
    dot: string;
    atom: string;
    xch: string;/* 
    owner: string,
    _id: string,
    __v: number */
}
export interface SignInResponse {
    userData: AxiosResponse<any, any>,
    walletData: AxiosResponse<any, any>,
}


const instance = axios.create({
    baseURL: "http://localhost:2024/",
    withCredentials: true,
    headers: {
        /* 
        Authorization: `Bearer ${access}`, */
    }
});

export const apiRequsts = {
    async getUserInfo() {
        const userRequest = () => {return instance.get('users/profile')}
        const data = await userRequest();
        return { data }
    },
    getUserWallet() {
        let dataA: WalletData | undefined;
        instance.get('wallet/')
        .then(({data}) => {
            console.log("wallet data ", data);
            dataA = data;
        })
        .catch(e => {return e});
        return dataA;
    },
    toLogout() {
        instance.post('auth/logout')
        .then(() => {console.log("LOGGED OUT")})
        .catch(e => {return e});
    },
    async signUp(username: string, password: string): Promise<SignInResponse> {
        const usersSignUp = () => {return instance.post('users/sign-up', { username, password })}
        const authSignIn = () => {return instance.post('auth/signin', { username, password })}
        const walletCreate = () => {return instance.post('wallet/')}
        const userData = await usersSignUp();
        console.log(userData.data.username);
        const tokensData = await authSignIn();
        const walletData = await walletCreate();
        console.log(walletData.data);
        return { userData, walletData }
    },
    async signIn(username: string, password: string): Promise<SignInResponse> {
        const authSignIn = () => {return instance.post('auth/signin', { username, password })}
        const walletRequest = () => {return instance.get('wallet/')}
        const userData = await authSignIn();
        console.log(userData.data);
        const walletData = await walletRequest();
        console.log(walletData.data);
        return { userData, walletData };
    },
}