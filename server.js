const express = require("express");
const cors = require("cors");
const app = express();
// const port = process.env.PORT || 8080; //포트번호는 지정할 수 있음
const port = 8080;
const models = require('./models');
app.use(express.json());
app.use(cors());

app.get('/lists',async(req,res)=>{
    res.send({
        lists : [
            {
                id:1,
                name: "성시원",
                age: 28,
                gender: "여성",
                job: "방송국 막내 스태프"
            },
            {
                id:2,
                name: "윤윤재",
                age: 28,
                gender: "남성",
                job: "변호사"
            },
            {
                id:3,
                name: "성동일",
                age: 59,
                gender: "남성",
                job: "야구 감독"
            }
        ]
    });
})

app.post("/lists", async (req, res) => {
    const body = req.body;
    res.send({
        "body":body
    })
});

app.get("/lists/:id",(req,res)=>{
    const params = req.params;
    const {id} = params;
    res.send(`id는 ${id}입니다.`)
})

//설정한 app을 실행시키기
// app.listen(port, ()=>{
//     console.log('고객 게시판 서버가 돌아가고 있습니다.');
// })
app.listen(port, ()=>{
    console.log('고객 게시판 서버가 돌아가고 있습니다.');
    models.sequelize
    //데이터베이스와 동기화(sqlite와 연결) 시키겠다.
    .sync()
    .then(()=>{
        console.log('DB연결성공');
    })
    .catch(function(err){
        console.error(err);
        console.log('DB연결에러');
        process.exit();
    })
})

