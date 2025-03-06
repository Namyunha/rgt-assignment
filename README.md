# Web front-end S/W 개발 직무 면접 전 과제
## 실행 방법
### git clone 또는 zip download 하기
#### 원하는 폴더 위치에 git clone 또는 다운받은 zip의 압축을 풀어주면 아래와 같이 프로젝트 폴더가 생성됩니다. 

> git clone https://github.com/Namyunha/rgt-assignment.git

![image](https://github.com/user-attachments/assets/da340874-39a0-44a8-be6f-b67a1b6bd6b6)

- 위 위치에서 cd rgt-assignment를 통해서 폴더에 접근합니다
- 폴더를 열어보면 아래와 같이 빨간 에러 표시가 납니다. 이는 프로젝트가 온전히 설정되지 않았기 때문입니다.

![image](https://github.com/user-attachments/assets/da62c8ee-e90a-4e9e-8c08-5ab88cde59cd)

- 이것을 해결하기 위해 npm install 해줍니다.
> npm install

- install 한 이후에 한 번 껐다가 켜주면 아래와 같이 빨간 부분이 해결이 됩니다

![image](https://github.com/user-attachments/assets/030cb30f-5f85-43ae-85b4-e027b3891daf)
- 키고 났을 때, 현재 프로젝트 위치가 해당 프로젝트가 아닌 상위 폴더라면(또는 하위 폴더라면) 해당 프로젝트로 폴더 위치를 변경해야 합니다.

![image](https://github.com/user-attachments/assets/23672527-4f21-4573-b616-1b8e8dcaf876)
- 위의 사진에선 상위 폴더로 나타나기에 cd 명령어를 이용해서 하위 폴더로 위치를 이동시킵니다.

![image](https://github.com/user-attachments/assets/fd63e752-ded4-4d26-8423-91c774a6c8f4)

- 위와같은 위치가 되면 아래의 명령어를 입력하여서 프로그램을 실행합니다.
> npm run dev

![실행하기](https://github.com/user-attachments/assets/4142a15c-514e-4858-a05e-6c95cd14893d)

- 아래 터미널에 나와있는 localhost 부분에 커서를 올려 ctrl+좌클릭 을 하거나 직접 주소창에 http://localhost:3000/ 을 입력한다

![실행하기2](https://github.com/user-attachments/assets/d5590e86-337f-4e64-b208-b25385dff67a)

- 창이 켜지면 위의 사진 처럼 책등록하러가기 링크를 클릭하면 정상적으로 화면이 나타난다.

## 동작화면

### 책등록하기
![rgt 책등록](https://github.com/user-attachments/assets/f31f08b7-f598-482f-b633-4b24940be16c)

- 유효성검사

![rgt 책등록 유효성 검사](https://github.com/user-attachments/assets/d819b928-a646-456f-bdbb-07503a654ae4)

### 책 조회, 수량변경, 삭제, 검색

![책목록 조회, 수량 변경, 삭제](https://github.com/user-attachments/assets/a2bee3b7-93ef-4a18-984a-c3b82e876677)



