const { Schema, model } = require('mongoose');

const PokemonSchema = Schema({

    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

PokemonSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Pokemon', PokemonSchema );

