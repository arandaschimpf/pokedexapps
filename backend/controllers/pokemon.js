const { response } = require('express');
const Pokemon = require('../models/Pokemon');

const getPokemon = async( req, res = response ) => {

    const pokemon = await Pokemon.find().populate('user','name');

    res.json({
        ok: true,
        pokemon
    });
}

const crearPokemon = async ( req, res = response ) => {

    const pokemon = new Pokemon( req.body );

    try {

        pokemon.user = req.uid;
        
        const pokemonGuardado = await pokemon.save();

        res.json({
            ok: true,
            pokemon: pokemonGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarPokemon = async( req, res = response ) => {
    
    const pokemonId = req.params.id;
    const uid = req.uid;

    try {

        const pokemon = await Pokemon.findById( pokemonId );

        if ( !pokemon ) {
            return res.status(404).json({
                ok: false,
                msg: 'Pokemon no existe por ese id'
            });
        }

        if ( pokemon.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este pokemon'
            });
        }

        const nuevoPokemon = {
            ...req.body,
            user: uid
        }

        const pokemonActualizado = await Pokemon.findByIdAndUpdate( pokemonId, nuevoPokemon, { new: true } );

        res.json({
            ok: true,
            pokemon: pokemonActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarPokemon = async( req, res = response ) => {

    const pokemonId = req.params.id;
    const uid = req.uid;

    try {

        const pokemon = await Pokemon.findById( pokemonId );

        if ( !pokemon ) {
            return res.status(404).json({
                ok: false,
                msg: 'Pokemon no existe por ese id'
            });
        }

        if ( pokemon.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este pokemon'
            });
        }


        await Pokemon.findByIdAndDelete( pokemonId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getPokemon,
    crearPokemon,
    actualizarPokemon,
    eliminarPokemon
}