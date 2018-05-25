import getApp from '..';

console.log(`!!!!!!!!!!!!!!!!!!!!!!!!! ><><><><>< HEROKU_PORT is: ${process.env.PORT}`);
getApp().listen(process.env.PORT || 4000);
