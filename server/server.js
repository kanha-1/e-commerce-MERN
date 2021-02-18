const app = require('./app')
const PORT = process.env.PORT || 8008
require('./db')
require('dotenv').config()


app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`)
})
