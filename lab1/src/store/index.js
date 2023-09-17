import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { generatorReducer } from './reducers/generatorReducer';

const rootReducer = combineReducers({
    generator: generatorReducer,
})

export const store = configureStore({ reducer: rootReducer });