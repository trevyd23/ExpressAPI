import types from '../actions/types';

export const itemInitialState = {
    user: {
        token: localStorage.getItem('token')
    },
    items: [],
    isFetching: false,
    isError: false,
    errorMessage: ''
}

export default function (state = itemInitialState, action) {
    switch (action.type) {
        case types.GET_ITEMS:
            return {
                ...state,
                items: action.payload.items,
                isFetching: action.payload.fetching
            }
        case types.ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                isFetching: false,
                isError: false,
                errorMessage: ''

            }
        case types.UPDATE_ITEM:
            return {
                ...state,
                isFetching: false,
                isError: false,
                errorMessage: action.payload.errorMessage
            }
        case types.DELETE_ITEM:
            {
                return {
                    ...state,
                    items: state.items.filter(item => item._id !== action.payload.id),
                    isFetching: action.payload.fetching,
                    errorMessage: action.payload.errorMessage
                }

            }
        case types.ITEM_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case types.ERROR_FETCHING:
            return {
                ...state,
                isFetching: action.payload.fetching,
                isError: true,
                errorMessage: action.payload.errorMessage

            }
        default: return state
    }
}
