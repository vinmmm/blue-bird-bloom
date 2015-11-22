var express = require('express'),
     morgan = require('morgan'),
     compress = require('compression'),
     bodyParser = require('body-parser'),
     methodOverride = require('method-override');
   module.exports = function() {
     var app = express();
     if (process.env.NODE_ENV === 'development') {
       app.use(morgan('dev'));
     } else if (process.env.NODE_ENV === 'production') {
       app.use(compress());
}
     app.use(bodyParser.urlencoded({
       extended: true
     }));
     app.use(bodyParser.json());
     app.use(methodOverride());
     app.set('views', './app/views');
     app.set('view engine', 'ejs');
     require('../app/routes/index.server.routes.js')(app);
     /*Below, notice how the express.static() middleware is placed below the call for the routing ile. 
     This order matters because if it were above it, 
     Express would irst try to look for HTTP request paths in the static iles folder.
      This would make the response a lot slower as it would have to wait for a ilesystem I/O operation.
     */
     app.use(express.static('./public'));
     return app;
   };