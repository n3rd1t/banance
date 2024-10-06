import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ReducerState } from "../store";


export const useTypedSelector: TypedUseSelectorHook<ReducerState> = useSelector;