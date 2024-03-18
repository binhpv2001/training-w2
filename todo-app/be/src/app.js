const Koa = require( 'koa' );
const app = new Koa();
// const generateFakeData = require( './dataFaker' );
const koaBody = require( 'koa-body' );
const router = require( './routes/routes' );
const cors = require( '@koa/cors' );

var options = {
  origin: '*',
  credentials: true
};

app.use( cors( options ) );

// generateFakeData( 10, './src/database/todo.json' )
app.use( koaBody() );
app.use( router.routes() );
app.use( router.allowedMethods() );

app.listen( 5000 );
