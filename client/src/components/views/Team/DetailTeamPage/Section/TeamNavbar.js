import React from 'react'
import { Button, Menu } from 'antd'
import TeamLeftMenu from './TeamLeftMenu'
import axios from 'axios'
import { useSelector } from 'react-redux'

function TeamNavbar(props) {
    const user = useSelector(state => state.user)

    const joinTeamHandler = (event) => {
        const body = {
            _id: user.userData._id,
            teamId: props.teamId
        }

        axios.post("/api/users/joinTeam", body)
            .then(response => {
                if(response.data.success) {
                    alert('팀가입성공')
                } else {
                    alert('팀가입실패')
                }
            })
    }

    return (
        <div className='teammenu_bgbar'>
            <div style={{ float: 'left', display: 'inline-block' }}>
                <TeamLeftMenu mode="horizontal"/>
                <Button onClick={joinTeamHandler}>팀가입신청</Button>
            </div>
        </div>
    )
}

export default TeamNavbar

{/* <nav className='menu' style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
        <div className='menu__title'>
            <a href='/'>STATHOUSE</a>
        </div>
        <div className='menu__container'>
            <div className='menu_left'>
                <LeftMenu mode="horizontal" />
            </div>
            <div className='menu_right'>
                <RightMenu mode="horizontal" />
            </div>
        </div>
    </nav> */}