require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { rankRouter } = require('./routes/rankRouter');

const app = express();
const { MONGO_URI, MY_APP_PORT } = process.env;

mongoose.connect(MONGO_URI);

app.use(express.json());
app.use("/api/ranks", rankRouter);

app.listen(MY_APP_PORT, () => {
  console.log(`Server port ${MY_APP_PORT}`);
});

module.exports = app;

// mongoose.connect( // MongoBD 클러스터 연결 (admin / Tdm6NtGLhGB9bRgp)
// 	process.env.MONGO_URI
// )
// .then(() => {
// 	console.log("mongoDB Conneected.");
	
// 	app.use(express.static("build"));
// 	app.get("/", (req, res) => {
// 		res.sendFile(__dirname + "/build/index.html");
// 	})
// 	app.use(express.json()); //req.body를 json형식으로 변경(미들웨어 설정)
// 	app.use("/ranks", rankRouter);
// 	app.listen(MY_APP_PORT, () => {
// 		console.log(`Server port ${MY_APP_PORT}`)
// 	});
// })
// .catch((err) => console.log(err))