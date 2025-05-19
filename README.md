# 이벤트/보상 관리

## 실행 방법

docker-compose up --build


## 이벤트 설계
실제 인게임에서 자주 이루어지는 보스 격파시(특정 퀘스트 클리어) 포인트 지급(보상 아이템)을 구현해 보았습니다.

## API List
POST /auth/register  역할 기반 사용자 등록
POST /auth/login     로그인하여 토큰(역할별 권한) 발행
POST /event/create   이벤트 및 보상 등록
POST /event/claim    유저 보상 요청
GET /event/all       유저가 보상 가능한 이벤트를 미리 조회 가능
GET /event/claims    보상 요청 내역 확인


## 조건 검증방식 [POSTMAN 이용]
### 회원가입
Role:
USER 보상 요청 가능
OPERATOR 이벤트/보상 등록
AUDITOR 보상 이력 조회만 가능
ADMIN 모든 기능 접근 가능


POST http://localhost:3001/auth/register

Body:
{
  "username": "user1",
  "password": "1234",
  "role": "USER"
}

### 로그인
POST http://localhost:3001/auth/login

Body:
{
  "username": "user1",
  "password": "1234"
}

로그인 이후 인증 요청에 Bearer <token> 사용

### 이벤트 생성(운영자)
POST http://localhost:3002/event/create

Headers:
Authorization: Bearer <OPERATOR 토큰>
Content-Type: application/json

Body:
{
  "title": "익스트림 스우 격파",
  "rewardPoints": 2000
}

### 보상 요청(유저)
POST http://localhost:3002/event/claim

Headers:
Authorization: Bearer <USER 토큰>
Content-Type: application/json

Body:
{
  "eventId": 1,
  "questCompleted": true
}

### 전체 보상 기록 조회
GET http://localhost:3002/event/claims

Headers:
Authorization: Bearer <ADMIN or AUDITOR 토큰>

### 전체 이벤트 조회
GET http://localhost:3002/event/all

Headers: X
Body: X

