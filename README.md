# 보드버디

## 개요
- 웹 서비스를 WebView로 감싸서 앱으로 만든 프로젝트입니다.
- 웹 서비스 상세 기능은 [보드버디 레포지토리](https://github.com/Board-Buddy/front-end)를 참고해주세요.

<br/>

## 실행 영상
- 추가 예정인 섹션입니다.

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
- [앱-웹뷰 상태 동기화 인터페이스 설계하기](https://yuuub.notion.site/252963c8b3a780b49939f245a590242a?source=copy_link)
- [앱 권한 관리](https://yuuub.notion.site/252963c8b3a7803e857edec3f44828db?source=copy_link)

<!--
## 배포
- Android: Google Play
- iOS: App Store
-->
