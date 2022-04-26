import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Card, Col, Row, Button } from 'antd'
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
  const [PostSize, setPostSize] = useState(0);

  const getTeams = (body) => {
    axios.post('/api/teams/teamlist', body)
      .then(response => {
        if(response.data.success) {
          if(body.loadMore) {
            setTeams([...Teams, ...response.data.teamInfo])
          } else {
            setTeams(response.data.teamInfo)
          }
          setPostSize(response.data.postSize)
        } else {
          alert("팀 정보를 가져오는데 실패하였습니다.")
        }
      })
  }

  const loadMoreHandler = () => {
    let skip = Skip + Limit

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true
    }

    getTeams(body)
    setSkip(skip)
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
      <Card 
      cover={<img style={{ minHeight: '250px', maxHeight: '250px' }} src={`http://localhost:8888/${team.emblem}`} />} 
      >
        <Meta 
          title={<a href={`/teams/${team._id}`} style={{ fontSize: '40px'}}>{team.name}</a>}
          description={`${team.description}`}
        />
        {team.ticker}
      </Card>
    </Col>
  })

  if((user.userData && !user.userData.isAuth) || (user.userData && !user.userData.teams.length)) {
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

        <br />

        {PostSize >= Limit &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={loadMoreHandler}>더보기</Button>
          </div>
        }
      </div>
    )
  } else {
    return (
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
          <SearchFeature 
            refreshFunction={updateSearchTerm}
          />
        </div>

        <Row gutter={[16, 16]}>
          {renderCards}
        </Row>

        <br />

        {PostSize >= Limit &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={loadMoreHandler}>더보기</Button>
          </div>
        }
      </div>
      // <div>로그인시 랜딩페이지</div>
    )
  }
  
}

export default LandingPage