
# Description

Typing Game 과제 

 - [HOMEPAGE](http://choseohwan-typing-game.s3-website.ap-northeast-2.amazonaws.com/)
 - [STORYBOOK](http://choseohwan-typing-game.s3-website.ap-northeast-2.amazonaws.com/storybook)

# 해결 방안

## 1. 기본 환경 세팅

### 1.1 React 및 webpack, babel 세팅
- 기본 세팅 : [페이지](https://dev.to/siradji/react-without-create-react-app-start-building-your-react-project-like-a-professional-1hih) 참고
- 기타 세부 설정 : dev 설정 및 loader 설정 등
    - [webpack docs](https://webpack.js.org/concepts/entry-points/) 참고
   
### 1.2 개발 환경 세팅
- 기본 세팅 : [Next-Ts-Template(기존 프로젝트)](https://github.com/ChoSeoHwan/next-ts-template) 참고
    - Typescript
    - ESLint
    - Prettier
    - Lint-Staged
    - Huskey
    - Jest : 추가 설정 진행 [jest docs](https://jestjs.io/docs/en/configuration) 참고
    - jest-html-reporters
    - @testing-library/react
    - StoryBook : 메이저 버전 증가로 새로 구성
    - axios-mock-adapter
    
 - 기타 테스트를 위한 라이브러리 추기 세팅
    - axios-mock :
    - redux-saga-test-plan : [docs](http://redux-saga-test-plan.jeremyfairbank.com/integration-testing/effect-creators.html) 참고
    
### 1.3 라이브러리 세팅
- 기본 세팅 : [Next-Ts-Template(기존 프로젝트)](https://github.com/ChoSeoHwan/next-ts-template) 참고
    - axios
    - @emotion/core, @emotion/styled : 
        - 메이저 버전 증가로 새로 구성 > 하단 문제점으로 인해 다운그레이드
    - redux
    - redux-saga
    - immer-js
    - immer-reducer
    
### 1.4 문제점
 - Storybook 과 @emotion 라이브러리의 버전 증가로 인해 버그 발생
    - [issue#12114](https://github.com/storybookjs/storybook/issues/12114) 와 동일한 현상
    - 시도 방안
        1. Storybook 의 버전 @next 로 업데이트
            - 동일 증상 발생 - 실패
        2. StoryBook 에서 별도로 사용하고 있는 babel plugin 확인
            - babel-plugin-emotion 사용중인것으로 확인
            - StoryBook babel config 에 babel-plugin-emotion 제거 및 @emotion/babel-plugin 으로 변경
            - 동일 증상 발생 - 실 패
        3. @emotion 다운그레이드 진행 (v11 >  v10)
            - @emotion/react > @emotion/core@^10
            - @emotion/styled@^10
            - emotiond-theming@^10
            - 증상 해결
            
 - reducer 의 state 를 바꾸면서 테스트 진행 시 기존 state 로 인해 테스트 실패 케이스 발생
    - 매 테스트 실행 전에 store 의 state 를 초기 값으로 변경하도록 세팅
            
## 2. Router 제작

### 2.1 React-Router library 분석

 - [React-Router](https://jestjs.io/docs/en/configuration) 라이브러리 clone 및 코드 분석
 - 브라우저 경로 및 history 관리를 위한 [history](https://www.npmjs.com/package/history) 라이브러리 사용 중
 - 각 history 및 location, match 객체등을 context 를 통해 관리
 - Router 컴포넌트에서 대부분의 파싱 진행
    - Router 컴포넌트의 children 을 순차조회하며 매칭 되는 경로 필터링
    - 각 노드마다 context 를 통해 match 값 관리
 - 기타 hooks(useLocation, useHistory, ...) 에서는 Context 에 저장된 객체 전달
 
 
### 2.2 React-Router 제작의 문제점

 - **제작 기간**이 매우 부족함
    - 최대한 간단하게 만들 필요가 있음
    - multi-depth 기능 필요 없음 - 제외
    - matching 값 조회 기능 필요 없음
        - matching 미사용 Context 로 각 노드를 묶지 않아도 됨
        - Router 에서 children 파싱할 필요 없어짐
        
        
### 2.3 Router 제작 진행

 - 필요 기능 정리
    1. single-depth Routing
    2. history 를 통한 HistoryApi 관리 및 변경
    3. 테스트를 위한 history mocking
    4. 존재하지 않는 페이지 진입 시 노출할 NotFound page
    5. 메인 접속 시 Redirect 시켜줄 컴포넌트
    
    
 - Router 제작
    - [history](https://www.npmjs.com/package/history) 라이브러리 사용
    - history, location 의 경우 하나의 store 에서 관리해도 되므로 context 대신 reducer 사용
        - debugging 에서 좀 더 편리하였음
    - **Router** : Router 에서는 history 에 listener 만 등록, children 파싱은 진행하지 않음
        - history listener 를 통해 주소 변경 시 location 을 reducer 에 반영
        - 주소 변경 시 location update 되면서 각 컴포넌트에 경로 update
        - Router 등록 시 history 를 전달 할 경우 해당 history 를 사용하도록 설정
    - **Route** : 각 Route 에서 주소 확인하여 children 노출 여부 결정
    - **NotFound** : 각 Route 에 등록된 path 를 reducer 에 저장
        - reducer 에 등록되지 않은 path 일 경우 NotFound enable
    - **Redirect** : 경로 비교 후 매칭될 경우 history.push 
    

## 3. 페이지 제작

### 3.1 pages 구조

 - Router 에 맞춰 구성
 - App, NotFound 등 특수 페이지의 경우 pages root 에 등록

EX) pathname 에 따른 page structure

| Pathname  | pages |
| ------------- | ------------- |
| `/path1`  | `/page1.tsx` or <br/> `/page1/index.tsx`  |
| `/main/home`  | `/main/home.tsx` or <br/> `/main/home/index.tsx`  |


### 3.2 components 구조

 - atomic design 을 적용하기에는 프로젝트가 작아 의미가 없어 보여 제외
 - component 수가 얼마 안될 듯 하여 test, storybook 선언도 같은 디렉토리에 진행
 
 
### 3.3 게임 페이지 제작
 
 - 크게 두개의 모듈로 분리
    - GameModule : 전체적인 게임의 데이터 관리
        - 게임의 진행 여부 관리
        - 총 점수 및 전체 질문에 대한 답변 시간 관리
        
    - PlayModule : 현재 나오는 문제에 대한 데이터 관리 
        - 문제 종료 시간 관리
        - 문제 풀이 진행 여부 관리
        
 - 잔여시간 타이머
    - 유저가 관여하지 않는 비지니스 로직
    - redux-saga 를 통해 컴포넌트와 분리
    
 - 모듈에 있는 데이터를 통해 결과 노출