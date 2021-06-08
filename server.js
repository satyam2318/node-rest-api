require('dotenv-safe').config();
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const app = express()
const i18n = require('i18n');
const helmet = require('helmet');
const path = require('path');
const initMongo = require('./config/mongo');

// Setup express server port 
app.set('port', process.env.PORT || 5000);

//Enable HTTP logger only for dev environment
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

//Parsing JSON
app.use(bodyParser.json({
    limit: '20mb'
})
)

// for parsing application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
      limit: '20mb',
      extended: true
    })
  )
// Configure locale
i18n.configure({
    locales: ['en', 'es'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'en',
    objectNotation: true
})

app.use(i18n.init);

// Init all others
app.use(cors());
app.use(passport.initialize());
app.use(compression());
app.use(helmet());
app.use(express.static('public'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'html');
app.use(require('./app/routes'));
app.listen(app.get('port'));

initMongo();

app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})

module.exports =  app;
