import {
    BOARD_LIST_REQUEST,
    BOARD_LIST_SUCCESS,
    BOARD_LIST_FAIL,
  } from '../constants/boardConstants'
  
  export const boardsListReducer = (state = { boards: [] },  action) => {
    switch (action.type) {
      case BOARD_LIST_REQUEST:
        return { loading: true, boards: [] }
      case BOARD_LIST_SUCCESS:
        return {
          loading: false,
          boards: action.payload.boards,
        }
      case BOARD_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}
  


  