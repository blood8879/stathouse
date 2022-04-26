import React, { useEffect } from 'react'
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

function LeftMenu(props) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    // if((user.userData && !user.userData.teams.length)) {
    //     return (
    //         <div>새로운 팀을 찾아 가입해주세요.</div>
    //     )
    // } else {
        
    //     return (
    //         <div>팀있음</div>
    //     )
    // }
  return (
    //   로그인 상태 && 가입한 팀이 있으면 가입 팀 보여주기 , 가입한 팀이 없을경우 전체 팀 리스트 보여주고 검색메뉴.
    <Menu mode={props.mode}>
        <Menu.Item key="overview">
            <a href='/'>Overview</a>
        </Menu.Item>
        <Menu.Item key="squad">
            <a href='/'>Squad</a>
        </Menu.Item>
        <Menu.Item key="fixtures">
            <a href='/'>Fixtures</a>
        </Menu.Item>
        <Menu.Item key="results">
            <a href='/'>Results</a>
        </Menu.Item>
        <Menu.Item key="stats">
            <a href='/'>Stats</a>
        </Menu.Item>
        <Menu.Item key="stadium">
            <a href='/'>Stadium</a>
        </Menu.Item>
        <Menu.Item key="season_history">
            <a href='/'>Season History</a>
        </Menu.Item>
    </Menu>
    
  )
}

export default LeftMenu