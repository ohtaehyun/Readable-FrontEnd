# 소모임 관리 프로젝트 프론트엔드

## 기술 스택

- React 18.2.0
- React-router-dom 6.3.0
- Typescript
- Code Formater - Eslint, Prettier
- Axios
- ~~Redux or Recoil (미정)~~ Recoil
- Mui
- 계속 추가예정..


### 주의사항
- Normalize css 가 적용됨
- 우선 UI개발은 편의성을 위해 MUi를 이용하기로 함. MUi에 공식사이트에 들어가면 친절히 설명되어 있으니 보고 가져다 쓰면됨.
- MUi를 쓰면서, MUi의 styled component 메소드도 이용할 것. 이것은 추후에 작성할 코드를 보고 확인하세요. css파일을 통해 스타일링하는것이 아닌
각 컴포넌트 내부에서 스타일 객체를 만들어 적용시킨다고 생각해도 좋습니다.

### 코딩컨벤션
- 타입에 관하여
  - 모든 타입에 대해서 접두사로 I-(i의 대문자) 를 붙여 명명한다. 이는 Interface의 약자이다. 단, type으로 정의된 타입에 대해서도 I- 접미사를 붙이는 것을 원칙으로 한다.
  - 두가지 규칙을 적용한 이름은 다음과 같다.(ex. ITestType, IResponse...)
- 모든 React 컴포넌트의 파일은 대문자로 시작하여야 한다. (ex. Button.tsx, ...)
  - 이건 모를까봐 명시함. 파일 생성시 ts 파일과 tsx 파일이 있는데, jsx 문법을 사용하기 위해서는 tsx 파일로 생성하여야 함.
- 기본적으로 폴더구조는 자율에 맡기나, 이유를 명확히 설명할 수 있어야 한다.(시덥지 않은 이유여도 자신만의 논리적인 이유가 있다면 ok)
- 모든 복수형 명사들의 접미사는 -list로 통일한다. (ex. dataList, responseList)
- 가능한한 단어를 줄여서 명명하지 않는다. (ex. SubmitButtonHandler 처럼 긴 이름도 온전히 명시한다.)
  - 줄일 수 있는 단어는 res, req, btn 처럼 일반적으로 통용되는 약어에 한한다.
  - 모르겠으면 그냥 일단 다 써도됨. 메소드나 변수명이 길어져도 상관없음.
- eslint와 prettier 세팅을 적용시킬것. 관련내용은 검색하세용
  - 특히 Format on save 설정을 활성화 시킬것
- Typescript의 명시적 타입을 활용할 때, any타입의 사용은 최대한 지양할 것. 
