const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const data = require('./data');
const robot = data.users;

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
  res.render('index', {robots: robot});
});


app.get('/robots/:id', (req, res) => {
  let robotId = req.params.id;
  let targetRobot;
  
  robot.forEach((item) => {
    if (item.id == robotId) {
      targetRobot = item;
    }
  });

  if (targetRobot === undefined) {
    res.render('notFound');
  } else {
    res.render('detail', {model: targetRobot});
  }
});


app.listen(3030, () => {
  console.log('🤖 App is running on port 3030.');
});
