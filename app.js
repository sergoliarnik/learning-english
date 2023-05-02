const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res) => {
  res.render('user/index.ejs');
});

app.listen(3000);
