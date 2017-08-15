const test = {

  getHomeData( ctx, next ) {
    ctx.state = {
      content: 'Home data'
    };

    next();
  },

  getAboutData( ctx, next ) {
    ctx.state.content = 'About data';

    next();
  }

};

module.exports = test;