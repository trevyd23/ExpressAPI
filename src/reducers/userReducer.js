import types from '../actions/types';

const initialState = {
    user: {},
    token: '',
    isFetching: false,
    isError: false,
    errorMessage: ''
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.USER_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        default: return state
    }

}
