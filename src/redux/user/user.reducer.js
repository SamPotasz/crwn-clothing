const INITIAL_STATE = {
    currentUser: null
}

//create an enum
export const USER_ACTION_TYPES = Object.freeze({
    SET_CURR_USER: Symbol('set the current user'),
});

/*
 * state is passed from redux store at time of action firing
 */
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_ACTION_TYPES.SET_CURR_USER:
            return {
                ...state,
                currentUser: action.payload
            } 

        default: return state;
    }
}

export default userReducer;