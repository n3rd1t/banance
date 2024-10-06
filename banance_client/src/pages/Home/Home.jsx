import { Fragment } from "react/jsx-runtime";
import style from "./Home.module.css"
import { NavLink } from "react-router-dom";
import images from "../../images/images"
import useLocalStorageEffect from "../../hooks/useLocalStorageEffect/useLocalStorageEffect";
import { useRef } from "react";

export const Home = () => {

    const btcPrice = useRef(null);
    const btcMarketCup = useRef(null);
    const btcChange = useRef(null);
    const ethPrice = useRef(null);
    const ethMarketCup = useRef(null);
    const ethChange = useRef(null);
    const dotPrice = useRef(null);
    const dotMarketCup = useRef(null);
    const dotChange = useRef(null);
    const atomPrice = useRef(null);
    const atomMarketCup = useRef(null);
    const atomChange = useRef(null);
    const xchPrice = useRef(null);
    const xchMarketCup = useRef(null);
    const xchChange = useRef(null);



    const changingValues = (key, tokenObj) => {
    switch (key) {
        case "bitcoin":
            if (btcPrice.current !== null) {
                btcPrice.current.textContent = tokenObj.cur;
            }
            if (btcChange.current !== null) {
                btcChange.current.textContent = tokenObj.cur_24h_change;
            }
            if (btcMarketCup.current !== null) {
                btcMarketCup.current.textContent = tokenObj.cur_market_cap;
            }
            break;
        case "ethereum":
            if (ethPrice.current !== null) {
                ethPrice.current.textContent = tokenObj.cur;
            }
            if (ethChange.current !== null) {
                ethChange.current.textContent = tokenObj.cur_24h_change;
            }
            if (ethMarketCup.current !== null) {
                ethMarketCup.current.textContent = tokenObj.cur_market_cap;
            }
            break;
        case "polkadot":
            if (dotPrice.current !== null) {
                dotPrice.current.textContent = tokenObj.cur;
            }
            if (dotChange.current !== null) {
                dotChange.current.textContent = tokenObj.cur_24h_change;
            }
            if (dotMarketCup.current !== null) {
                dotMarketCup.current.textContent = tokenObj.cur_market_cap;
            }
            break;
        case "cosmos":
            if (atomPrice.current !== null) {
                atomPrice.current.textContent = tokenObj.cur;
            }
            if (atomChange.current !== null) {
                atomChange.current.textContent = tokenObj.cur_24h_change;
            }
            if (atomMarketCup.current !== null) {
                atomMarketCup.current.textContent = tokenObj.cur_market_cap;
            }
            break;
        case "chia":
            if (xchPrice.current !== null) {
                xchPrice.current.textContent = tokenObj.cur;
            }
            if (xchChange.current !== null) {
                xchChange.current.textContent = tokenObj.cur_24h_change;
            }
            if (xchMarketCup.current !== null) {
                xchMarketCup.current.textContent = tokenObj.cur_market_cap;
            }
            break;
        default:
            break;
    }
}


    const preparingValues = (key, value) => {
        const currency = localStorage.getItem("currency");
        switch (currency) {
            case "usd":
                const {usd, usd_market_cap, usd_24h_vol, usd_24h_change} = JSON.parse(value);
                changingValues(key, {usd, usd_market_cap, usd_24h_vol, usd_24h_change});
                break;
            case "cny":
                const {cny, cny_market_cap, cny_24h_vol, cny_24h_change} = JSON.parse(value);
                changingValues(key, {cny, cny_market_cap, cny_24h_vol, cny_24h_change});
                break;
            case "eur":
                const {eur, eur_market_cap, eur_24h_vol, eur_24h_change} = JSON.parse(value);
                changingValues(key, {eur, eur_market_cap, eur_24h_vol, eur_24h_change});
                break;
            case "idr":
                const {idr, idr_market_cap, idr_24h_vol, idr_24h_change} = JSON.parse(value);
                changingValues(key, {idr, idr_market_cap, idr_24h_vol, idr_24h_change});
                break;
            case "jpy":
                const {jpy, jpy_market_cap, jpy_24h_vol, jpy_24h_change} = JSON.parse(value);
                changingValues(key, {jpy, jpy_market_cap, jpy_24h_vol, jpy_24h_change});
                break;
            case "krw":
                const {krw, krw_market_cap, krw_24h_vol, krw_24h_change} = JSON.parse(value);
                changingValues(key, {krw, krw_market_cap, krw_24h_vol, krw_24h_change});
                break;
            case "rub":
                const {rub, rub_market_cap, rub_24h_vol, rub_24h_change} = JSON.parse(value);
                changingValues(key, {rub, rub_market_cap, rub_24h_vol, rub_24h_change});
                break;
            case "twd":
                const {twd, twd_market_cap, twd_24h_vol, twd_24h_change} = JSON.parse(value);
                changingValues(key, {twd, twd_market_cap, twd_24h_vol, twd_24h_change});
                break;
            default:
                break;
        }
    }



    useLocalStorageEffect((key, newValue, oldValue) => {
        preparingValues(key, newValue);
    }, ["bitcoin", "ethereum", "polkadot", "cosmos", "chia"]);


    return (
        <Fragment>
            <div className={style.main}>
                <div className={style.ifUnregistered}>
                    <div className={style.content}>
                        <div className={style.union}>
                            <div className={style.form}>
                                <h1>Buy, trade and hold 5 cryptocurrencies on Banance</h1>
                                <NavLink to={'/'} className={`${style.offer} ${style.link}`}>
                                    <img className={style.gift} src={images.gift}/> Trade Bitcoin for free <i className={style.right}></i>
                                </NavLink>
                                <button className={`${style.signF} ${style.secondary}`}>
                                    <img className={style.person} src={images.person}/>Sign Up
                                </button>
                            </div>
                            <div className={style.nft}><img src={images.bayc} alt=""/></div>
                        </div>
                        <div className={style.achivements}>
                            <div className={style.achivement}>
                                <div className={style.h1}>$0 billion</div>
                                <div className={style.p}>24h trading volume on Banance exchange</div>
                            </div>
                            <div className={style.achivement}>
                                <div className={style.h1}>4+ (5)</div>
                                <div className={style.p}>Cryptocurrencies listed</div>
                            </div>
                            <div className={style.achivement}>
                                <div className={style.h1}>0 million</div>
                                <div className={style.p}>Registered users</div>
                            </div>
                            <div className={style.achivement}>
                                <div className={style.h1}>0.10%</div>
                                <div className={style.p}>Lowest transaction fees</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={style.market}>
                    <div className={style.content}>
                        <div className={style.head}>Popular cryptocurrencies</div>
                        <div className={style.title}>
                            <div className={style.sub1}>Name</div>
                            <div className={style.sub2}>Last Price</div>
                            <div className={style.sub3}>24h Change</div>
                            <div className={style.sub4}>Market Cap</div>
                        </div>
                        <NavLink to={'/'} className={`${style.s1} ${style.link} ${style.slot}`}>
                            <div className={`${style.face1} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                    <div className={style.newName}>Bitcoin</div>
                                    <div className={style.newBrand}>BTC</div>
                                </div>
                            </div>
                            <div ref={btcPrice} className={style.price}></div>
                            <div ref={btcChange} className={style.change}></div>
                            <div ref={btcMarketCup} className={style.cap}></div>
                        </NavLink>
                        <NavLink to={'/'} className={`${style.s2} ${style.link} ${style.slot}`}>
                            <div className={`${style.face2} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                <div className={style.newName}>Ethereum</div>
                                    <div className={style.newBrand}>ETH</div>
                                </div>
                            </div>
                            <div ref={ethPrice} className={style.price}></div>
                            <div ref={ethChange} className={style.change}></div>
                            <div ref={ethMarketCup} className={style.cap}></div>
                        </NavLink>
                        <NavLink to={'/'} className={`${style.s3} ${style.link} ${style.slot}`}>
                            <div className={`${style.face3} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                <div className={style.newName}>Polkadot</div>
                                    <div className={style.newBrand}>DOT</div>
                                </div>
                            </div>
                            <div ref={dotPrice} className={style.price}></div>
                            <div ref={dotChange} className={style.change}></div>
                            <div ref={dotMarketCup} className={style.cap}></div>
                        </NavLink>
                        <NavLink to={'/'} className={`${style.s4} ${style.link} ${style.slot}`}>
                            <div className={`${style.face4} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                <div className={style.newName}>Cosmos</div>
                                    <div className={style.newBrand}>ATOM</div>
                                </div>
                            </div>
                            <div ref={atomPrice} className={style.price}></div>
                            <div ref={atomChange} className={style.change}></div>
                            <div ref={atomMarketCup} className={style.cap}></div>
                        </NavLink>
                        <NavLink to={'/'} className={`${style.s5} ${style.link} ${style.slot}`}>
                            <div className={`${style.face5} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                <div className={style.newName}>Chia</div>
                                    <div className={style.newBrand}>XCH</div>
                                </div>
                            </div>
                            <div ref={xchPrice} className={style.price}></div>
                            <div ref={xchChange} className={style.change}></div>
                            <div ref={xchMarketCup} className={style.cap}></div>
                        </NavLink>
                        <div className={style.group}>
                            <div className={style.head}>Sign up now to build your own portfolio for free!</div>
                            <NavLink to={'/'} className={`${style.signM} ${style.link}`}>Get Started</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}