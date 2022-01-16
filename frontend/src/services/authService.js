import { logout } from "src/redux/actions/userActions";
import { USER_LOGIN_SUCCESS } from "src/redux/constants/userConstants";


export function checkAutoLogin(dispatch) {
    const tokenDetailsString = localStorage.getItem('userInfo');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout());
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);

    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: tokenDetails,
    })
}