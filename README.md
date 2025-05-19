# 이벤트/보상 관리

## 실행 방법

docker-compose up --build


## 이벤트 설계
실제 인게임에서 자주 이루어지는 보스 격파시(특정 퀘스트 클리어) 포인트 지급(보상 아이템)을 구현해 보았습니다.

## API List
POST /auth/register  역할 기반 사용자 등록<br>
POST /auth/login     로그인하여 토큰(역할별 권한) 발행<br>
POST /event/create   이벤트 및 보상 등록<br>
POST /event/claim    유저 보상 요청<br>
GET /event/all       유저가 보상 가능한 이벤트를 미리 조회 가능<br>
GET /event/claims    보상 요청 내역 확인<br>

#### ROLE:<br>
USER 보상 요청 가능<br>
OPERATOR 이벤트/보상 등록<br>
AUDITOR 보상 이력 조회만 가능<br>
ADMIN 모든 기능 접근 가능<br>
<br>


## 조건 검증방식 [POSTMAN 이용]
### 회원가입
POST http://localhost:3001/auth/register<br>
<br>
Body:<br>
{<br>
  "username": "user1",<br>
  "password": "1234",<br>
  "role": "USER"<br>
}<br>
<br><br>
### 로그인
POST http://localhost:3001/auth/login<br>
<br>
Body:<br>
{<br>
  "username": "user1",<br>
  "password": "1234"<br>
}<br>
<br>
로그인 이후 인증 요청에 Bearer [token] 사용<br>
<br><br>
### 이벤트 생성(운영자)
POST http://localhost:3002/event/create<br>
<br>
Headers:<br>
Authorization: Bearer <OPERATOR 토큰><br>
Content-Type: application/json<br>
<br>
Body:<br>
{<br>
  "title": "익스트림 스우 격파",<br>
  "rewardPoints": 2000<br>
}<br>
<br><br>
### 보상 요청(유저)
POST http://localhost:3002/event/claim<br>
<br>
Headers:<br>
Authorization: Bearer <USER 토큰><br>
Content-Type: application/json<br>
<br>
Body:<br>
{<br>
  "eventId": 1,<br>
  "questCompleted": true<br>
}<br>
<br><br>
### 전체 보상 기록 조회
GET http://localhost:3002/event/claims<br>
<br>
Headers:<br>
Authorization: Bearer <ADMIN or AUDITOR 토큰><br>
<br><br>
### 전체 이벤트 조회
GET http://localhost:3002/event/all<br>
<br>
Headers: X<br>
Body: X

