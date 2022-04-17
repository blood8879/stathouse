import React from 'react'
import { useSelector } from 'react-redux'

function LandingPage(props) {
  const user = useSelector(state => state.user)

  if(user.userData && !user.userData.isAuth) {
    return (
      <div>LandingPage</div>
    )
  } else {
    return (
      <div>로그인시 랜딩페이지</div>
    )
  }
  
}

export default LandingPage