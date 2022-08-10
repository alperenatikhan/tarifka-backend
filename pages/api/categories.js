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

export default async function handler(req,res) {

  await runMiddleware(req, res, cors)

let categories = await axios.get('http://www.themealdb.com/api/json/v1/1/list.php?c=list').then(item=> item.data).then(item=> item.meals)


  res.status(200).json({ "categories": categories})
}
