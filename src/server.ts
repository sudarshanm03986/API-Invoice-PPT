
import express from './config/express'
// Remove the MySQL connection import if you don't want to use it
// import { connect } from './config/db';
import Logger from './config/logger'

const app = express();
const port = process.env.PORT || 4941;

// Remove the MySQL connection logic
// Since you're not connecting to a database, you don't need that try-catch block

async function main() {
    try {
        // If you're not using MySQL, simply skip this block
        // await connect(); // Remove this line
        app.listen(port, () => {
            Logger.info('Listening on port: http://localhost:' + port)
        });
    } catch (err) {
        Logger.error('Unable to start the server.')
        process.exit(1);
    }
}

main().catch(err => Logger.error(err));