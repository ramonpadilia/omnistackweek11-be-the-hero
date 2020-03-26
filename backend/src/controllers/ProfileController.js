//This controller is responsible for each specific ONG's own incidents 

//import connection to database
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
            
        return response.json({ incidents });
    }
};