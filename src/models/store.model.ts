import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { TAppDispatch, TRootState } from '../index';

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export const useDispatch: () => TAppDispatch = dispatchHook
