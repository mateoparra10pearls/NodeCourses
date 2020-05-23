module.exports = {
   type: process.env.DATABASE_TYPE,
   host: process.env.DATABASE_HOST,
   username: process.env.DATABASE_USERNAME,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_DBNAME,
   synchronize: false,
   logging: false,
   options: {
      enableArithAbort: true
    },
   entities: [
      "src/entity/**/*.ts"
   ],
   migrations: [
      "src/migration/**/*.ts"
   ],
   subscribers: [
      "src/subscriber/**/*.ts"
   ]
}