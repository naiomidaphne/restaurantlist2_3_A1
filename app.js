// require packages used in the project
const express = require('express') 
const app = express()
const port = 3000
// require express-handlebars
const exphbs = require('express-handlebars') 
// JSON 
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (request, response) => {
  response.render('index', {restaurantList:restaurantList.results})
})
//route for show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant =>  restaurant.id === + req.params.id ) 
  res.render('show', {restaurant})
})
//route for search keywords
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const searchList = restaurantList.results.filter(restaurant => { 
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) || (restaurant.category.includes(keyword))
  }) 
  res.render('index', { restaurantList: searchList, keyword })
})


// start and listen on the Express server
app.listen(port, () => { 
  console.log(`This is running on http://localhost:${port}`)
})




