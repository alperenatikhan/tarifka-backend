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



let {id}= req.query

let resp = await axios.get('http://www.themealdb.com/api/json/v1/1/lookup.php?i='+ id).then(item=> item.data).then(item=> item.meals)

 

if (resp){
const entries = Object.entries(resp[0]) // 1️⃣
const nonEmptyOrNull = entries.filter(([key,val]) => val !== '' && val !== null) 
const output = Object.fromEntries(nonEmptyOrNull)

let unFilteredIngredientEntries = Object.entries(output)
let filteredIngredientsArray= unFilteredIngredientEntries.filter(([key,val]) => key.includes('strIngredient'))
let filteredMeasuresArray = unFilteredIngredientEntries.filter(([key,val]) =>key.includes('strMeasure'))


//let filteredIngredientObject = Object.fromEntries(filteredIngredientEntries)

let resultString=[]
for (let num=0;num < Math.floor(filteredIngredientsArray.length); num++ ){
let ingredientMeasure = `${filteredMeasuresArray[num][1]} ${filteredIngredientsArray[num][1]}`
resultString.push(ingredientMeasure)
}

res.status(200).json({ "id":id, 'result':output, "ingredientString":resultString })
}else{

res.status(404).json({ msg:'not found in database' })
}

}
