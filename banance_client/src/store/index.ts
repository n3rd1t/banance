import { combineReducers, createStore } from '@reduxjs/toolkit'
import { setLocalStorageItem } from '../hooks/useLocalStorageEffect/setLocalStorageItem';

export const CHANCHE_CUR = "CHANCHE_CUR";

interface generalAction {
  type: string,
}

interface currencyStateInterface {
  currency: string
}
const defaultCurrencyState: currencyStateInterface = {
  currency: "usd",
}

/* interface accessStateInterface {
  access: string,
}
const defaultAccessState: accessStateInterface = {
  access: '',
}

interface refreshStateInterface {
  refresh: string,
}
const defaultRefreshState: refreshStateInterface = {
  refresh: '',
} */



const changeCurrency = (state = defaultCurrencyState, action: generalAction) => {
  console.log(action.type);
  switch (action.type){
    case "USD":
      setLocalStorageItem("currency", "usd");
      return { ...state, currency: "usd"}
    case "CNY":
      setLocalStorageItem("currency", "cny");
      return { ...state, currency: "cny"}
    case "EUR":
      setLocalStorageItem("currency", "eur");
      return { ...state, currency: "eur"}
    case "IDR":
      setLocalStorageItem("currency", "idr");
      return { ...state, currency: "idr"}
    case "JPY":
      setLocalStorageItem("currency", "jpy");
      return { ...state, currency: "jpy"}
    case "KRW":
      setLocalStorageItem("currency", "krw");
      return { ...state, currency: "krw"}
    case "RUB":
      setLocalStorageItem("currency", "rub");
      return { ...state, currency: "rub"}
    case "TWD":
      setLocalStorageItem("currency", "twd");
      return { ...state, currency: "twd"}
    default:
      return state
  }
}

/* const changeAccess = (state = defaultAccessState, action: generalAction) => {
  if (action.type === CHANCHE_ACC) {
    return { ...state, access: action.payload }
  }
  return state;
}

const changeRefresh = (state = defaultRefreshState, action: generalAction) => {
  if (action.type === CHANCHE_REF) {
    return { ...state, refresh: action.payload }
  }
  return state;
} */



const rootReducer = combineReducers({
  currency: changeCurrency,
  /* access: changeAccess,
  refresh: changeRefresh, */
})



export const store = createStore(rootReducer);
export type ReducerState = ReturnType<typeof rootReducer>

/* const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    currency: "usd"
  },
  reducers: {
    changeCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  }
})

export const { changeCurrency } = counterSlice.actions

export const store = configureStore({
  reducer: counterSlice.reducer
})

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))

store.dispatch(changeCurrency()); */