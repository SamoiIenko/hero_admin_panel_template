const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
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
                filteredHeroes: state.activeFilter === 'all' ?
                                action.payload :
                                action.payload.filter(item => item.element === state.activeFilter),
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
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
            } 
        case 'HERO_ADDED':
            const heroAdded = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: heroAdded,
                filteredHeroes: state.activeFilter === 'all' ?
                                heroAdded :
                                heroAdded.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_DELETED':
            const heroFilter = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: heroFilter,
                filteredHeroes: state.activeFilter === 'all' ? 
                                heroFilter : 
                                heroFilter.filter(item => item.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;