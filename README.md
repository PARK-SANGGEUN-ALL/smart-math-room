# smart-math-room · 2026 강원사대부고 지능형 수학교실

강원대학교사범대학부설고등학교 · 자료개발 : 강원사대부설고 수학교사 일동 · feat. 한국과학창의재단

- 홈페이지 : **https://smart-math-room.vercel.app**
- 방문자 수 : Vercel + Upstash (숫자만 저장, 개인정보 없음)
- 만족도 조사 : **구글 설문지** → 응답은 학교 구글 계정의 **구글 시트**에 계속 누적

## 파일 구성
| 파일 | 내용 |
| --- | --- |
| `index.html` | 홈페이지 (탐구 앱, 수업 칠판, 모둠 발표 화면, PDF 저장, 방문자 수, 만족도 조사 QR) |
| `survey.html` | 만족도 조사 바로가기 (구글 설문지로 자동 이동, 링크 썸네일 표시용) |
| `qr.html` | 만족도 조사 QR 포스터 (인쇄용) |
| `api/` | 방문자 수 서버 기능 |
| `config.js` | 구글 설문지 주소, 응답 시트 주소 넣는 곳 |
| `구글설문지_자동생성.gs` | 구글 설문지 + 응답 시트 + 요약 시트를 한 번에 만드는 코드 (GitHub에 올리지 않아도 됨) |
| `구글설문지_문항표.md` | 설문지를 직접 만들 때 참고할 문항표 |

## 1. GitHub에 올리기
github.com → New repository → 이름 **`smart-math-room`** → Public → Create → **uploading an existing file** → 파일과 `api` 폴더를 모두 끌어다 놓기 → Commit

## 2. Vercel로 배포하기
vercel.com → Continue with GitHub → **Add New → Project** → `smart-math-room` **Import** → Framework : **Other** → **Deploy**

## 3. 방문자 수 켜기
1. Vercel 프로젝트 → **Storage** → **Create Database** → **Upstash for Redis**(무료) → 프로젝트에 **Connect**
2. **Deployments** → 맨 위 배포 ⋯ → **Redeploy**
→ 첫 화면에 오늘 방문 · 누적 방문이 나옵니다. (새로 열 때마다 1씩, 중복 포함)

## 4. 구글 설문지 만들기
**방법 A (자동, 권장 · 약 2분)**
1. 학교 구글 계정으로 **script.google.com** → 새 프로젝트
2. `구글설문지_자동생성.gs` 내용을 붙여 넣고 저장 → 함수 **createSurvey** 선택 → ▶ 실행 → 권한 허용
3. 실행 로그에 나온 **[설문 링크]**, **[응답 시트]** 주소를 복사
   - 학생 / 교원 분기, 5점 척도 16문항, 서술형, ‘요약’ 시트(평균 · 4·5점 비율 · 참여 타교 수 자동 계산)까지 만들어집니다.

**방법 B (직접)** : `구글설문지_문항표.md`를 보고 구글 설문지를 만든 뒤, 응답 탭 → **Sheets에 연결** → 새 스프레드시트

## 5. 주소 넣기
GitHub의 `config.js` → 연필 아이콘 →
```
surveyUrl: '여기에 설문 링크',
sheetUrl:  '여기에 응답 시트 주소',
```
→ Commit (Vercel이 자동으로 다시 배포)

이제 홈페이지 ‘만족도 조사’ 버튼, QR 코드, `https://smart-math-room.vercel.app/survey.html` 링크가 모두 구글 설문지로 연결됩니다.
QR에는 홈페이지 주소가 들어가므로, 나중에 설문지를 바꿔도 `config.js`만 고치면 인쇄한 QR을 그대로 쓸 수 있어요.

## 6. 결과 보기와 내려받기
- **응답 시트**(구글 시트) : 응답이 한 줄씩 계속 누적됩니다. 앱이나 기기를 껐다 켜도 그대로 쌓여요.
- **요약 탭** : 문항별 평균, 4·5점 비율, 응답 수, 참여 주제별 인원, 참여 타교 수, 활용 의향 교원 수가 자동 계산됩니다.
- **엑셀로 받기** : 시트에서 **파일 → 다운로드 → Microsoft Excel(.xlsx)**
- 구글 설문지 **응답** 탭에서도 문항별 그래프를 볼 수 있습니다.
- 홈페이지 ‘선생님용 결과 보기’의 **응답 시트 열기** 버튼은 시트 공유 권한이 있는 사람만 열 수 있습니다.

## 7. QR 포스터
`https://smart-math-room.vercel.app/qr.html` → 인쇄하기

## 주소가 smart-math-room.vercel.app이 아닐 때
`index.html`, `survey.html`, `qr.html`에서 `https://smart-math-room.vercel.app/`을 실제 주소로 바꾸어 Commit 하세요. (링크 썸네일용)
