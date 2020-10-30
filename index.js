const Koa = require( 'koa' );
const bodyParser = require('koa-bodyparser');


const router = require( './router' );

const app = new Koa();

app.use(bodyParser());

app.use( router.routes() );

app.use(router.allowedMethods());

app.listen( 8888, () => {
  console.log('listen port: 8888')
} );