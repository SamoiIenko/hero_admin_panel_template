const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
            case 'FILTERS_FETCHING':
                return {
                    ...state,
                    filtersLoadingStatus: 'loading'
                }
            case 'FILTERS_FETCHED':
                return {
                    ...state,
                    filters: action.payload,
                    filtersLoadingStatus: 'idle'
                }
            case 'FILTERS_FETCHING_ERROR':
                return {
                    ...state,
                    filtersLoadingStatus: 'error'
                }
        case 'HERO_DELETED':
            const heroFilter = state.heroes.filter((item) => item.id !== action.payload);
            return {
                ...state,
                heroes: heroFilter
            }
        case 'HERO_ADDED':
            const heroAdded = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: heroAdded
            }
        default: return state
    }
}

export default reducer;