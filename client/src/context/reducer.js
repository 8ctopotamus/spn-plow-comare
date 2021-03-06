export default (state, action) => {
  let updatedState
  let foundIdx
  let name
  let value
  let values
  let filters
  switch(action.type) {
    case 'TOGGLE_COMPARE':
      foundIdx = state.compare.findIndex(p => p.ID === action.payload.ID)
      updatedState = {
        ...state,
        compare: foundIdx > -1
          ? state.compare.filter(p => p.ID !== action.payload.ID)
          : [...state.compare, action.payload]
      }
      return updatedState
    case 'BLADE_WIDTH_CHANGE':
      name = action.payload.name
      values = action.payload.values
      filters = {
        ...state.filters,
        [name]: [...values]
      }
      updatedState = {
        ...state,
        filters,
      } 
      return updatedState
    case 'TOGGLE_FILTER':
      name = action.payload.name
      value = action.payload.value
      filters = !state.filters[name].includes(value)
        ? {...state.filters, [name]: [...state.filters[name], value] } // add it
        : {...state.filters, [name]: state.filters[name].filter(v => v !== value)} // remove it
      updatedState = {
        ...state,
        filters,
      }
      return updatedState
    case 'UPDATE_SEARCH':
      updatedState = {
        ...state,
        search: action.payload,
      }
      return updatedState
    case 'RESET':
      updatedState = {
        ...state,
        search: '',
        compare: [],
        filters: Object.keys(state.filters).reduce((obj, key) => {
          obj[key] = []
          return obj
        }, {})
      }
      return updatedState
    case 'CHANGE_VIEW':
      return {
        ...state,
        view: state.view === 'COMPARE' ? 'SEARCH' : 'COMPARE',
      }
    case 'SET_SIDEBAR':
      return {
        ...state,
        sidebarOpen: action.payload,
      }
    default:
      return state
  }
}