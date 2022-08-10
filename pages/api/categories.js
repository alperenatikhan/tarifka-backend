import axios from 'axios'



export default async function handler(req, res) {

let categories = await axios.get('http://www.themealdb.com/api/json/v1/1/list.php?c=list').then(item=> item.data).then(item=> item.meals)


  res.status(200).json({ "categories": categories})
}
