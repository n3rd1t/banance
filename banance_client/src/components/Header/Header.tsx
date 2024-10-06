import { Fragment } from "react/jsx-runtime";
import style from "./Header.module.css";
import { useEffect, useRef, useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { NavLink, Outlet } from "react-router-dom";
import images from "../../images/images"
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector/useTypedSelector";
import { CHANCHE_CUR } from "../../store";
import { SignInResponse, UserData, WalletData, apiRequsts } from "../../Api";
import { setLocalStorageItem } from "../../hooks/useLocalStorageEffect/setLocalStorageItem";
import { startWS } from "../../WS/WS";
import useLocalStorageEffect from "../../hooks/useLocalStorageEffect/useLocalStorageEffect";


export const Header = () => {
    //useState`ы
    const [variantsTrade, setVariantsTrade] = useState<boolean>(true);
    const [variantsBuy, setVariantsBuy] = useState<boolean>(true);
    const [popupLog, setPopupLog] = useState<boolean>(true);
    const [popupReg, setPopupReg] = useState<boolean>(true);
    const [registered, setRegistered] = useState<boolean>(true);
    const [vari, setVari] = useState<boolean>(true);
    const [arrow, setArrow] = useState<boolean>(true);
    const [variantsCur, setVariantsCur] = useState<boolean>(true);

    const [isUpTrade, setIsUpTrade] = useState<boolean>(true);
    const [isUpBuy, setIsUpBuy] = useState<boolean>(true);

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [logCounter, setLogCounter] = useState<number>(0);
    const [userData, setUserData] = useState<UserData>();
    const [walletData, setWalletData] = useState<WalletData>();

    const [usernameLogin, setUsernameLogin] = useState<string>('');
    const [passwordLogin, setPasswordLogin] = useState<string>('');
    const [usernameRegistration, setUsernameRegistration] = useState<string>('');
    const [passwordRegistration, setPasswordRegistration] = useState<string>('');


    //useRef`ы
    const currencyNameRef = useRef<HTMLDivElement>(null);
    /* const wsConnection = useRef<WebSocket>(); */


    //STORE
    const dispatch = useDispatch();
    const { currency } = useTypedSelector(state => state.currency);


    //Functions
    const dropDown = (event: MouseEvent<HTMLDivElement>, setIsUp: Dispatch<SetStateAction<boolean>>, setVariants: Dispatch<SetStateAction<boolean>>): void => {
        event.currentTarget.style.color = 'rgb(181,181,181)';
        setIsUp(false);
        setVariants(false);
    }
    const shrinkBack =  (event: MouseEvent<HTMLDivElement>, setIsUp: Dispatch<SetStateAction<boolean>>, setVariants: Dispatch<SetStateAction<boolean>>) => {
        event.currentTarget.style.color = '#EAECEF';
        setIsUp(true);
        setVariants(true);
    }
      
    const opening = (setPopup: Dispatch<SetStateAction<boolean>>): void => {
        setPopup(false);
        document.body.style.overflowY = 'hidden';
    }
    const closing = (setPopup: Dispatch<SetStateAction<boolean>>): void => {
        setPopup(true);
        document.body.style.overflowY = 'auto';
        setUsernameLogin('');
        setPasswordLogin('');
        setUsernameRegistration('');
        setPasswordRegistration('');
    }

    const setCurrency = (payload: string) => {
        dispatch({type: payload});
    }

    const toLogout = () => {
        apiRequsts.toLogout();
        setIsSelected(false);
        setRegistered(true);
        setLogCounter(0);
    }

    const toSignIn = async () => {
        const response: SignInResponse = await apiRequsts.signIn(usernameLogin, passwordLogin);
        setLogCounter(1);
        setUserData(response.userData?.data);
        console.log("afte setUserData ", response.userData.data);
        setWalletData(response.walletData?.data);
        console.log("afte setWalletData ", response.walletData.data);
        closing(setPopupLog);
    }
    const toSignUp = async () => {
        const response: SignInResponse = await apiRequsts.signUp(usernameRegistration, passwordRegistration);
        setLogCounter(1);
        setUserData(response.userData.data);
        console.log("afte setUserData ", response.userData.data);
        setWalletData(response.walletData?.data);
        console.log("afte setWalletData ", response.walletData.data);
        closing(setPopupReg);
    }

    /* async function fetchData() {
        const {data} = await apiRequsts.getUserInfo();
        return data;
    } */


    //useEffect`ы
    useEffect(() => {
        if (currencyNameRef.current) {
            currencyNameRef.current.textContent = currency;
        }
    }, [currency]);

    useEffect(() => {
        if (logCounter === 1) {
            /* const userResponse = fetchData(); */
            setIsSelected(true);
            setRegistered(false);

            /* setUserData(userResponse?.data?.username);
            setWalletData(apiRequsts.getUserWallet()); */
        }
    }, [logCounter]);

    let wsConnection: WebSocket;
    useEffect(() => {
        setLocalStorageItem("currency", "usd");
        wsConnection = new WebSocket("ws://localhost:2023");
        let currentCurrency = localStorage.getItem("currency");
        console.log(currentCurrency);

        wsConnection.onopen = () => {
            console.log("Connection created");
            if (currentCurrency !== null) {
                console.log('ON OPEN');
                wsConnection.send(JSON.stringify(currentCurrency));
            }
        }

        wsConnection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("ON MESSAGE: ", data);
            setLocalStorageItem("btc", JSON.stringify(data[0].bitcoin));
            setLocalStorageItem("eth", JSON.stringify(data[1].ethereum));
            setLocalStorageItem("dot", JSON.stringify(data[2].polkadot));
            setLocalStorageItem("atom", JSON.stringify(data[3].cosmos));
            setLocalStorageItem("xch", JSON.stringify(data[4].chia));
        }

        wsConnection.onclose = () => {
            console.log("Server have closed");
        }

        wsConnection.onerror = () => {
            console.log("Server throwed the error");
        }
        
    }, []);


    //CUSTOM
    useLocalStorageEffect((key: string, New: string, old: string) => {
        console.log('the data I send: ', New);
        wsConnection.send(JSON.stringify(New));
    }, ["currency"]);



    return (
        <Fragment>
            <div className={style.header}>
                <NavLink to={"/"} className={style.link}><img src={images.logo} alt="logo"/>BANANCE</NavLink>

                <div className={style.tools}>
                    <div onMouseMove={(e) => dropDown(e, setIsUpTrade, setVariantsTrade)} onMouseOut={(e) => shrinkBack(e, setIsUpTrade, setVariantsTrade)} className={style.trade}>
                        Trade <i className={isUpTrade ? style.carretUp : style.carretDown}></i>
                        <div className={`${style.variants} ${variantsTrade ? style.befor : ""}`}>
                            <NavLink to={"trade"} className={`${style.link} ${style.spot}`}>
                                <img src={images.spot2} alt=""/>    
                                <div className={style.conteiner}>
                                    <div className={style.text}>Spot</div>
                                    <div className={style.sub}>Trade crypto with advanced tools</div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div onMouseMove={(e) => dropDown(e, setIsUpBuy, setVariantsBuy)} onMouseOut={(e) => shrinkBack(e, setIsUpBuy, setVariantsBuy)} className={style.buy}>
                        Buy Crypto <i className={isUpBuy ? style.carretUp : style.carretDown}></i>
                        <div className={`${style.variants} ${variantsBuy ? style.befor : ""}`}>
                            <NavLink to={"/fiat"} className={`${style.buyPage} ${style.link}`}>
                                <img src={images.buyP} alt=""/>
                                <div className={style.conteiner}>
                                    <div className={style.text}>Cash Balance</div>
                                    <div className={style.sub}>Buy Crypto with your fiat balance</div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className={style.userCorner}>
                    <div className={`${style.unregistered} ${isSelected ? style.befor : style.after}`}>
                        <div className={style.log}>
                            <div onClick={() => opening(setPopupLog)} className={style.text}>Log In</div>
                            <div className={`${style.popup} ${popupLog ? style.befor1 : style.after1}`}>
                                <div className={style.shell}>
                                    <div /* onBlur={() => closing(setPopupLog)} */ className={style.body}>
                                        <button onClick={() => closing(setPopupLog)} className={style.x}></button>
                                        <div className={style.shell1}>
                                            <div className={style.content}>
                                                <h1>Banance Login</h1>
                                                <div className={style.cont}>
                                                    <label htmlFor="inputPassword5" /* className={style.form-label} */>User Name</label>
                                                    <input
                                                        type="form-control"
                                                        id="inputPassword5"
                                                        className={/*style.form-control*/style.lName}
                                                        value={usernameLogin}
                                                        onChange={(e) => {setUsernameLogin(e.target.value)}}
                                                    />
                                                </div>
                                                <div className={style.cont}>
                                                    <label htmlFor="inputPassword5" /* className={style.form-label} */>Password</label>
                                                    <input
                                                        type="password"
                                                        id="inputPassword5"
                                                        className={/*style.form-control*/style.lPassword}
                                                        value={passwordLogin}
                                                        onChange={(e) => {setPasswordLogin(e.target.value)}}
                                                    />
                                                </div>
                                                <button onClick={toSignIn} type="button" className={`${style.secondary} ${style.bLog}`}>Log In</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${style.secondary} ${style.reg}`} role="button">
                            <div onClick={() => opening(setPopupReg)} className={style.text}>Register</div>
                            <div className={`${style.popup} ${popupReg ? style.befor1 : style.after1}`}>
                                <div className={style.shell}>
                                    <div className={style.body}>
                                        <button onClick={() => closing(setPopupReg)} className={style.x}></button>
                                        <div className={style.shell1}>
                                            <div className={style.content}>
                                                <h1>Banance Registration</h1>
                                                <div className={style.cont}>
                                                    <label htmlFor="inputPassword5" /* className={style.form-label} */>User Name</label>
                                                    <input
                                                        type="form-control"
                                                        id="inputPassword5"
                                                        className={/*style.form-control*/style.rName}
                                                        value={usernameRegistration}
                                                        onChange={(e) => {setUsernameRegistration(e.target.value)}}
                                                    />
                                                </div>
                                                <div className={style.cont}>
                                                    <label htmlFor="inputPassword5" /* className={style.form-label} */>Password</label>
                                                    <input
                                                        type="password"
                                                        id="inputPassword5"
                                                        className={/*style.form-control*/ style.rPassword}
                                                        value={passwordRegistration}
                                                        onChange={(e) => {setPasswordRegistration(e.target.value)}}
                                                    />
                                                </div>
                                                <button onClick={toSignUp} type="button" className={`${style.secondary} ${style.bReg}`}>Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onMouseOver={() => {setVari(false)}} onMouseOut={() => {setVari(true)}} className={`${style.registered} ${registered ? style.befor : ''}`}>
                        <img src={images.account} alt="account"/>
                        <div style={{marginRight:"4px"}} className={style.text}>{userData?.username}</div>
                        <img onClick={toLogout} src={images.logout} className={style.logout} alt="logout"/>
                        <div className={`${style.vari} ${vari ? style.befor : ""}`}>
                            <div className={style.item}>
                                <div className={style.default}>Currency:</div>
                                <div className={style.text}>{walletData?.usd}</div>
                            </div>
                            <div className={style.item}>
                                <div className={style.default}>Bitcoin:</div>
                                <div className={style.text}>{walletData?.btc}</div>
                            </div>
                            <div className={style.item}>
                                <div className={style.default}>Ethereum:</div>
                                <div className={style.text}>{walletData?.eth}</div>
                            </div>
                            <div className={style.item}>
                                <div className={style.default}>Polkadot:</div>
                                <div className={style.text}>{walletData?.dot}</div>
                            </div>
                            <div className={style.item}>
                                <div className={style.default}>Cosmos:</div>
                                <div className={style.text}>{walletData?.atom}</div>
                            </div>
                            <div className={style.item}>
                                <div className={style.default}>Chia:</div>
                                <div className={style.text}>{walletData?.xch}</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.decoration1}></div>
                    <div className={style.currency}>
                        <div onClick={() => opening(setVariantsCur)} ref={currencyNameRef} className={style.text}></div>
                        <div className={`${style.popup} ${variantsCur ? style.befor : style.after}`}>
                            <div></div>
                            <div className={style.pBody}>
                                <button onClick={() => closing(setVariantsCur)} className={style.x}></button>
                                <div className={style.pTitle}>Choose a currency</div>
                                <ul>
                                    <li onClick={() => {closing(setVariantsCur); setCurrency("CNY")}} className={style.cny}>CNY - ¥</li>
                                    <li onClick={() => {closing(setVariantsCur); setCurrency("EUR")}} className={style.eur}>EUR - €</li>
                                    <li onClick={() => {closing(setVariantsCur); setCurrency("IDR")}} className={style.idr}>IDR - Rp</li>
                                    <li onClick={() => {closing(setVariantsCur); setCurrency("JPY")}} className={style.jpy}>JPY - ¥</li>
                                    <li onClick={() => {closing(setVariantsCur); setCurrency("KRW")}} className={style.krw}>KRW - ₩</li>
                                    <li onClick={() => {closing(setVariantsCur); setCurrency("RUB")}} className={style.rub}>RUB - ₽</li>
                                    <li onClick={() => {closing(setVariantsCur); setCurrency("TWD")}} className={style.twd}>TWD - NT$</li>
                                    <li onClick={() => {closing(setVariantsCur); setCurrency("USD")}} className={style.usd}>USD - $</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.decoration1}></div>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}