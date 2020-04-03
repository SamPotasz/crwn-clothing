import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

/*
 * state is passed from redux store at time of action firing
 */
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SET_CURR_USER:
            return {
                ...state,
                currentUser: action.payload
            } 

        default: return state;
    }
}

export default userReducer;