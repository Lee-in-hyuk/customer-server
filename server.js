const express = require("express");
const cors = require("cors");
const app = express();
// const port = process.env.PORT || 8080; //포트번호는 지정할 수 있음
const port = 8080;
const models = require('./models');
app.use(express.json());
app.use(cors());

app.get('/lists',async(req,res)=>{
    console.log('sdfdsf');
    const queryString = req.query;
    models.Lists.findAll({
        limit: 10,
        order: [
            ["createdAt","DESC"]
        ],
        attributes: [ //조회할 컬럼들 설정
            "id",
            "name",
            "age",
            "createdAt",
            "gender",
            "job"
        ]
    })
    .then((result)=>{
        res.send({
            lists:result
        })
        // res.send({
        //     lists : [
        //         {
        //             id:1,
        //             name: "성시원",
        //             age: 28,
        //             gender: "여성",
        //             job: "방송국 막내 스태프"
        //         },
        //         {
        //             id:2,
        //             name: "윤윤재",
        //             age: 28,
        //             gender: "남성",
        //             job: "변호사"
        //         },
        //         {
        //             id:3,
        //             name: "성동일",
        //             age: 59,
        //             gender: "남성",
        //             job: "야구 감독"
        //         }
        //     ]
        // });
    })
    .catch((error)=>{
        console.error(error);
        res.send('데이터를 가져오지 못했습니다.');
    })
})
// 포스트맨으로 post요청과 get요청 확인하기
// post요청 시 바디에 적어줌
// app.post("/lists", async (req, res) => {
//     const body = req.body;
//     res.send({
//         "body":body
//     })
// });
// app.get("/lists/:id",(req,res)=>{
//     const params = req.params;
//     const {id} = params;
//     res.send(`id는 ${id}입니다.`)
// })
app.post("/lists", async (req, res) => {
    const body = req.body;
    const { name, age, gender, job } = body;

    models.Lists.create({
        name:name,
        age,
        gender,
        job
    }).then((result)=>{
        res.send({
            result
        })
    }).catch((err)=>{
        console.log(err);
        res.send('고객 등록 실패');
    })
});
app.get("/lists/:id",(req,res)=>{
    const params = req.params;
    
    models.Lists.findOne({
        where: {
            id:params.id
        }
    }).then((result)=>{
        res.send({
            list:result
        })
    }).catch((err)=>{
        console.log(err);
        res.send('고객 조회에 문제가 생겼습니다.');
    })
})

// 삭제하기
app.delete('/lists/:id',async(req, res) => {
    const params = req.params;
    console.log('삭제하기');
    models.Lists.destroy({ where: { id: params.id }})
    .then( res.send(
        "상품이 삭제되었습니다."
    ))
    .catch((error)=>{
        console.error(error);
        res.send('상품삭제에 문제가 생겼습니다.');
    })
})

//설정한 app을 실행시키기
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

