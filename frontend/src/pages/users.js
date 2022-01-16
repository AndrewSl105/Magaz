import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from 'src/redux/actions/userActions';


const Users = () => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList;

    useEffect(() => {
        dispatch(listUsers(dispatch));
      }, [dispatch]);

      console.log(userList)
      
    return (
        <div>
            {

            }
        </div>
    )
}

export default Users
