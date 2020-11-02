import express from 'express'
import path from 'path'

const app = express()

const BASE_DIR = path.join(__dirname, 'home', 'node', 'app')
const BUILD_DIR = path.join(BASE_DIR, 'build')

// Serve the static files from the React app
app.use(express.static(BUILD_DIR))

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(BUILD_DIR, 'index.html'))
})

const port = process.env.PORT || 9010
const server = app.listen(port, function () {
    console.log('App running on port ' + port)
})

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
    console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
    shutdown()
})

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
    console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString())
    shutdown()
})

// shut down server
function shutdown() {
    console.info('Stopping Server')
    server.close()
    process.exit()
}
