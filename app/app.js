const { setFunction, getFunction, client } = require('./client/client')
const promptQuestions = require('./client/inquirerClient')
const getServer = require('./server/server')
const { connection } = require('./db/db')
const logger = require('debug-logger')('default-answer-client')

const server = getServer();

(async function () {
  while (true) {
    const result = await promptQuestions(getFunction, setFunction, client)

    console.log('\n')
    console.log(result)
    console.log('\n')
  }
}())

// close server and database connection after receiving SIGINT
process.once('SIGINT', function () {
  logger.info('SIGINT received...')

  if (connection.state !== 'disconnected') {
    connection.end(() => {
      logger.info('connection closed...')
    })
  }

  server.tryShutdown(() => {
    logger.info('server closed...')
  })
})
