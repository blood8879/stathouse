import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {
    // null => 아무나 출입가능 페이지
    // true => 로그인한 유저만 출입가능 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        navigate('/login')
                    }
                } else {
                    // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        console.log("로그인한상태1",response)
                        navigate('/')
                    } else {
                        if (option === false) {
                            console.log("로그인한상태2",response)
                            navigate('/')
                        }
                    }
                }
            })
            
        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}