const router = require( 'koa-router' )();

const controller = require( './src/controllers/index' );

const getRouter = () => {
  // restful API
  router.post( '/api/result', controller.getResult );
  router.post( '/api/save', controller.submitMessage );
  router.post( '/api/submit', controller.submitMessage );

  return router;
};

module.exports = getRouter();