# 포트폴리오


# FREITAG
   #### 기획
   - '프라이탁' 이라는 브랜드의 기존 소개 페이지를 나만의 스타일로 리뉴얼한 포트폴리오
   #### 정보
   - scroll 인터랙션을 활용한 리사이클 패션 브랜드 '프라이탁'의 회사소개 페이지
   #### 프로젝트 주요 기능
   - scroll에 반응하는 background-image 와 텍스트
   - IntersectionObserver를 사용하지 않고 높이 계산을 통한 scroll 이벤트
   #### 사용 기술
   - HTML, SCSS, Javascript
   #### 후기
   - 페이지의 높이를 계산하는 방식으로 구현이 되다보니 브라우저에 따라 미세한 차이가 보이게 되어 어려움이 있었고, 추후 공개될 css로 scroll 이벤트 구현이 가능해지는 부분이 Cross-Browsing에 어떠한 영향이 있을지 궁금해진다. 또한 디자이너의 도움없이 진행해보니 디자이너의 소중함과 노고에 대해 다시한번 깨닫게 되었다.
------------------------
      
# GAME (memory game)
   #### 기획
   - 강의의 도움없이 혼자서 간단한 DB를 활용해보기 위한 간단한 같은그림찾기 게임의 기록으로 실시간 순위 반영을 하는 포트폴리오
   #### 정보
   - 기록을 측정하고 랭킹을 실시간으로 반영하는 같은그림찾기 게임
   #### 프로젝트 주요 기능
   - 랜덤으로 정렬되는 카드
   - 게임 기록을 닉네임을 설정하여 랭킹에 반영(DB저장)
   - 컴포넌트간 props 전달
   - SCSS를 활용한 애니메이션 효과
   - pointer-event를 활용하여 연속 클릭으로 인해 발생되는 오류 방지
   - 모든 환경에서 이용 가능한 반응형 UI
   #### 사용 기술
   - REACT, Typescript, Node.js, Express, MongoDB, axios, styled-component, Redux
   #### 후기
   - 친구들과 내기를 위해 가볍게 만들어진 페이지지만 Typescript를 처음으로 활용해보면서 친절한 오류 메세지에 감탄을 받으면서 많이 사용되는 이유를 알게된 계기
------------------------

# UPLOAD (image upload)
   #### 기획
   - E-커머스 사이트를 구현해보기 위해 상품 이미지 업로드와 로그인정보를 활용한 좋아요 기능 포트폴리오를 구현
   #### 정보
   - 로그인 정보에 따라 이미지 업로드, 삭제, 좋아요 기능을 사용할 수 있는 상품 리스트 및 관리자 페이지
   #### 프로젝트 주요 기능
   - 회원가입 및 로그인
   - 아이디 중복체크
   - 회원가입 없이 '임시 관리자'로 로그인 하기
   - 사용 툴팁 메세지
   - 이미지 업로드 및 실시간 반영
   - 5MB의 용량제한
   - 이미지 삭제(관리자 및 임시관리자 권한으로만 가능)
   - 이미지 좋아요 기능
   - IntersectionObserver를 사용한 infinite scroll
   - react-toastify를 활용한 alert
   - 모든 환경에서 이용 가능한 반응형 UI
   #### 사용 기술
   - REACT, Node.js, Express, MongoDB, axios, styled-component, react-toastify, uuid, AWS S3
   #### 후기
   - 직접 API를 만들어보니 낯선 오류들로 인해 많은 어려움이 있었지만 API에 대해 이해를 할 수 있었고, 데이터가 저장되는 과정에서도 다양한 방식으로 암호화가 가능하면서 효율적인 데이터 관리를 통해 최적화 작업이 가능한 것을 알게되면서 최적화 작업에도 관심이 생기게 된 계기
