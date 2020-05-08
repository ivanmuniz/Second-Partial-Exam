const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const { Sports } = require( './models/sport-model' );

const app = express();


/* Your code goes here */

app.delete("/sports/delete", jsonParser, (req, res) => {
    let id = req.body.id;
    let queryId = req.query.sportId;
    if(!id || !queryId) {
        if(!id) {
            res.statusMessage = "The 'id' is missing in the body of the request";
        } else if(!queryId) {
            res.statusMessage = "The 'id' is missing in the query string of the request";
        }
        return res.status(406).end();
    }

    if(id != queryId) {
        res.statusMessage = "The 'id' in the body of the request doesn't match with the 'bodyId' in the query string";
        return res.status(409).end();
    }

    // If the id doesn’t belong to a sport send back a 404 status with an appropriate message.
    Sports.deleteSport(id)
        .then( result => {
            console.log(result);
        })
        .catch( err => {
            console.log(err);
            res.statusMessage = "Please try again";
            return res.status(500).end()
        })

    return res.status(204).end();
});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});