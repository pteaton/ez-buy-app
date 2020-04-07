require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT









app.listen(PORT, () => {
  const date = new Date()
  console.log(`Time is ${date.toLocaleString()} and server is running on ${PORT}`);
})
