const Router = require( 'koa-router' );

const testController = require( './controllers/test' );

const getRouter = () => {
  const router = new Router();

  // restful API
  router.get( '/', testController.getHomeData );
  router.get( '/about', testController.getAboutData );

  return router;
};

module.exports = getRouter();