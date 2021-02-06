import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchAsyncGet, selectUsers}from './fetchSlice';

export const Fetch = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncGet())
    }, [dispatch]);

    const users = useSelector(selectUsers);

    return (<div>
        {users.map(user => (<div>{user.email} {user.name}</div>))}
    </div>);
};
