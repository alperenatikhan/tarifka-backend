import axios from 'axios'


export default async function handler(req, res) {

let {id}= req.query

let resp = await axios.get('http://www.themealdb.com/api/json/v1/1/lookup.php?i='+ id).then(item=> item.data).then(item=> item.meals)

 

if (resp){
const entries = Object.entries(resp[0]) // 1️⃣
const nonEmptyOrNull = entries.filter(([key,val]) => val !== '' && val !== null) 
const output = Object.fromEntries(nonEmptyOrNull)

let unFilteredIngredientEntries = Object.entries(output)
let filteredIngredientEntries= unFilteredIngredientEntries.filter(([key,val]) => key.includes('strIngredient') || key.includes('strMeasure'))
let filteredIngredientObject = Object.fromEntries(filteredIngredientEntries)

res.status(200).json({ "id":id, 'result':output, filteredIngredientObject })
}else{

res.status(404).json({ msg:'not found in database' })
}

}
