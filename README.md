# 🚀 Astronaut's Shop

> 기존의 쇼핑몰 그대로 만들어보기
> 실제 쇼핑몰처럼 구현하려 노력했습니다. 그 과정에서 `무신사`, `코오롱몰`, `쿠에른` 등 여러 쇼핑몰을 참고했습니다.

- netlify Demo 버전
  [Demo](https://priceless-davinci-7b8ea1.netlify.app/)
  <br/>

# 1. 제작 기간 & 참여 인원

- 2021.07 ~ 진행중
- 개인 프로젝트

</br>

# 2. 사용 기술

## `Back-end`

- Nodejs (v14.17.4)
  / Express
- MongoDB

## `Front-end`

- React
- npm
- ant-design, boot-strap
- styled-component
- React Developer Tool
- Visual Studio Code

</br>

# 3. 데이터 흐름도

![](https://github.com/MinsoftK/astronaut-shop/blob/master/flowchart2.png?raw=true)

- 최상단인 APP에서부터 데이터를 자식 컴포넌트까지 뿌려준다.
- 현재의 데이터 흐름을 결정하게 된 내용의 [포스트](https://minsoftk.tistory.com/66)
- 프로젝트를 시작할 때 백엔드없이 시작하다보니 기존의 Data를 프로젝트의 js파일에서 받아온다. 그래서 현재 데이터의 수정이 불가하다. Node.js와 MongoDB를 활용해 백엔드를 연결중에 있다. 연결한 이후 '결제' 기능을 추가해 Data를 수정한다.

<br/>
<br/>

# 4. 주요 기능

기존의 쇼핑몰을 참고하여, 사용자들에게 편리한 기능들과 보기좋은 UX를 제공하는 서비스를 개발을 중점으로 했습니다.

<br/>

<details>
<summary>4.1. axios모듈로 Data를 상품 리스트에 추가</summary>
<div markdown="1">
<br/>

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme1.png?raw=true" width="600" height="400"/></center>

- 프로젝트를 처음 시작할 때, 미리 Data를 json파일로 만들어놨다. 해당 데이터들을 다른 [github Repository](https://github.com/MinsoftK/jsontest/blob/master/test0.json)에 올려놨다. 여자상품인지 남자상품인지에 따라 다른 json파일을 axios 모듈로 받아온다. 해당 데이터를 기존의 데이터 obj에 추가해준다.  
  👉 [code 확인](https://github.com/MinsoftK/astronaut-shop/blob/d84390fe076984f8b2f7c370e348df8a4862ec1b/shop/src/container/ShoesList.js#L90)

- 더보기 버튼을 클릭했을 때, 만약 더이상 진열할 상품이 없다면 더보기 버튼을 비활성화 시킨다. 남자, 여자 카테고리의 버튼의 state를 따로 관리한다.
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

- 하나의 상품의 클릭이벤트가 발생했을때, history 훅을 이용해 `src`로 이동하게 했다. 그러면 아래와 같이 해당 상품의 정보로 이동할 수 있었다.

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme2.png?raw=true" width="600" height="400"/></center>

<br/><br/>

  </div>
  </details>

  <details>
<summary> 4.3. Redux를 사용한 장바구니</summary>
<div markdown="3">
<br/>

# 장바구니

### 👉 [전체 code보기](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/container/Cart.js)

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme3.png?raw=true" width="800" height="600"/></center>

- 그림과 같이 상품 상세정보창에서 장바구니에 추가 버튼을 클릭하면, 장바구니 페이지에 추가가 된다. 이미 전달된 상세페이지에서 Cart로의 Data 전달은 상당히 까다롭다. 그래서 Redux라는 상태 관리 툴을 이용해 관리했다. 👉 [redux code보기](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/redux.js)

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

# 상품 선택 결제 기능

### 👉 [전체 code보기](https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/container/Cart.js)

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme7.png?raw=true" width="800" height="600"/></center>

- 장바구니에서 상품을 선택하면 상품이 실시간으로 업데이트 된다. 👉 [checkbox 전체 코드 보기](https://github.com/MinsoftK/astronaut-shop/blob/6e469964e4a983b527d0525eae5f622bd2c4e05f/shop/src/container/Cart.js#L30)

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

- 이 기능을 만들기 위해 useEffect 훅을 이용해 처음에 렌더링될 때, 기존의 redux 데이터의 개수만큼 obj를 만들어 false를 입력해줬다. 기존의 버튼들은 선택되지 않는 false 값을 default로 가지게 했다.
- 버튼이 눌렸을때 useState를 이용한 state값 변경으로 실시간 업데이트를 가능하게 만들었다.
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

- 이벤트가 일어났을 때, 위에서 만들어 놓은 redux의 obj의 값이 만약 true라면, 선택되었으므로 해당 상품의 개수와 금액을 곱한 값으로 state를 변경해준다.
  <br/><br/>

  </div>
  </details>

 <details>
<summary> 4.5. 렌더링 최적화</summary>
<div markdown="5">
<br/>

# 렌더링 최적화

### 👉 [lazy loading code보기](https://github.com/MinsoftK/astronaut-shop/blob/6e469964e4a983b527d0525eae5f622bd2c4e05f/shop/src/App.js#L13)

### 👉 [memo code보기](https://github.com/MinsoftK/astronaut-shop/blob/6e469964e4a983b527d0525eae5f622bd2c4e05f/shop/src/container/Cart.js#L7)

<br/>

- React dev tool을 이용해 시간을 측정해서 렌더링 최적화에 효과가 있는지 비교해봤다. 제일 먼저 lazy loading을 적용했을 때의 시간을 비교해봤다. `App.js`에서 각각의 `Container` 컴포넌트를 로딩하고 있는데 lazy loading을 사용한 뒤, 렌더링 시간을 측정해봤다. 전체 렌더링 시간은 많이 줄었고, 컴포넌트들도 시간이 미세하게 줄어든 것을 확인할 수 있었다.
  <br/>

> lazy loading 적용 전

<center><img src="https://github.com/MinsoftK/astronaut-shop/blob/master/shop/src/img/readme4(lazy-before).png?raw=true" width="600" height="400"/></center>

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

# json을 통해 Data 받아올 때, CORS 오류

- 초기 환경에서 DB가 없어서 로컬환경을 이용해 axios 모듈을 통해서 github에 올려진 json파일을 받아오려 했다. 하지만 `Access to XMLHttpRequest at 'https://github.com/MinsoftK/react/blob/main/shop/src/Data/addManShoes.json' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.` 오류가 발생했다. CORS 오류에 대해서 찾아봤는데 왜 CORS 오류가 발생하는지 이해하기 어려웠다.

- 원인은 github에서 json 파일을 제대로 안만들어서였다. json을 배포해줄 서버를 가지고 있어야하는데 프론트엔드 개발 중 서버를 만들어 확인하기란 상당히 까다로웠다. 그래서 프론트엔드 환경에서만 확인할 수 있는 방법을 찾아야 했다. 그러나 정보가 많이 없어서 찾기 힘들었지만 stackoverflow에서 [단서](https://stackoverflow.com/questions/29612800/load-json-from-github-file)를 얻을 수 있었다. 여러가지를 찾아본 결과, github에서 json을 불러오려면 해당 repository가 배포되어 있어야 된다는 것을 알았다. 그래서 json을 배포할 수 있는 [Repository](https://github.com/MinsoftK/jsontest)를 따로 만들어줘서 해결할 수 있었다.

  👉 [ 코드 전체 보기](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/container/ShoesList.js#L91)

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

- 위와 같이 새로운 저장소 url로 json파일을 배포한 뒤, axios모듈로 데이터를 불러왔을 때 CORS 오류없이 정상적으로 동작하는 것을 확인할 수 있었다.

  <br/><br/>

</div>
</details>
<details>
  <summary> 5.2. 더보기 버튼 클릭시, 무한 상품 로딩 문제</summary>
  <div markdown="2">

<br/>

# 더보기 버튼 클릭시, 무한 상품 로딩

- 더보기 버튼을 눌렀을 때, 5.1에서처럼 axios모듈을 이용하여 json 데이터를 받아온다. 이때 상품을 불러와도 더보기 버튼이 비활성화되지 않아 무한으로 상품이 추가되는 오류가 있었다. 또한 남자, 여자 카테고리에서 더보기 버튼이 같은 state를 공유하고 있었다. 그래서 남자, 여자 상품 각각의 결과에 대한 버튼 활성화를 관리할 수 있게 state 변수를 2개 만들어줬다.

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

> 수정된 코드

만약 기존의 데이터와 불러온 데이터를 합한 `newObj`의 길이가 여자상품의 개수보다 크거나 같다면 버튼을 비활성화 시킨다.

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
			: axios // i === 0일때 남자 카테고리 더보기 버튼 클릭시
					.get('https://minsoftk.github.io/jsontest/test' + i + '.json')
					.then((result) => {
						let newObj = [...shoes, ...result.data]; //데이터 합치기
						setShoesNum(Data.length + result.data.length); //원래 Data와 추가된 데이터의 길이
						if (newObj.length >= shoesNum) setBtnDisable('true'); //합친 데이터의 길이가 더 크다면 남자 카테고리 버튼 비활성화
						setShoes(newObj);
						console.log(btndisable);
					})
					.catch(() => {
						console.log('실패');
					});
```

<br/><br/>

</div>
</details>

<details>
  <summary> 5.3. 총 결제금액 표시 문제</summary>
  <div markdown="3">
  
  # 총 결제금액 표시 문제

## 👉 [ 코드 전체 보기](https://github.com/MinsoftK/astronaut-shop/blob/ba961917c6cc688e3da929653dd851c6ff4df634/shop/src/container/Cart.js#L30)

처음엔 Cart에 등록된 모든 상품의 수량과 금액에 따라 총 결제 금액을 표시하게 했다. 하지만 대부분의 쇼핑몰에서는 상품을 선택할 수 있는 기능이 있었다. 따라서 상품을 선택할 수 있는 기능을 만들려고하니 문제가 생겼다.

기존에는 상품의 선택없이 수량을 증가하면 total 값을 증가시킴으로 정상적인 값을 출력할 수 있었다. 하지만 상품을 선택하면 해당 금액만을 포함시켜야 하므로 기존의 짠 코드를 적용할 수는 없었다. state로 선택했을 시 값을 관리하고 true, false에 따라 총 결제금액에 포함시키도록 짜야 했다.

처음에 고민했던 지점이 선택된 상품을 알아야 했으므로 상품마다 checked가 됬는지 안됐는지, state 변수를 만들어야 했다. 그리고 useEffect로 선택이 해제되었을때 총 금액을 표시하려 했다. 그리고 버튼을 클릭했을때 기존의 setPay 한 부분들을 수정해야 했다. 하지만 그렇게 짜려면 `{state.map ...}` 함수 선언문 밖에서 처리를 해야했다. 그렇게 짜려하니 redux와 꼬여서 계속 `too many rendering~~` 오류가 발생하게 됐고, 어려웠다. 또한 코드가 복잡해지고 부자연스러웠다.

그래서 redux의 data를 가지고 오는 state.map 반복문 안에서 checkbox의 상태가 변할때 같이 값을 적용시키는게 어떨까? 생각을 했다. 그래서 아래와 같이 체크박스의 상태가 변했을 때 상태에 따라서 선택된 상품의 가격인 `selectPay`의 state를 변경 시켜줬다. 이후 정상적인 동작을 확인할 수 있었다.

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

- 수정된 코드

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

```js

```

  <br/>

- <br/>
  </div>
  </details>

# 6. 핵심 트러블슈팅

## 보완점

- 상품 선택 이후 수량을 변경했을 때, 결제금액이 최신화 되지 않는 문제
- 전체선택 기능 추가하기
- Node.js와 MongoDB를 활용해 백엔드를 연결중에 있다. 연결한 이후 '결제' 기능을 추가해 전체 Data를 수정한다.
- 장바구니에 넣기 전에 재고가 0일때 경우
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
