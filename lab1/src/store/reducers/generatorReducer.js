const defaultState = {
    generatedArray: [],
    estimation: {},
}

const actionsMap = new Map([
    ['SET_GENERATED_ARRAY', (state, payload) => {
        return { ...state, generatedArray: payload }
    }],
    ['SET_ESTIMATION', (state, payload) => {
        return { ...state, estimation: payload };
    }]
])

export const generatorReducer = (state = defaultState, action) => {
    if (actionsMap.has(action.type)) {
        return actionsMap.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}