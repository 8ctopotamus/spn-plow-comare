import { LS_KEY } from './index'

const updateLocalStorage = state => {
  if (window && window.localStorage) {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }
}

export default (state, action) => {
  let updatedState
  switch(action.type) {
    case 'UPDATE_SEARCH':
      updatedState = {
        ...state,
        search: action.payload,
      }
      return updatedState
    case 'GET_LOCALSTORAGE':
      if (window && window.localStorage && localStorage.getItem(LS_KEY)) {
        return JSON.parse(localStorage.getItem(LS_KEY))
      }
    default:
      return state
  }
}