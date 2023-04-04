
module.exports = {
  BASE_URL: process.env.BASE_URL || '',
  PORT: process.env.PORT || '3000',
  NLP_PORT: process.env.NLP_PORT || '3001',
  SERVER_KEY: process.env.SERVER_KEY || '',
  PHOTOS_DIR: `${__dirname}/example_data/dummy-photos`,
}