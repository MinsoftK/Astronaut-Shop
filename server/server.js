const express = require('express');
const path = require('path');
const app = express();

//session 로그인
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//몽고 DB 접속
const MongoClient = require('mongodb').MongoClient;
app.use(express.urlencoded({ extended: true }));
app.set('view engnine', 'ejs');

let db;
MongoClient.connect(
	'mongodb+srv://minsoftk:qwer1234@cluster0.cfdkr.mongodb.net/astronautshop?retryWrites=true&w=majority',
	function (err, client) {
		if (err) console.log(err);
		db = client.db('astronautshop'); // todoapp db에 연결 요청

		app.listen('8080', function () {
			console.log('8080 listening');
		});
	}
);

//미들웨어
app.use(
	session({ secret: '비밀코드', resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../shop/build')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../shop/build/index.html'));
});
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '../shop/build/index.html'));
});

app.post(
	'/login',
	passport.authenticate('local', { failureRedirect: '/fail' }),
	function (요청, 응답) {
		응답.redirect('/');
	}
);

passport.use(
	new LocalStrategy(
		{
			usernameField: 'id',
			passwordField: 'pw',
			session: true,
			passReqToCallback: false,
		},
		function (입력한아이디, 입력한비번, done) {
			//console.log(입력한아이디, 입력한비번);
			db.collection('member').findOne(
				{ id: 입력한아이디 },
				function (에러, 결과) {
					if (에러) return done(에러);

					if (!결과)
						return done(null, false, { message: '존재하지않는 아이디입니다.' });
					if (입력한비번 == 결과.pw) {
						return done(null, 결과);
					} else {
						return done(null, false, { message: '잘못입력하셨습니다.' });
					}
				}
			);
		}
	)
);
