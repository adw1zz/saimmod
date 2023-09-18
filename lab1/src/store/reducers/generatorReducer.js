const defaultState = {
    generatedArray: [],
    estimation: {},
    input: {
        a: 0,
        m: 0,
        n: 0,
        Rinp: 0
    },
}

const actionsMap = new Map([
    ['SET_GENERATED_ARRAY', (state, payload) => {
        return { ...state, generatedArray: payload }
    }],
    ['SET_INPUT_DATA', (state, payload) => {
        return { ...state, input: payload }
    }],
])

export const generatorReducer = (state = defaultState, action) => {
    if (actionsMap.has(action.type)) {
        return actionsMap.get(action.type)(state, action.payload);
    } else {
        return state;
    }
}