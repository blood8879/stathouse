import { Menu } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import { USER_SERVER } from '../../../Config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RightMenu(props) {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if(response.status === 200) {
                navigate('/login')
            } else {
                alert('로그아웃에 실패했습니다.')
            }
        })
    }
    
    if (user.userData && !user.userData.isAuth) {
        return(
            <Menu mode={props.mode}>
                <Menu.Item key="signin">
                    <a href="/login">Login</a>
                </Menu.Item>
                <Menu.Item key="register">
                    <a href='/register'>회원가입</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return(
            <Menu mode={props.mode}>
                <Menu.Item key="addTeam">
                    <a href="/team/register">팀등록</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default RightMenu;