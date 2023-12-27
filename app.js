const configureMiddleware = require('./app/middleware/configureMiddleWare');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const winston = require('winston');
const app = express();
const port = process.env.PORT || 3000;

configureMiddleware(app);

// Secure your app with Helmet
app.use(helmet());

// Configure Winston with a console transport
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        // Add other transports as needed (e.g., file, third-party service)
    ],
});

logger.info('Application starting...');

app.get('/', (req, res) => {
    res.send('Welcome to MMJ Server!');
  });
  
const appRoutes = require('./app/src/index');
app.use('/api', appRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('Received SIGTERM. Shutting down gracefully...');
    // Perform cleanup here
    process.exit(0);
});

app.listen(port, () => logger.info(`Listening on port ${port}`));


// Helmet sets various security-related HTTP headers to improve the security posture of your application. Some of the headers it sets include:
// Strict-Transport-Security: Ensures that the browser always connects to your site over HTTPS.
// Content-Security-Policy: Helps prevent various types of attacks such as Cross-Site Scripting (XSS).
// X-Frame-Options: Prevents your content from being embedded into frames on other sites.
// X-Content-Type-Options: Prevents browsers from MIME-sniffing a response away from the declared content type.
// Referrer-Policy: Controls how much information is included in the Referer header.