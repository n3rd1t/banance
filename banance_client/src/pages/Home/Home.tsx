import { Fragment } from "react/jsx-runtime";
import style from "./Home.module.css"
import { NavLink } from "react-router-dom";
import images from "../../images/images"

export const Home = () => {



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
                            <div className={style.price}></div>
                            <div className={style.change}></div>
                            <div className={style.cap}></div>
                        </NavLink>
                        <NavLink to={'/'} className={`${style.s2} ${style.link} ${style.slot}`}>
                            <div className={`${style.face2} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                <div className={style.newName}>Ethereum</div>
                                    <div className={style.newBrand}>ETH</div>
                                </div>
                            </div>
                            <div className={style.price}></div>
                            <div className={style.change}></div>
                            <div className={style.cap}></div>
                        </NavLink>
                        <NavLink to={'/'} className={`${style.s3} ${style.link} ${style.slot}`}>
                            <div className={`${style.face3} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                <div className={style.newName}>Polkadot</div>
                                    <div className={style.newBrand}>DOT</div>
                                </div>
                            </div>
                            <div className={style.price}></div>
                            <div className={style.change}></div>
                            <div className={style.cap}></div>
                        </NavLink>
                        <NavLink to={'/'} className={`${style.s4} ${style.link} ${style.slot}`}>
                            <div className={`${style.face4} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                <div className={style.newName}>Cosmos</div>
                                    <div className={style.newBrand}>ATOM</div>
                                </div>
                            </div>
                            <div className={style.price}></div>
                            <div className={style.change}></div>
                            <div className={style.cap}></div>
                        </NavLink>
                        <NavLink to={'/'} className={`${style.s5} ${style.link} ${style.slot}`}>
                            <div className={`${style.face5} ${style.face}`}>
                                <div className={style.icon}></div>
                                <div className={style.wrapped}>
                                <div className={style.newName}>Chia</div>
                                    <div className={style.newBrand}>XCH</div>
                                </div>
                            </div>
                            <div className={style.price}></div>
                            <div className={style.change}></div>
                            <div className={style.cap}></div>
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