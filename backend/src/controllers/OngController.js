//required to encrypt data into random string
const crypto = require('crypto');

//imports connection object from connection.js
const connection = require('../database/connection');

module.exports = {
    //This method shows every ONG registered in the database
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    //This method inserts a new ONG and returns a random ID string
    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
    
        //generates a random string
        const id = crypto.randomBytes(4).toString('HEX');

        //AWAIT -> wait for the insertion to complete to move on
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        
        //returns only the random id string
        return response.json({ id });
    }
};