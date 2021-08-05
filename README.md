# 🚀 Astronaut's Shop

> 사용자들의 아이템을 사고파는 쇼핑몰

</br>

## 1. 제작 기간 & 참여 인원

- 2021.08.02 ~ 진행중
- 개인 프로젝트

</br>

## 2. 사용 기술

#### `Back-end`

- Nodejs (v14.17.4)
  / Express

#### `Front-end`

- React

#### `Etc`

</br>

## 3. ERD 설계

![](https://zuminternet.github.io/images/portal/post/2019-04-22-ZUM-Pilot-integer/final_erd.png)

## 🌕 1. 주요 기능

<details>
<summary>1.Todo리스트의 추가 & 삭제</summary>
<div markdown="1">

### Todo리스트의 추가 & 삭제 👉[code](https://github.com/MinsoftK/Astronaut/blob/49fdec6b8a3591705ec5bcfd07bb23a47dcda10d/js/todo.js#L16)

- 할일을 입력하고 완료했으면 삭제 버튼을 눌러 삭제 할 수 있다. Local스토리지에 Todo 리스트가 저장되므로 페이지를 새로고침해도 사라지지 않는다.

  <br/>

<center><img src="https://github.com/MinsoftK/Astronaut/blob/main/img/example2.png?raw=true" width="600" height="200"/></center>

<br/>

</div>
</details>

<details>
<summary>2. 사용자의 이름을 기억</summary>
<div markdown="1">

### 사용자의 이름을 기억 👉 [code](https://github.com/MinsoftK/Astronaut/blob/49fdec6b8a3591705ec5bcfd07bb23a47dcda10d/js/todo.js#L60)

- Local스토리지를 사용해 username을 저장한다. 사용자의 이름을 기억 한다면 Login Form을 더이상 표시하지 않는다.

<br/>

  <center><img src="https://github.com/MinsoftK/Astronaut/blob/main/img/example3.png?raw=true" width="600" height="200"/></center>
<br/>

</div>
</details>

<details>
<summary>3. 현재 위치와 날씨 표시</summary>
<div markdown="1">

### 현재 위치와 날씨 표시 👉 [code](https://github.com/MinsoftK/Astronaut/blob/main/js/weather.js)

(https://openweathermap.org/)

- JS에서 제공하는 내장함수를 사용해 위도와 경도를 구할 수 있었다. 이러한 정보를 바탕으로 openweather에서 제공하는 API로 날씨 정보를 비동기 처리로 가져올 수 있었다. openweather사이트에서 api를 발급받자. 이후 [MY_WEATHER_API_KEY](https://github.com/MinsoftK/Astronaut/blob/e260d256599315c167a53be85930301e57cc540c/js/weather.js#L1) 부분을 본인의 api key로 바꿔준 뒤, index.html을 열어보면 아래 그림 오른쪽 상단에서 날씨, 온도, 지역의 정보를 확인할 수 있다.

  <br/>

<center><img src="https://github.com/MinsoftK/Astronaut/blob/main/img/example.png?raw=true" width="600" height="200"/></center>
<br/>

</div>
</details>

<details>
<summary>4. 랜덤한 사진과 주식 관련 인용구 표시</summary>
<div markdown="1">

### 랜덤한 사진과 주식 관련 인용구 표시

```js
const num = Math.floor(Math.random() * quotes.length);
```

- 내장된 Math 모듈을 이용해 사이트에 접속할 때마다 랜덤한 사진과 인용구들을 출력하게 했다.
  사진출처 : [Pixabay](https://pixabay.com/ko/)

<br/>

</div>
</details>

<br/>
<br/>

## 🛰 2. 트러블슈팅

<details>
<summary>Todo 리스트 관리👉 <a href="https://github.com/MinsoftK/Astronaut/blob/f136bcded1d823dfea580cf11fb4106e1bcd3734/js/todo.js#L50">[code]</a></summary>
<div markdown="1">

Local스토리지에 username과 Todos의 리스트를 저장한다. 처음에 어려웠던 부분은 Todos의 목록을 지울때 어떻게 Todos의 Array에서 해당 값을 찾을것인가였다. 처음엔 `innerText`값이 일치하는 `idx`를 반환해주려 했다. 하지만 만약 Todos에 동일한 "운동하기", "운동하기" 원소가 있다면, `idx`먼저 찾은 `idx`가 반환이 되기에 사용할 수 없었다. 어떤 항목을 삭제해야하는지 정확하게 알려줄 수 있어야 했다. 이는
<a href="https://github.com/MinsoftK/Astronaut/blob/49fdec6b8a3591705ec5bcfd07bb23a47dcda10d/js/todo.js#L50">시간값(code)</a>
을 가진 `id`를 추가해 Object로 만들어 해당 `id`값으로 `filter`를 할 수 있었다.

</div>
</details>

<details>
<summary>시간 표시 포맷</a></summary>
<div markdown="2">

시간을 표시할 때, 숫자가 `int`형으로 반환되기 때문에 0~9까지의 숫자가 `03`으로 표시되는 것이 아닌 `3`으로 표시됐다. 처음에는 숫자가 0 ~ 10 사이일때 앞 string에 '0'을 추가하는 함수를 짰지만 기존의 `padStart()`라는 내장함수를 사용해 한줄에 해결할 수 있었다.

```js
const hours = String(date.getHours()).padStart(2, '0');
```

</div>
</details>

<details>
<summary>API 관련 이슈</a></summary>
<div markdown="2">

API 기능 작동을 보여주기 위해서 api키를 넣어서 deploy 해야만 했다. 하지만 `gitguardian`에서 api키가 노출이 됐다고 이메일이 왔다. 관련 검색을 해보니 `apikey`를 공개하면 악의적 목적으로 사용될 수 있기에 감추는걸 권장한다. 공개된 api가 악용된 사례들이 무엇이 있는지는 찾기가 힘들었다. 검색 결과 `openweather apikey`를 그냥 공개해도 상관없다는 개발자 분도 있었다. 결과적으론 클라이언트 단에서 api를 감추면서 요청할 방법은 없었다. proxy 서버를 이용해서 요청을 대신 처리하거나 서버 사이드를 이용해 처리하는 방법밖에 없다.

</div>
</details>
<details>
<summary>배경그림 비율 문제</a></summary>
<div markdown="4">

스마트폰에서 접속시 페이지가 짤리는 현상이 발생. 이를 해결하기 위해 미디어쿼리나 보는 화면 비율 그대로 보기 위해서 추가해봤지만 정확한 원인을 이해를 하지 못함. [이 곳](https://prup.tistory.com/14)에서 화면 비율을 줄이는 css를 body에 추가했더니 제대로 보인다. 하지만 screen을 줄였을 때, 그림은 줄지 않았다.

```js
const body = document.querySelector('body');
putImg = `img/${chosenImage}`;
body.style.backgroundImage = `url(${putImg})`;
body.style.backgroundSize = '100% 100%';
```

`backgroundSize:'cover'`라는 속성을 가지고 있었는데, `width`, `height` 모두 `100%`로 바꿔서 screen의 크기가 변경되어도 그림이 유지되도록 만들 수 있었다.
Todo리스트의 화면크기에 따른 깨짐 현상  
 media쿼리로 해결했다.

</div>
</details>
<br/>

## 보완점

- ~~PC에서는 화면이 정상적이나 스마트폰처럼 화면이 작아질 경우 todo의 span이 다음줄로 넘어가는것. 미디어쿼리를 이용해 모바일용 css를 따로 만들어야 됨~~(완료)

* ~~Todos에 transition 효과~~(완료)
* api를 이용한 뉴스 모아보기 페이지 별도 생성

- https://newsapi.org/s/south-korea-news-api 뉴스페이지 추가하기
- (https://namjackson.tistory.com/27) 날씨 이미지 추가하기
