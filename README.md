- 추가 수정해야할 사항(front)
    - RegisterTeam.js : (ticker 5글자 이상일 경우 input 빨간색 하이라이트 처리 및 return 해주어야 함)
    - LandingPage.js : 더보기 버튼 생성 및 기능 추가
    - LandingPage.js : 카드 css 및 검색버튼 css 수정(epl 홈사이트 참조)
    - LeftMenu.js : 로그인 && 팀 있을 시 상단에 팀 리스트 뿌려주고 없을 시 팀 가입하라는 멘트 css 수정
    - TeamNavBar.js : 이미 가입한 팀이 있을 시 "팀가입신청" 버튼 안보이게 처리

- 추가 수정해야할 사항(back)
    - teams.js : 새로운 팀 생성시 owner._id 값이 members로 들어가게 수정해줘야함
    - TeamNavBar.js : 팀 가입시 Teams 안에 Member 추가