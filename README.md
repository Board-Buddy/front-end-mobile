# 보드버디

## 개요
- 보드게임 할 사람, 여기 버디 모여라!
- 웹뷰를 기반으로 만든 보드버디 모바일 앱입니다. ([보드버디 웹 서비스 바로가기](https://m.boardbuddi.com))

<br/>

## 실행 영상

### 스플래시 화면

https://github.com/user-attachments/assets/356ca2fe-fbd3-4b66-8b8c-1749e9731139

<br/>

### 위치 권한 요청 및 처리
- 권한 거부 시 안내 문구 표시  

https://github.com/user-attachments/assets/27890992-0cf3-4c33-ab05-468739a26b2f

- 권한 허용 시 주변 보드게임 카페 지도 표시  

https://github.com/user-attachments/assets/ddde0604-f06b-4007-a44d-9c8578b9f8e1

<br/>

### 갤러리 권한 요청 및 처리
- 권한 거부 시 토스트 안내 표시  

https://github.com/user-attachments/assets/6f875fd8-67ee-4f63-b7c3-28983bf541bf

- 권한 허용 시 갤러리 접근 가능  

https://github.com/user-attachments/assets/17ae49db-c8ee-4371-8a09-d1aab045fda3

<br/>

### 화면 전환 구조

https://github.com/user-attachments/assets/927ce554-0090-417d-9251-44055cd6caef

> 이외에도 웹 서비스에서 지원하는 대부분의 기능들을 지원하고 있습니다.  
> 웹 서비스 상세 기능은 [보드버디 레포지토리 README](https://github.com/Board-Buddy/front-end)를 참고해주세요.
  

<br/>

## 실행 방법
1. 레포지토리 클론
   ```shell
   git clone https://github.com/Board-Buddy/front-end-mobile.git
   cd front-end-mobile
   ```
2. 의존성 설치
   ```shell
   npm install
   ```
3. `.env.local` 파일 생성
   ```shell
   # 웹뷰가 접근할 웹 서비스 기본 URL 지정
   EXPO_PUBLIC_WEB_VIEW_BASE_URL='https://m.boardbuddi.com' 
   ```
4. 개발 서버 시작
   ```shell
   npx expo start
   ```
   - 생성되는 QR을 통해 [Expo Go](https://expo.dev/go) 앱에서 확인할 수 있습니다.

<br/>

## 앱 개발 중 고려한 주요 사항
- [앱-웹뷰 화면 전환 구조 통일하기](https://yuuub.notion.site/233963c8b3a78001a436c18c5755c32a?source=copy_link)
- [React Native WebView 전환 시 상태 날림 문제 해결하기](https://yuuub.notion.site/252963c8b3a780b49939f245a590242a?source=copy_link)
- [웹뷰 기반 앱에서 네이티브 권한 다루기](https://yuuub.notion.site/252963c8b3a7803e857edec3f44828db?source=copy_link)

<!--
## 배포
- Android: Google Play
- iOS: App Store
-->
