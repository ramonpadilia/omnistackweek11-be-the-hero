//imports connection to the database
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        //Get sent ID from form
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return response.status(400).json({ error: "No ONGs found with this ID"});
        }

        return response.json({ong})
    }
};