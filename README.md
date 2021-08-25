# 🚀 Astronaut's Shop

> 기존의 쇼핑몰 그대로 만들어보기. 실제 쇼핑몰처럼 구현하려 노력했습니다. `무신사`, `코오롱몰`, `쿠에른` 등 여러 쇼핑몰을 참고.

netlify [Demo 버전](https://priceless-davinci-7b8ea1.netlify.app/)

```

```

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

- 최상단인 APP에서부터 데이터를 자식 컴포넌트까지 뿌려준다.
- Cart 컨테이너에선 redux로 상태 관리한다.
- 현재의 데이터 흐름을 결정하게 된 내용의 [포스트](https://minsoftk.tistory.com/66)
- 프로젝트를 시작할 때 백엔드없이 시작하다 보니 기존의 Data를 프로젝트의 JS 파일에서 받아온다. 그래서 현재 데이터의 수정이 불가하다. Node.js와 MongoDB를 활용해 백엔드를 연결 중에 있다. 연결한 이후 '결제' 기능을 추가해 Data를 수정한다.

<br/>
<br/>

# 4. 주요 기능

기존의 쇼핑몰을 참고하여, 사용자들에게 편리한 기능들과 보기 좋은 UX를 제공하는 서비스를 개발을 중점으로 했습니다.

<br/>

<details>
<summary>4.1. axios모듈로 Data를 상품 리스트에 추가</summary>
<div markdown="1">
<br/>

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme1.png?raw=true" width="800" height="600"/></center>

- 프로젝트를 처음 시작할 때, 미리 Data를 json파일로 만들어놨다. 해당 데이터들을 다른 [github Repository](https://github.com/MinsoftK/jsontest/blob/master/test0.json)에 올려놨다. 여자상품인지 남자상품인지에 따라 다른 json파일을 axios 모듈로 받아온다. 해당 데이터를 기존의 데이터 obj에 추가해준다.  
  👉 [code 확인](https://github.com/MinsoftK/astronaut-shop/blob/d84390fe076984f8b2f7c370e348df8a4862ec1b/shop/src/container/ShoesList.js#L90)

- 더 보기 버튼을 클릭했을 때, 만약 더는 진열할 상품이 없다면 더 보기 버튼을 비활성화시킨다. 남자, 여자 카테고리의 버튼의 state를 따로 관리한다.

  👉 [code 확인](https://github.com/MinsoftK/astronaut-shop/blob/d84390fe076984f8b2f7c370e348df8a4862ec1b/shop/src/container/ShoesList.js#L100)

  <br/>
  <br/>
  </div>
  </details>

<details>
<summary>4.2. 상품 클릭시 상세페이지로 이동</summary>
<div markdown="2">
<br/>

### 👉 [전체 code보기](https://github.com/MinsoftK/astronaut-shop/blob/d84390fe076984f8b2f7c370e348df8a4862ec1b/shop/src/component/ShoesItem.js#L16)

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

- 하나의 상품의 클릭이벤트가 발생했을때, history 훅을 이용해 `src`로 이동하게 했다. 그러면 아래와 같이 해당 상품의 정보로 이동할 수 있다.

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme2.png?raw=true" width="800" height="600"/></center>

<br/><br/>

  </div>
  </details>

  <details>
<summary> 4.3. Redux를 사용한 장바구니</summary>
<div markdown="3">
<br/>

## 장바구니

### 👉 [전체 code](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/container/Cart.js)

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme3.png?raw=true" width="600" height="600"/></center>

- 그림과 같이 상품 상세정보창에서 장바구니에 추가 버튼을 클릭하면, 장바구니 페이지에 추가가 된다. 이미 전달된 상세페이지에서 Cart로의 Data 전달은 상당히 까다롭다. 그래서 Redux 상태 관리 툴을 이용해 관리했다. 👉 [redux code보기](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/redux.js)

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

- 위의 장바구니에 추가 버튼을 눌르면 payload로 redux데이터에 해당 컴포넌트에서 props로 받아온 데이터를 넘겨준다.
- 장바구니 페이지의 `+`, `-` 버튼을 눌를때마다 redux의 action으로 전달되어 해당 작업을 수행한다.

<br/><br/>

  </div>
  </details>

  <details>
<summary> 4.4. 장바구니 상품 선택 기능</summary>
<div markdown="4">
<br/>

## 상품 선택 결제 기능

### 👉 [ 해당 코드 ](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/container/Cart.js)

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme8.png?raw=true" width="600" height="400"/></center>

- 장바구니에서 상품을 선택하면 상품이 실시간으로 업데이트 된다. 👉 [ checkbox 코드 ](https://github.com/MinsoftK/astronaut-shop/blob/6e469964e4a983b527d0525eae5f622bd2c4e05f/shop/src/container/Cart.js#L30)

```js
//처음 렌더링될 때
useEffect(() => {
	console.log('훅을 이용해 redux state 가져오기', state);
	console.log('state', state);

	//렌더링될때 상품의 개수만큼 checkbox state를 저장할 obj 생성
	let copy = [];
	for (let i = 0; i < state.length; i++) copy.push(false);
	setIsSelect(copy);
}, []);
```

- 이 기능을 만들기 위해 useEffect 훅을 이용해 처음에 렌더링 될 때, 기존의 redux 데이터의 개수만큼 obj를 만들어 false를 입력해줬다. 기존의 버튼들은 선택되지 않는 false 값을 default로 가지게 했다.
- 버튼이 눌렸을 때 useState를 이용한 state 값 변경으로 실시간 업데이트를 가능하게 만들었다.
  <br/><br/>

```js
const onChange = (e) => {
	console.log(`checked = ${e.target.checked} , i = ${e.target.checkNumber}`);
	let copy = [...isselect];
	//copy의 checkNumber 인덱스 값을 변경해준다.
	copy[e.target.checkNumber] = e.target.checked;

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

- 이벤트가 발생할 때, 위에서 만들어 놓은 redux의 obj의 값이 만약 true라면, 선택되었으므로 해당 상품의 개수와 금액을 곱한 값으로 state를 변경해준다.
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

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme4(lazy-before).png?raw=true" width="600" height="600"/></center>

> lazy loading 적용 후

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme5(lazy-after).png?raw=true" width="600" height="400"/></center>

<br/>
<br/>

- React dev tool을 이용해 시간을 측정해서 렌더링 최적화에 효과가 있는지 비교해봤다. lazy loading 적용 이후 memo를 사용했을 때도 렌더링 시간을 측정해봤다. meme는 장바구니 페이지에서 사용했다. 그 이유는 수량을 조절할때, 리렌더링 되는 부분이 많았기 때문이다.

  > memo 적용 전

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme7(memo-before).png?raw=true" width="600" height="400"/></center>

> memo 적용 후

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme6(memo-after).png?raw=true" width="600" height="400"/></center>

- memo를 사용했을 때, 큰 차이가 없이 렌더링 되는 경우도 있었다. 하지만 추가되는 상품들이 추가가 될 때마다 memo를 체감할 수 있다. lazy loading처럼 큰 속도 향상은 볼 수 없었다.

<br/>

  </div>
  </details>
<br/>

# 5. 주요 트러블슈팅

<details>
  <summary> 5.1. json을 통해 Data 받아올 때, CORS 오류</summary>
  <div markdown="1">

    <br/>

## json을 통해 Data 받아올 때, CORS 오류

- 초기 환경에서 DB가 없어서 로컬환경을 이용해 axios 모듈을 통해서 github에 올려진 JSON 파일을 받아오려 했다. 하지만 `Access to XMLHttpRequest at 'https://github.com/MinsoftK/react/blob/main/shop/src/Data/addManShoes.json' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.` 오류가 발생했다. CORS 오류에 대해서 찾아봤는데 왜 CORS 오류가 발생하는지 이해하기 어려웠다.

- 원인은 github에서 JSON 파일을 제대로 안 만들어서였다. JSON을 배포해줄 서버를 가지고 있어야 하는데 프론트엔드 개발 중 서버를 만들어 확인하기란 상당히 까다로웠다. 그래서 프론트엔드 환경에서만 확인할 수 있는 방법을 찾아야 했다. 그러나 정보가 많이 없어서 찾기 힘들었지만 stackoverflow에서 [단서](https://stackoverflow.com/questions/29612800/load-json-from-github-file)를 얻을 수 있었다. 여러 가지를 찾아본 결과, github에서 JSON을 불러오려면 해당 repository가 배포되어 있어야 한다는 것을 알았다. 그래서 JSON을 배포할 수 있는 [Repository](https://github.com/MinsoftK/jsontest)를 따로 만들어줘서 해결할 수 있었다.

  > axios 모듈

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

- 위와 같이 새로운 저장소 url로 json파일을 배포한 뒤, axios모듈로 데이터를 불러왔을 때 CORS 오류없이 정상적으로 동작하는 것을 확인할 수 있었다. 👉 [ 해당 코드 ](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/container/ShoesList.js#L91)

  <br/><br/>

</div>
</details>

<details>
  <summary> 5.2. 더보기 버튼 클릭시, 무한 상품 로딩 문제</summary>
  <div markdown="2">

<br/>

## 상품 더보기 버튼 클릭시, 무한 상품 로딩

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

- 만약 기존의 데이터와 불러온 데이터를 합한 `newObj`의 길이가 여자상품의 개수보다 크거나 같다면 버튼을 비활성화 시킨다. 👉 [ 해당 코드 부분 ](https://github.com/MinsoftK/astronaut-shop/blob/f8f2b700e9fe171cacf5ad44edbb1ba525bda118/shop/src/container/ShoesList.js#L100)

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
  <summary> 5.3. 주문 결제 금액 표시 문제</summary>
  <div markdown="3">
<br/>

## 총 결제금액 표시 문제

- 기존의 코드에선 장바구니에 추가된 모든 상품의 총 결제금액을 미리 state 변수가 가지고 있었다. 하지만 상품을 선택 기능을 추가할 때, 기존의 코드를 수정해야 했다.

* 처음에 고민했던 부분은 장바구니에 추가되어있는 상품마다 checked가 됐는지 안됐는지, state 변수를 만들어야 했다. 그리고 useEffect로 선택이 해제되었을 때 총금액을 표시하려 했다. 그리고 버튼을 클릭했을 때 기존의 setPay 한 부분들을 수정해야 했다. 하지만 그렇게 짜려면 `{state.map ...}` 함수 선언문 밖에서 처리를 해야 했다. 그렇게 차려 하니 redux와 꼬여 `Too many re-renders. React limits the number of renders to prevent an infinite loop.` 오류가 발생하게 됐고, 코드가 복잡해지고 부자연스러워서 해결하기 어려웠다.

* 그러다 redux의 data를 가지고 오는 state.map 반복문 안에서 checkbox의 상태가 변할 때 같이 값을 적용하는 게 어떨까? 생각했다. 그래서 아래와 같이 체크박스의 상태가 변했을 때 상태에 따라서 선택된 상품의 가격인 `selectPay`의 state를 변경시켜줬다. 이후 훨씬 깔끔하게 코드를 짤 수 있었고, 정상적인 동작을 확인할 수 있었다.

<br/>
<br/>

> 기존 코드

```js
<Button
	variant="light"
	onClick={() => {
		dispatch({ type: '수량감소', data: i });
		setPay(pay - item.price);
	}}>
	-
</Button>;
{
	' ' + item.quan + ' ';
}
<Button
	variant="light"
	onClick={() => {
		dispatch({ type: '수량증가', data: i });
		setPay(pay + item.price);
	}}>
	+
</Button>;
```

<br/>

> 변경된 코드

- 위의 수량 버튼을 클릭했을때마다 결제금액을 수정하는 것을 없애고, 체크박스가 선택 되었을 때, 총 결제금액을 업데이트 해줬다. 이를 위해선 처음에 렌더링 될 때, 장바구니에 담긴 상품의 개수만큼 체크가 되었는지 상태를 관리할 state변수가 필요했다. 그래서 아래와 같이 useEffect를 이용해 state변수를 만들어줬다.

```js
useEffect(() => {
	//렌더링될때 상품의 개수만큼 checkbox state를 저장할 obj 생성
	let copy = [];
	for (let i = 0; i < state.length; i++) copy.push(false);
	setIsSelect(copy);
}, []);
```

<br/>

- 상품이 선택됐을 때, 체크박스 변경이벤트가 발생한다. 아래 코드처럼 처음 렌더링될때 만들어진 obj를 변경시켜준다. 👉 [ 해당 코드 ](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/container/Cart.js#L30)

```js
const onChange = (e) => {
	console.log(`checked = ${e.target.checked} , i = ${e.target.checkNumber}`);
	let copy = [...isselect];
	//copy의 checkNumber 인덱스 값을 변경해준다.
	copy[e.target.checkNumber] = e.target.checked;

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

<br/>
    </div>
    </details>

<details>
  <summary> 5.4. 여자 신발 데이터가 바인딩 되야하는데 남자 신발이 바인딩되는 문제</summary>
  <div markdown="4">

<br/>

## 여자 신발 데이터가 바인딩 되야하는데 남자 신발이 바인딩되는 문제

## 👉 [ 해당 코드 ](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/container/ShoesList.js#L20)

- 상품들을 클릭했을 때 ShoesDetail 컴포넌트를 호출해야 하는데 어떻게 ShoesList에 있는 Data를 넘길 것인가?

  - 남자, 여자 신발 컴포넌트를 아예 따로 만들어서 전달

  - ShoesList에서 남자 여자 카테고리 선택에 따라 ShoesItem 자식 컴포넌트에 props를 달리 넘겨주기. ShoesList에서 num을 넘겨줘서 ShoesList에서 0이면 남자 Data를 1이면 여자 데이터를 넣어서 export 하게 만들었다.

* 결국 정리하자면 man, woman 상품의 카테고리마다 다른 페이지에서 상품들이 렌더링 되게 만들고 싶었다. 그래서 남자, 여자 신발의 데이터 변수를 따로 만들어줬다. App에서 ShoesList에 남자면 num:0 , 여자면 num:1을 props로 넘겨준다. ShoesList에서는 Man에 따른 상품을 map으로 뿌려주는 컴포넌트와 Woman일 때 상품을 뿌려주는 경우 2가지로 구성했다. 하지만 num에 따라서 다른 데이터를 입력해줘서 렌더링 할 수 있을 거라 생각했지만 `Too many re-renders. React limits the number of renders to prevent an infinite loop.` 오류가 떴다.

<br/>

> 변경된 코드

- 렌더링 되는 과정에서 렌더링에 영향을 미치는 `Shoes` state 변수를 수정해서 오류가 생겼다. 이를 해결하기 위해서 각각의 UI 창을 만들어서 해결했다. `props.num`이 1이면 `컴포넌트를 반환하고, 0이면` 컴포넌트를 반환한다.

- map을 써야 될 때 단일 컴포넌트가 아니면 작동이 되지 않는다고 해서 새로운 modal 창을 만들어서 map에서 return 하게 해주고 있다. 왜 안되는지는 이유를 알지 못했다. 하나의 컴포넌트만을 return 해야 되는 것 같다. JSX 문법에 맞춰 작성해도 삼항 연산자 안에서 여러 개의 태그를 감싸고 있다면, 자바스크립트 엔진에서 parsing 에러가 일어나는 것 같다. 따라서 아래처럼 각각의 UI를 컴포넌트로 만들어서 삼항 연산자에서 return 하게 해줬다.

👉 [ 해당 코드 ](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/container/ShoesList.js#L35)

```js
//props.num이 0이면 남자 화면 렌더링
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

</div>
</details>

<details>
  <summary>5.5. 장바구니에 상품이 존재하는데 중복으로 상품이 추가 되는 문제</summary>
  <div markdown="5">

<br/>

## 중복으로 추가되는 문제

- payload로 넘겨준 데이터와 redux 데이터를 비교해서 같은 상품의 이름이 존재한다면 해당 idx를 found에 저장한다. found가 0보다 큰 경우라면(존재한다면) 개수를 증가시켜준다. 0보다 작을경우에는 그대로 `push`를 써서 copy obj에 추가해준다.  
  👉 [ 해당 코드 ](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/redux.js#L26)

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

</div>
</details>

<details>
<summary> 5.6. 장바구니 상품 체크 후, 수량 변경시 오류, 음수 나오는 오류</summary>
<div markdown="6">
<br/>

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme9.png?raw=true" width="800" height="600"/></center>

- 그림과 같이 수량을 변경했을때, 총 결제금액이 표시된다. 하지만 이후 수량을 변경하거나 체크를 풀었을 때, 총 결제금액에 변경값이 적용되지 않는다. 그래서 수량 변경 버튼을 눌렀을 때, 아래와 같이 if문을 추가해줬다. 그런데 상품이 선택되었을 때, `isselected[i]`의 값이 `true`여야 하는데 `false`값을 가지고 있었다. 그래서 상품의 총 결제 금액이 제대로 표시되지 않았다.

<br/>

<details>
<summary>기존의 코드 펼치기</summary>
<br/>

- 해당 상품이 선택되었다면, 상품의 `수량 * 가격`을 `총 결제금액`에 더해준다.

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

- redux 데이터와 state데이터가 혼합되면서 이해하기도 어려웠고, 잦은 오류가 발생했다. 그래서 새로운 방법으로 코드를 변경했다. 아래는 코드를 변경하면서 고려한 점이다.

  - 각각 상품의 결제 금액을 배열로 상태변수로 관리한다.
  - 상품 선택 버튼을 눌렀을 때, reducer함수로 payload가 전달이 된다. 전달이 된 후, 리렌더링 되므로 **장바구니 페이지에서 redux의 상태를 reduxstate란 이름으로 가져온다.** 따라서 reduxstate의 수량과 가격을 활용해 상품의 결제 금액의 배열을 저장하는 state변수를 업데이트 한다.
  - 체크 박스가 선택 여부에 따라 총 결제 금액을 구해준다.

<br/>

- 👉 [ 변경된 코드 원본 ](https://github.com/MinsoftK/astronaut-shop/blob/6f5a851647893dec98c3a2cd70353b3dcd5be541/shop/src/container/Cart.js#L19)

```js
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
pay[i] = state[i].quan \* state[i].price;
console.log(pay);
setSelectPay(pay);
};

```

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

## 컴포넌트에서는 HTML 특성인 onClick이벤트를 작성할 수 없다.

버튼처럼 이벤트를 작성할 수 없는 곳에서도 <Link>나 history를 사용해서 해결할 수 있었다. history를 이용하면 더욱 깔끔하게 사용할 수 있다.

</div>
</details>
<details>
  <summary> 6.5. 내장함수 filter를 사용했을 때 '===' 사용 문제  </summary>
  <div markdown="5">

## '==' '===' 는 다르다

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

# 7. 보완점

- 상품 전체 선택 기능.
- 상품 선택 이후 수량을 변경했을 때, 결제금액이 최신화 되지 않는 문제.
- Node.js와 MongoDB를 활용해 백엔드를 연결중. 연결한 이후 '결제' 기능을 추가해 전체 Data를 수정한다.(데이터 옮기기)
- 장바구니에 넣기 전에 재고가 0인 경우 검증.
- 로그인 기능.

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

- 5.4. Map  
  https://lktprogrammer.tistory.com/121  
  https://mjn5027.tistory.com/80

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
