const fs = require('fs');

if (fs.existsSync('./public')) {
  process.env.NODE_ENV = 'production';
  process.env.databaseUri = 'mongodb://patel:patel@ds153752.mlab.com:53752/db_uplantPublic';
  process.env.databaseName = 'production database: db_uplantPublic';
} else {
  process.env.NODE_ENV = 'development';
  process.env.databaseUri = 'mongodb://localhost:27017/db_uplant';
  process.env.databaseName = 'development database: db_uplant'; 
}
