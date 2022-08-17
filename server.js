const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SEC,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');
const seedAll = require('./seeds/index')

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.get("/dynamic", (req, res) => {
//   imageList = [];
//   imageList.push({ src: "css/grilled-peach.png", name: "grilled-peach" });
//   imageList.push({ src: "css/easy-salad.png", name: "easy-salad" });
//   imageList.push({ src: "css/tomato-salad", name: "tomato-salad" });
//   res.render("dynamic", { imageList: imageList });
// })


app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  //seedAll();
  app.listen(PORT, () => console.log("Now listening"));
});