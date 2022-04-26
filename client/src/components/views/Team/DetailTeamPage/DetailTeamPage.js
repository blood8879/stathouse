import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Row } from 'antd';
import TeamNavbar from './Section/TeamNavbar';

function DetailTeamPage(props) {
    const { teamId } = useParams();

    const [Team, setTeam] = useState({})

    useEffect(() => {
        axios.get(`/api/teams/team_by_id?id=${teamId}&type=single`)
            .then(response => {
                setTeam(response.data[0])
            })
            .catch(err => alert(err))
    },[])

    return (
        <nav className='menu' style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
            <div className='menu_container'>
                <TeamNavbar teamId={teamId} mode="horizontal" />
            </div>
        </nav>
        
    )
}

export default DetailTeamPage