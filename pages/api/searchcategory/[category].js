import axios from 'axios'
import Cors from 'cors'


const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})


function runMiddleware(req,res,fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {

      return resolve(result)
    })
  })
}


export default async function handler(req, res) {

await runMiddleware(req,res,cors)

res.header('Access-Control-Allow-Origin', '*')

let {category, pagenr} = req.query

let dishes = await axios.get(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then(item=> item.data).then(item=> item.meals)

let mealCount = dishes.length
let pageCount = Math.ceil(dishes.length/10)


if (!pagenr){

pagenr=1

}else if (pagenr <1){

pagenr=1

}else if (pagenr >pageCount){

pagenr=pageCount
}  

res.status(200).json({ "pagenumber":pagenr,"mealcount":mealCount ,"pagecount":pageCount, "dishes": dishes.slice(Math.floor(pagenr-1)*10,pagenr*10) })
}
