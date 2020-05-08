const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */
const sportSchema = new mongoose.Schema({
    sport : {
        id : {
            required : true
        },
        name : {
            type : String,
            required : true
        },
        num_players : {
            type : Number,
            required : true
        }
    }
});

const sportsModel = mongoose.Model("Sports", sportSchema);

const Sports = {
    deleteSport : function(id) {
        return sportsModel
            .remove({id})
            .then( result => {
                return result;
            })
            .catch( err => {
                return err;
            });
    }
}

module.exports = { Sports };