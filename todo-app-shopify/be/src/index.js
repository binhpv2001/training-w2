const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const router = require('./routes/routes');
const cors = require('@koa/cors');
// import generateFakeData from './dataFaker';

// generateFakeData( 1000, './src/database/products.json' )

const PORT = 8080 || 8088

const options = {
  origin: '*',
  credentials: true
};

app.use(cors(options));
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);

console.log(`app is running on port: ${PORT}`);