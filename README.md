# 🚀 Astronaut's Shop

> 기존의 쇼핑몰 그대로 만들어보기. 실제 쇼핑몰처럼 구현하려 노력했습니다. `무신사`, `코오롱몰`, `쿠에른` 등 여러 쇼핑몰을 참고.

netlify [Demo 버전](https://priceless-davinci-7b8ea1.netlify.app/)

 <br/>

# 1. 제작 기간 & 참여 인원

- 2021.07 ~ 진행중
- 개인 프로젝트

</br>

# 2. 사용 기술

## `Front-end`

- React
- Redux
- ant-design, react-bootstrap
- styled-component
- Visual Studio Code

## `Back-end`

- Nodejs (v14.17.4)
  / Express
- MongoDB

  </br>

# 3. 데이터 흐름도

![](https://github.com/MinsoftK/astronaut-shop/blob/master/flowchart3.png?raw=true)

- APP에서부터 데이터를 Props로 전달.
- Cart 컨테이너에선 Redux로 상태 관리.
- 현재의 데이터 흐름을 결정하게 된 내용의 [포스트](https://minsoftk.tistory.com/66)

<br/>
<br/>

# 4. 주요 기능

기존의 쇼핑몰을 참고하여, 사용자들이 사용하기 편리한 기능들과 깔끔한 UI/UX를 제공하는 서비스를 개발을 중점으로 했습니다.

<br/>

<details>
<summary>4.1. axios모듈로 Data를 상품 리스트에 추가</summary>
<div markdown="1">
<br/>

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme1.png?raw=true" width="600" height="400"/></center>

- 프로젝트를 처음 시작할 때, 미리 Data를 JSON 파일로 만들어놨다. 해당 데이터들을 다른 [github Repository](https://github.com/MinsoftK/jsontest/blob/master/test0.json)에 올려놨다. 여자상품인지 남자상품인지에 따라 다른 json파일을 axios 모듈로 받아온다. 해당 데이터를 기존의 데이터 obj에 추가해준다.  
  👉 [ 코드 보기 ](https://github.com/MinsoftK/astronaut-shop/blob/d84390fe076984f8b2f7c370e348df8a4862ec1b/shop/src/container/ShoesList.js#L90)

- 더 보기 버튼을 클릭했을 때, 만약 더는 진열할 상품이 없다면 더 보기 버튼을 비활성화시킨다. 남자, 여자 카테고리의 버튼의 state를 따로 관리한다.

  👉 [ 코드 보기 ](https://github.com/MinsoftK/astronaut-shop/blob/d84390fe076984f8b2f7c370e348df8a4862ec1b/shop/src/container/ShoesList.js#L100)

  <br/>
  <br/>
  </div>
  </details>

<details>
<summary>4.2. 상품 클릭시 상세페이지로 이동</summary>
<div markdown="2">
<br/>

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/ezgif.com-gif-maker2.gif?raw=true" width="600" height="400"/></center>

- 하나의 상품의 클릭이벤트가 발생했을때, history 훅을 이용해 `src`로 이동하게 했다. 그러면 그림과 같이 해당 상품의 정보로 이동할 수 있다.

```js
(shop/src/component/ShoesItem.js)
(...)
	const onClick = () => {
		console.log('src', { src });
		history.push(src);
	};
	return (
		<div className="col-md-4" onClick={onClick}>
			<img loading="lazy" src={props.shoes.imageUrl} width="100%"></img>
			<h4>{props.shoes.title}</h4>
			<h5>₩ {itemPrice}</h5>
		</div>
	);
(...)
```

<br/><br/>

  </div>
  </details>

  <details>
<summary> 4.3. Redux를 사용한 장바구니</summary>
<div markdown="3">
<br/>

## 장바구니

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/ezgif.com-gif-maker.gif?raw=true" width="600" height="400"/></center>

- 그림과 같이 상품 상세정보창에서 장바구니에 추가 버튼을 클릭하면, 장바구니 페이지에 추가가 된다. 상세페이지에서 장바구니 페이지로 Data 전달은 상당히 번거롭다. 그래서 Redux 상태 관리 툴을 이용해 관리했다. 👉 [redux code보기](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/redux.js)
- 장바구니 추가 버튼을 눌르면 payload로 redux데이터에 해당 컴포넌트에서 props로 받아온 데이터를 넘겨준다.
- 장바구니 페이지의 `+`, `-` 버튼을 눌를때마다 redux의 action으로 전달되어 해당 작업을 수행한다.

👉 [ 장바구니 페이지 코드 전체 보기 ](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/container/Cart.js)

```js
<button
	className="btn btn-danger"
	onClick={() => {
		dispatch({
			type: '항목추가',
			//redux에 보내는 payload
			payload: {
				id: findItem.id,
				sex: props.num,
				name: findItem.title,
				remain: findItem.remain,
				quan: 1,
				imageUrl: findItem.imageUrl,
				price: findItem.price,
			},
		});
		history.push('/cart');
	}}>
	장바구니에 추가
</button>
```

<br/><br/>

  </div>
  </details>

  <details>
<summary> 4.4. 장바구니 상품 선택 기능</summary>
<div markdown="4">
<br/>

## 상품 선택 결제 기능

### 👉 [ 장바구니 페이지 전체 코드 ](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/container/Cart.js)

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme8.png?raw=true" width="600" height="400"/></center>

- 장바구니에서 상품을 선택하면 총 결제 금액이 실시간으로 업데이트 된다.
- 이 기능을 만들기 위해 useEffect Hook을 이용해 처음에 렌더링 될 때, 기존의 redux 데이터의 개수만큼 obj를 만들어 false를 입력해줬다. 기존의 버튼들은 선택되지 않는 false 값을 default로 가지게 했다.
- 버튼이 눌렸을 때 useState를 이용한 state 값 변경으로 실시간 업데이트를 가능하게 만들었다.
  <br/><br/>

> useEffect Hook

```js
//처음 렌더링될 때 useEffect Hook 사용
useEffect(() => {
	console.log('훅을 이용해 redux state 가져오기', state);
	console.log('state', state);

	//렌더링될때 상품의 개수만큼 checkbox state를 저장할 obj 생성
	let copy = [];
	for (let i = 0; i < state.length; i++) copy.push(false);
	setIsSelect(copy);
}, []);
```

<br/>

> 상품을 선택했을 때, 총 결제 금액 표시

```js
//체크된 상품의 총 상품금액 업데이트
const onChange = (e) => {
	console.log(e);
	console.log(`checked = ${e.target.checked} , i = ${e.target.checkNumber}`);

	//copy의 checkNumber 인덱스 값을 변경해준다.
	let copy = [...isselect];
	copy[e.target.checkNumber] = e.target.checked;
	setIsSelect(copy);
};
const onClickBtn = (i) => {
	//상품의 개수가 1보다 크고, 상품이 선택되었을 때만 가격을 변경해준다.
	let pay = [...selectPay];
	pay[i] = state[i].quan * state[i].price;
	console.log(pay);
	setSelectPay(pay);
};
```

<br/><br/>

  </div>
  </details>

<details>
<summary> 4.5. 렌더링 성능 개선</summary>
<div markdown="5">
<br/>

## 렌더링 성능 개선

### 👉 [lazy loading code보기](https://github.com/MinsoftK/astronaut-shop/blob/6e469964e4a983b527d0525eae5f622bd2c4e05f/shop/src/App.js#L13)

### 👉 [memo code보기](https://github.com/MinsoftK/astronaut-shop/blob/6e469964e4a983b527d0525eae5f622bd2c4e05f/shop/src/container/Cart.js#L7)

<br/>

- React Dev Tool을 이용해 시간을 측정해서 렌더링 최적화에 효과가 있는지 비교해봤다. 제일 먼저 lazy loading을 적용했을 때의 시간을 비교해봤다. `App.js`에서 각각의 `Container` 컴포넌트를 로딩하고 있는데 lazy loading을 사용한 뒤, 렌더링 시간을 측정해봤다. 전체 렌더링 시간은 많이 줄었고, 컴포넌트들도 시간이 미세하게 줄어든 것을 확인할 수 있었다.
  <br/>

> lazy loading 적용 전

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme4(lazy-before).png?raw=true" width="600" height="400"/></center>

<br/><br/>

> lazy loading 적용 후

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme5(lazy-after).png?raw=true" width="600" height="400"/></center>

<br/>
<br/>

- React dev tool을 이용해 시간을 측정해서 렌더링 최적화에 효과가 있는지 비교해봤다. lazy loading 적용 이후 memo를 사용했을 때도 렌더링 시간을 측정해봤다. memo는 장바구니 페이지에서 사용했다. 그 이유는 수량을 조절할때, 리렌더링 되는 부분이 많았기 때문이다.

<br/>

> memo 적용 전

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme7(memo-before).png?raw=true" width="600" height="400"/></center>

<br/><br/>

> memo 적용 후

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme6(memo-after).png?raw=true" width="600" height="400"/></center>

<br/>

- memo를 사용했을 때, 큰 차이가 없이 렌더링 되는 경우도 있었다. 평균적으로 전체 렌더링 시간은 감소했다. 다만 lazy loading처럼 큰 속도 향상은 볼 수 없었다.

<br/>

  </div>
  </details>
<br/>

# 5. 주요 트러블슈팅

<details>
  <summary> 5.1. github에서 JSON 데이터 받아올 때 CORS 오류</summary>
  <div markdown="1">

<br/>

## github에서 JSON 데이터 받아올 때 CORS 오류

- 서버가 없어서 로컬환경을 이용해 axios 모듈을 통해서 github에 올려진 JSON 파일을 받아오려 했다. 하지만 `Access to XMLHttpRequest at 'https://github.com/MinsoftK/react/blob/main/shop/src/Data/addManShoes.json' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.` 오류가 발생했다.

#### [원인 도출]

- 원인은 github에서 JSON 파일을 제대로 안 만들어서였다. 다른 github에서의 json은 정상적으로 불러오는 것을 확인할 수 있었기 때문이다. 그 차이는 사이트가 배포 여부이다.
- 다시 생각해보면 배포되지 않은 사이트에서 JSON 파일을 호출했으니, CORS 오류가 뜨는 것은 당연했다. 배포 이후엔 CORS 오류가 뜨지 않았다. `localhost:3000`에서 호출을 해서 그런건지 혹은 github에서 배포시 CORS 설정이 되어 있는 것인지는 확인해봐야 한다.(서버와 연동시 확인)

#### [해결 방안 탐색]

- 정보가 많이 없어서 찾기 힘들었지만 stackoverflow에서 [단서](https://stackoverflow.com/questions/29612800/load-json-from-github-file)를 얻을 수 있었다. 결국 github에서 JSON을 불러오려면 해당 repository가 배포되어 있어야 한다는 것을 알았다. 그래서 JSON을 배포할 수 있는 [Repository](https://github.com/MinsoftK/jsontest)를 따로 만들어줘서 해결할 수 있었다.

<br/>

<br/>

👉 [ 원본 보기 ](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/container/ShoesList.js#L91)

<br/>

> 변경된 코드

- 위와 같이 배포된 url로 axios모듈로 데이터를 불러왔을 때 CORS 오류없이 정상적으로 동작하는 것을 확인할 수 있었다.

```js
const fetchData = (i) => {
	axios
		.get('https://minsoftk.github.io/jsontest/test' + i + '.json')
		.then((result) => {
			result.data.map((item) => {
				let newObj = [...wshoes, ...result.data];
				setShoes(newObj);
			});
		})
		.catch(() => {
			console.log('실패');
		});
};
```

<br/>

[참고1](https://blog.naver.com/PostView.naver?blogId=dnvld1&logNo=222039760747&redirect=Dlog&widgetTypeCall=true&directAccess=false)

[참고2](https://tried.tistory.com/m/76)

[참고3](https://evan-moon.github.io/2020/05/21/about-cors/)

<br/><br/>

</div>
</details>

<details>
  <summary> 5.2. 상품 더보기 버튼 클릭시, 무한 상품 로딩 문제</summary>
  <div markdown="2">

<br/>

## 더보기 버튼 클릭시, 무한 상품 로딩

- 더 보기 버튼을 눌렀을 때, 5.1에서처럼 axios모듈을 이용하여 JSON 데이터를 받아온다. 이때 상품을 불러와도 더 보기 버튼이 비활성화되지 않아 JSON 데이터가 무한으로 상품이 추가되는 오류가 있었다.

#### [원인 도출]

- 남자 상품의 데이터가 추가됐을 때, 모든 상품이 출력 됐는지 확인하는 로직의 부재.

#### [해결 방안 탐색]

- 상품을 불러올 때, JSON 데이터의 개수보다 많이 출력이 된다면 `더보기 버튼` 비활성화 한다.

#### [해결방안 적용]

- 처음 렌더링 되는 데이터의 개수와 추가된 데이터의 개수를 합쳤을 때, 전체 상품의 개수보다 크거나 같다면 버튼을 비활성화 시켰다.
- 남자, 여자 카테고리에서 더 보기 버튼이 같은 state를 공유하고 있었다. 그래서 남자, 여자 상품 각각의 결과에 대한 버튼 state 변수를 2개 만들어줬다.

<br/>

<details>
<summary> 📙기존의 코드 펼치기</summary>
<br/>

```js
const fetchData = (i) => {
	//데이터 받아오기
	axios
		.get('https://minsoftk.github.io/jsontest/test' + i + '.json')
		.then((result) => {
			result.data.map((item) => {
				let newObj = [...wshoes, ...result.data];
				setShoes(newObj);
			});
		})
		.catch(() => {
			console.log('실패');
		});
};
```

</details>

<br/>

<details>
<summary> 📘변경된 코드 펼치기</summary>

<br/>

👉 [ 원본 보기 ](https://github.com/MinsoftK/astronaut-shop/blob/f8f2b700e9fe171cacf5ad44edbb1ba525bda118/shop/src/container/ShoesList.js#L100)

<br/>

> 변경된 코드

```js
const fetchData = (i) => {
i
	? axios // i === 1일때 여자 카테고리 더보기 버튼 클릭시
			.get('https://minsoftk.github.io/jsontest/test' + i + '.json')
			.then((result) => {
				let newObj = [...wshoes, ...result.data]; //데이터 합치기
				setWShoesNum(Data.length + result.data.length); //원래 Data와 추가된 데이터의 길이
				if (newObj.length >= wshoesNum) setWBtnDisable('true'); //합친 데이터의 길이가 더 크다면 여자 카테고리 버튼 비활성화
				setWShoes(newObj);
				console.log(btndisable);
			})
			.catch(() => {
				console.log('실패');
			})
(...)

```

<br/>

</details>

- 더 보기 버튼을 눌렀을 때, 5.1에서처럼 axios모듈을 이용하여 JSON 데이터를 받아온다. 이때 상품을 불러와도 더 보기 버튼이 비활성화되지 않아 무한으로 상품이 추가되는 오류가 있었다. 또한, 남자, 여자 카테고리에서 더 보기 버튼이 같은 state를 공유하고 있었다. 그래서 남자, 여자 상품 각각의 결과에 대한 버튼 활성화를 관리할 수 있게 state 변수를 2개 만들어줬다.

> 기존코드

```js
const fetchData = (i) => {
	axios
		.get('https://minsoftk.github.io/jsontest/test' + i + '.json')
		.then((result) => {
			result.data.map((item) => {
				let newObj = [...wshoes, ...result.data];
				setShoes(newObj);
			});
		})
		.catch(() => {
			console.log('실패');
		});
};
```

<br/>

> 변경된 코드

- 만약 기존의 데이터와 불러온 데이터를 합한 `newObj`의 길이가 여자상품의 개수보다 크거나 같다면 버튼을 비활성화 시킨다. 👉 [ 코드 보기 ](https://github.com/MinsoftK/astronaut-shop/blob/f8f2b700e9fe171cacf5ad44edbb1ba525bda118/shop/src/container/ShoesList.js#L100)

```js
const fetchData = (i) => {
i
	? axios // i === 1일때 여자 카테고리 더보기 버튼 클릭시
			.get('https://minsoftk.github.io/jsontest/test' + i + '.json')
			.then((result) => {
				let newObj = [...wshoes, ...result.data]; //데이터 합치기
				setWShoesNum(Data.length + result.data.length); //원래 Data와 추가된 데이터의 길이
				if (newObj.length >= wshoesNum) setWBtnDisable('true'); //합친 데이터의 길이가 더 크다면 여자 카테고리 버튼 비활성화
				setWShoes(newObj);
				console.log(btndisable);
			})
			.catch(() => {
				console.log('실패');
			})
(...)
```

<br/><br/>

</div>
</details>

<details>
  <summary> 5.3. 여자 상품 페이지에 남자 상품이 바인딩되는 문제</summary>
  <div markdown="4">

<br/>

## 다른 상품이 바인딩되는 문제 & 삼항연산자 사용시 렌더링 오류

- 다른 상품이 바인딩 되는 경우는 남자, 여자 상품을 저장하는 state 변수를 활용해서 해결했다. 하지만 App에서 ShoesList에 남자면 num:0 , 여자면 num:1을 props로 넘겨준다. 처음에는 `props.num` 값에 따라서 state 변수를 업데이트해 렌더링 할 수 있을 거라 생각했지만 `Too many re-renders. React limits the number of renders to prevent an infinite loop.` 오류가 발생했다.

#### [원인 도출]

- 렌더링 되는 과정에서 삼항연산자에 하나의 태그가 들어갔을 때는 문제가 없었다. 하지만 여러개의 태그를 포함하는 순간 무한 루프 오류가 발생했다. map을 써야 될 때 단일 컴포넌트가 아니면 작동이 되지 않는것 같다. JSX 문법에 맞춰 작성해도 삼항 연산자 안에서 여러 개의 태그를 감싸고 있다면, 자바스크립트 엔진에서 parsing 에러가 일어나는 것 같다.

#### [해결 방안 탐색]

- 이를 해결하기 위해서 각각의 UI 컴포넌트를 만들어서 불러왔다. `props.num`이 1이면 컴포넌트를 반환하고, 0이면 컴포넌트를 반환한다.

#### [효과]

- 삼항연산자를 이용해 가독성이 더욱 깔끔해졌고, 컴포넌트로 UI를 만들어서 재사용하기 쉬워졌다.

<br/>

<details>
<summary> 📙기존의 코드 펼치기</summary>
<br/>

```js
{
	//Date2 : 여자 데이터 , Data : 남자 데이터
	//setShoes : state 변수를 업데이트하는 Hook
	props.num === 1 ? setShoes(Data2) : setShoes(Data);
}
```

</details>

<br/>

<details>
<summary> 📘변경된 코드 펼치기</summary>

<br/>

👉 [ 원본 보기 ](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/container/ShoesList.js#L35)

<br/>

> 변경된 코드

```js
const Man = () => {
	//클릭했을 때, 해당 상품의 about 컴포넌트로 보내야 한다.
	return (
		<div className="row">
			<Suspense fallback={<Spin indicator={antIcon} />}>
				{props.shoes.map((item, i) => {
					//컴포넌트 반복
					return (
						<ShoesItem shoes={item} num={i} sex="manshoes" key={i}></ShoesItem>
					);
				})}
			</Suspense>
		</div>
	);
};
//props.num이 1이면 여자 화면 렌더링
const Woman = () => {
	return (
		<div className="row">
			<Suspense fallback={<Spin indicator={antIcon} />}>
				{props.wshoes.map((item, i) => {
					//컴포넌트 반복
					return (
						<ShoesItem
							shoes={item}
							num={i}
							key={i}
							sex="womanshoes"></ShoesItem>
					);
				})}
			</Suspense>
		</div>
	);
};

(...)

return (
		<>
			<Navigator></Navigator>
			<div className="container">
				<div className="row">
					{props.num === 1 ? <Woman></Woman> : <Man></Man>}
				</div>
			</div>
		</>
	);
```

<br/>

</details>

<br/>

</div>
</details>

<details>
  <summary>5.4. 장바구니에 상품이 중복으로 추가 되는 문제</summary>
  <div markdown="5">

<br/>

## 중복으로 추가되는 문제

#### [원인 도출]

- 같은 상품을 추가해도 해당 상품이 중복됐을 때, 추가하지 않는 로직의 부재

#### [해결 방안 탐색]

- 만약 상품의 이름이 똑같다면, 해당 상품을 등록하지 않고 `수량`만 증가시켜주는 로직 추가.

<br/>

<details>
<summary> 📙기존의 코드 펼치기</summary>
<br/>

```js
else if (action.type === '항목추가') {
			let copy = [...state];
			copy.push(action.payload);
			return copy;
		}
```

</details>

<br/>

<details>
<summary> 📘변경된 코드 펼치기</summary>

<br/>

👉 [ 원본 보기 ](https://github.com/minsoftk/astronaut-shop/blob/862ef55eae9a8bf2b1b3ea3df1fcb86cd1a9becf/shop/src/redux.js#L52)

<br/>

> 변경된 코드

- payload로 넘겨준 데이터와 redux 데이터를 비교해서 같은 상품의 이름이 존재한다면 해당 idx를 found에 저장한다. found가 0보다 큰 경우라면(존재한다면) 개수를 증가시켜준다. 0보다 작을경우에는 그대로 `push`를 써서 copy obj에 추가해준다.

```js
else if (action.type === '항목추가') {
		let found = state.findIndex((a) => {
			//reduxData의 상품 이름과 payload에 일치하는 아이템의 idx 반환
			return a.name === action.payload.name;
		});
		console.log('중복되는 상품 idx', found);
		//상품이 중복될 때 logic
		if (found >= 0) {
			let copy = [...state];
			copy[found].quan++;
			return copy;
		} else {
			let copy = [...state];
			copy.push(action.payload);
			return copy;
		}
```

<br/>

</details>

<br/>

</div>
</details>

<details>
<summary> 5.5. 장바구니 상품 체크 후, 총 결제 금액 표시 오류</summary>
<div markdown="6">

## 장바구니 상품 체크 후, 총 결제 금액 표시 오류

<br/>

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme9.png?raw=true" width="800" height="600"/></center>

- 장바구니 페이지에서 결제할 상품들을 선택을 하면 총 결제 금액을 표시해주는 기능이 있습니다. 하지만 기존의 코드에서 상품을 선택하고 수량을 변경하거나 체크 박스를 해제했을 때, 총 결제 금액이 변경되지 않는 오류가 있었습니다.

#### [원인 도출]

- 이 원인을 찾기 위해 각각의 함수에서 제대로 값을 업데이트하는지 확인해봤습니다. 확인해보니 상품선택을 관리하는 state 변수에 'true' 값을 가지고 있어야 하는게 'false' 값을 가지고 있는 오류가 있었습니다. 또한 체크박스가 선택이 되고 풀렸을 경우, Change 이벤트 함수로 각각의 총 상품 금액을 기존의 총 결제금액에서 더하나 빼는 방식으로 Hook의 일종인 useState 상태관리 함수를 이용해 총 결제 금액을 표시했습니다.

#### [해결 방안 탐색]

- 하지만 이렇게 작성했을 때 문제점은 수량을 변경했을 때, redux 데이터값이 수정되는데 이를 해당 js에서 다시 redux 데이터를 받아와서 state 값으로 변경하려하니 어느 부분에서 문제가 생기는지 찾기도 어려웠고, 굉장히 데이터 관리가 번거로웠습니다. 그래서 기존의 방식을 변경해서 처음부터 상품의 수량을 조절하는 버튼을 눌렀을 때, redux에 전송되는 데이터로 체크가 된 상품만을 찾아서 가격을 더해 총 결제 금액을 표시하자라는 생각을 했습니다.

#### [해결방안 적용]

- 그렇게 redux데이터가 업데이트 되었을 때, Hook의 일종인 useEffect를 이용해, 체크박스의 변경이 생길때마다 redux 데이터를 가져와 렌더링 될때마다 체크가 된 상품만을 모두 더하는 방식으로 총 결제 금액을 표시할 수 있었습니다.

#### [효과]

- 기존에는 state변수를 활용해 수량이 추가가 되거나 감소하면 해당 금액을 뺐는데, 이는 redux 데이터를 새로운 state변수에 저장해 그 변수를 또 가공해버리기 때문에 굉장히 복잡하고 효율적이지 않았습니다. 반면에 해결방안을 적용했을 때는 수량조절 버튼을 눌렀을 때, reducer로 action을 전달합니다. 그럼 변경된 State를 redux에서 가져옵니다. 더욱 자연스러운 흐름을 가진 로직으로 만들 수 있었습니다.

<br/>

<details>
<summary> 📙기존의 코드 펼치기</summary>
<br/>

- 해당 상품이 선택되었다면, 상품의 `수량 * 가격`을 `총 결제금액`에 더해준다.
- 아래 함수는 상품의 수량을 조절했을 때, 발생하는 이벤트 함수

```js
const onChange = (e) => {
	console.log(e);
	console.log(`checked = ${e.target.checked} , i = ${e.target.checkNumber}`);
	console.log(selectPay + e.target.item.price * e.target.item.quan);
	let copy = [...isselect];

	//copy의 checkNumber 인덱스 값을 변경해준다.
	copy[e.target.checkNumber] = e.target.checked;
	setIsSelect(copy);
	if (e.target.checked === true) {
		//체크박스가 체크되었을때 해당 상품 총 금액을 더해준다.
		setSelectPay(selectPay + e.target.item.price * e.target.item.quan);
	} else if (e.target.checked === false) {
		//체크박스가 체크되었을때 해당 상품 총 금액을 빼준다.
		setSelectPay(selectPay - e.target.item.price * e.target.item.quan);
	} else {
		alert('잘못된 선택입니다.');
	}
};
```

</details>

<br/>

<details>
<summary> 📘변경된 코드 펼치기</summary>

<br/>

👉 [ 원본 보기 ](https://github.com/MinsoftK/astronaut-shop/blob/6f5a851647893dec98c3a2cd70353b3dcd5be541/shop/src/container/Cart.js#L19)

<br/>

> 변경된 코드

- 코드를 정리하자면, `useEffect`를 이용해 처음 렌더링 될때 상품의 개수와 가격을 저장하는 state 변수를 선언한다.
- 상품의 수량과 체크박스의 변경이 일어나면, 체크박스가 `true`인 상품의 새로운 총 결제금액을 다시 업데이트한다. (2번째 useEffect 코드부분)
- 체크되었을 때, 체크박스의 상태를 업데이트 해준다.
- 수량 `+`, `-` 버튼을 클릭했을 때, 새로운 상품 금액을 state 변수에 업데이트 해준다.
- 항목삭제를 했을때, 상품의 리스트에서도 삭제를 해준다.

```js
//(shop / src / container/Cart.js)
//처음 렌더링될 때
useEffect(() => {
	console.log('훅을 이용해 redux state 가져오기', reduxstate);
	console.log('state', reduxstate);

	//렌더링될때 상품의 개수만큼 checkbox state를 저장할 obj 생성
	let copybox = [];
	let copypay = [];
	for (let i = 0; i < reduxstate.length; i++) {
		copybox.push(false); //선택 박스 false 초기화
		copypay.push(reduxstate[i].price * reduxstate[i].quan); // 상품 각각의 결제가격 초기화
	}
	setIsSelect(copybox);
	setSelectPay(copypay);
}, []);
//선택된 상품이나 가격이 변할 때, 재렌더링
useEffect(() => {
	console.log('선택박스 변화', isselect);
	let total = 0;
	for (let i = 0; i < state.length; i++) {
		if (isselect[i] === true) {
			total += selectPay[i];
		}
	}
	setTotalPay(total);
}, [isselect, selectPay, totalPay]);

//체크된 상품의 총 상품금액 업데이트
const onChange = (e) => {
	console.log(e);
	console.log(`checked = ${e.target.checked} , i = ${e.target.checkNumber}`);

	//copy의 checkNumber 인덱스 값을 변경해준다.
	let copy = [...isselect];
	copy[e.target.checkNumber] = e.target.checked;
	setIsSelect(copy);
};
const onClickBtn = (i) => {
	//상품의 개수가 1보다 크고, 상품이 선택되었을 때만 가격을 변경해준다.
	let pay = [...selectPay];
	pay[i] = state[i].quan * state[i].price;
	console.log(pay);
	setSelectPay(pay);
};
```

<br/>

</details>

</div>
     </details>

<br/><br/>

# 6. 기타 트러블슈팅

<details>
  <summary> 6.1. 반복문으로 컴포넌트 호출시 Warning</summary>
  <div markdown="1">

## `Warning: Each child in a list should have a unique "key" prop.`

리액트에서는 DOM 엘리먼트와 컴포넌트간의 관계를 key props를 통해서 판단한다. 그래서 idx로 key값이 입력되는건 권장되지 않는다. `<div key={text}>` 를 넣어줌으로써 오류를 해결할 수 있었다. map 또는 반목문을 돌렸을 경우 key를 입력받는 것을 권장한다.
https://sentry.io/answers/unique-key-prop/

</div>
</details>

<details>
  <summary> 6.2. 상품의 리스트 반복문 만드는 과정에서: Cannot read property 'imageUrl' of undefined</summary>
  <div markdown="2">

## `Cannot read property 'imageUrl' of undefined`

부모의 state를 자식에 넘겨야하는데 나는 이상한 변수들을 props로 넘기고 있었다. 그래서 state 변수인 shoes를 그대로 ShoesItem이라는 컴포넌트에 넘겨줬고 shoes state에 상품 정보들이 객체로 담겨 있는 것을 확인할 수 있었다. 그럼에도 shoesItem 컴포넌트가 제대로 렌더링 되지 않고 있었다. shoesItem에서 console.log 를 찍어봐도 전혀 props를 인식하지 못했다. props를 잘못 넘겨주는 구간을 console.log로 찾아 해결했다.

</div>
</details>

<details>
  <summary> 6.3. 렌더링시 SCSS 버전 오류 </summary>
  <div markdown="3">

## `Node Sass version 5.0.0 is incompatible with ^4.0.0. `

- 기존의 CRA로 만들어진 프로젝트는 scss 5.0 버전과 충돌 발생

```

//node-sass 삭제
$ yarn remove node-sass
//node-sass 4.14.0버전 설치
$ yarn add node-sass@4.14.0

```

https://guswnl0610.github.io/react/react-sass-error/

</div>
</details>
<details>
  <summary> 6.4. ShoesList 자체에 onClick이벤트가 먹히지 않는 문제. </summary>
  <div markdown="4">

## `컴포넌트에서는 HTML 특성인 onClick이벤트를 작성할 수 없다.`

버튼처럼 이벤트를 작성할 수 없는 곳에서도 <Link>나 history를 사용해서 해결할 수 있었다. history를 이용하면 더욱 깔끔하게 사용할 수 있다.

</div>
</details>
<details>
  <summary> 6.5. 내장함수 filter를 사용했을 때 '===' 사용 문제  </summary>
  <div markdown="5">

## `'==' '===' 는 다르다`

useParmas() 훅을 이용할때 반환되는 id와 props에 들어있는 item의 id가 일치하는가?
`===`를 사용했을때 데이터 타입까지 비교한다. params의 id값은 string이므로 parseInt를 통해 int로 바꿔준다.

```js
let filterItem = props.shoes.filter((item) => item.id == id);

let filterItem = props.shoes.filter((item) => item.id === parseInt(id));
```

https://minsoftk.tistory.com/64  
https://minsoftk.tistory.com/65

</div>
</details>

<details>
<summary> 6.6. 여자카테고리에서 상품을 클릭했을때 남자들 상품이 바인딩 되는 오류</summary>
  <div markdown="6">
  
  <br/>

props.sex 가 여성 카테고리일 경우 "womanshoes"로 넘어오는데 "woman"과 비교한다. 이를 "womanshoes"로 바꿔줬다.

> 기존코드

```js
(./component/ShoesItem.js)
let src =
		props.sex === 'woman'
			? '/womanshoes/' + props.shoes.id
			: '/manshoes/' + props.shoes.id;
```

<br/>
<br/>

> 수정코드

```js
(./component/ShoesItem.js)
let src =
		props.sex === 'womanshoes'
			? '/womanshoes/' + props.shoes.id
			: '/manshoes/' + props.shoes.id;
```

  </div>
</details>

<details>
<summary> 6.7. bootstrap css 적용 오류</summary>
  <div markdown="7">
<br/>

Navbar 컴포넌트를 불러오는데 Navbar.css에 a 태그 전체를 컬러 white로 수정해버려, bootstrap css가 적용이 되지 않았다.  
 전체 a태그를 수정해버리는 코드를 삭제하고 `.className a { }` 로 수정
<br/>

</div>
</details>

<br/><br/>

# 7. 개선

## 7.1. 오류

- ~~상품 선택 이후 수량을 변경했을 때, 결제금액이 최신화 되지 않는 오류~~ (21.08.26)
- ~~장바구니에서 상품 삭제시 장바구니 list 업데이트 오류~~ (21.08.26)
- ~~항목선택 state와 가격 state 합치기~~ (useEffect 오류로 취소)
- ~~상품 장바구니로 추가시 합친 State가 빈 배열로 변하는 문제~~ (useEffect 중복 문제로 State를 다시 나눠서 해결해야 했다.)
- 장바구니에 넣기 전에 재고가 0인 경우 검증.
- 상세페이지로 이동 후, 뒤로가기 눌렀을 때 버튼 비활성화가 풀리는 오류

## 7.2. 기능 추가

- 상품 전체 선택 기능 추가.
- 로그인 기능 추가.
- 채팅기능 추가
- Node.js와 MongoDB 연동하기. 연결한 이후 '결제' 기능을 활성화해 Data 수정.

  <br/>
  <br/>

## 개발일지

프로젝트를 진행하면서 개인적으로 고민했던 기술적, 구조적 문제들을 고민하고 해결과정을 작성한 포스트

- [개발일지1](https://minsoftk.tistory.com/66)
- [개발일지2](https://minsoftk.tistory.com/67?category=872236)

  <br/>
  <br/>

## 📕 Reference

- [lazy loading](https://velog.io/@vagabondms/%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%84%B0%EB%94%94-Lazy-loading%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
- [memo](https://ui.toast.com/weekly-pick/ko_20190731)
- [memo2](https://medium.com/wantedjobs/react-profiler%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%84%B1%EB%8A%A5-%EC%B8%A1%EC%A0%95%ED%95%98%EA%B8%B0-5981dfb3d934)
- https://engineering.linecorp.com/ko/blog/line-securities-frontend-4/

<hr/>

- 5.1. CORS  
   https://developer.mozilla.org/ko/docs/Web/HTTP/CORS  
   https://evan-moon.github.io/2020/05/21/about-cors/  
  https://blog.naver.com/PostView.naver?blogId=dnvld1&logNo=222039760747&redirect=Dlog&widgetTypeCall=true&directAccess=false  
  https://tried.tistory.com/m/76

- 5.4. Map  
  https://lktprogrammer.tistory.com/121  
  https://mjn5027.tistory.com/80
- 5.6. Splice
  https://im-developer.tistory.com/103
- 6.1.  
  https://sentry.io/answers/unique-key-prop/

- 6.3  
  https://guswnl0610.github.io/react/react-sass-error/
- 6.4  
  https://lannstark.tistory.com/122  
  https://gongbu-ing.tistory.com/45  
  [history 파라미터 같이 보내기](http://lab.naminsik.com/4008)
- 6.5  
   https://minsoftk.tistory.com/64  
  https://minsoftk.tistory.com/65
