import axios from 'axios'
import {
  BOARD_LIST_REQUEST,
  BOARD_LIST_SUCCESS,
  BOARD_LIST_FAIL,
} from '../constants/boardConstants'


export const boardsList = () => async (
  dispatch
) => {
  try {
    dispatch({ type: BOARD_LIST_REQUEST })
    const { data } = await axios.get(
      `/api/boards`
    )
    console.log(data)
    dispatch({
      type: BOARD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOARD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}