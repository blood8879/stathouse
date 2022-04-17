import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import SearchFeature from './Sections/SearchFeature'

function LandingPage(props) {
  const user = useSelector(state => state.user)
  
  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    }

    getTeams(body)
  },[])

  const [Teams, setTeams] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [SearchTerm, setSearchTerm] = useState('');

  const getTeams = (body) => {
    axios.post('/api/teams/teamlist', body)
      .then(response => {
        if(response.data.success) {
          setTeams(response.data.teamInfo)
        } else {
          alert("팀 정보를 가져오는데 실패하였습니다.")
        }
      })
  }

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      searchTerm: newSearchTerm
    }

    setSkip(0)
    setSearchTerm(newSearchTerm)
    getTeams(body)
  }

  const renderCards = Teams.map((team, index) => {
    return <Col lg={6} md={8} xs={24} key={index}>
      <Card cover={<img style={{ minHeight: '250px', maxHeight: '250px' }} src={`http://localhost:8888/${team.emblem}`} />} >
        <Meta 
          title={team.name}
          description={`${team.description}`}
        />
        {team.ticker}
      </Card>
    </Col>
  })

  if((user.userData && !user.userData.isAuth) || (user.userData && !user.userData.teams)) {
    return (
      // <div>기본 랜딩페이지 (비로그인 && 가입팀 없을시)</div>
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
          <SearchFeature 
            refreshFunction={updateSearchTerm}
          />
        </div>

        <Row gutter={[16, 16]}>
          {renderCards}
        </Row>  
      </div>
    )
  } else {
    return (
      <div>로그인시 랜딩페이지</div>
    )
  }
  
}

export default LandingPage