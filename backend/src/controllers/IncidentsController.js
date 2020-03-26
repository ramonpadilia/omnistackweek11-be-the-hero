const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        /* Pagination [page starts at 1 if no page on query params]
            Limits the database search to 5 incidents per turn
            offset = starts at page 0 - each page has 5 incidents        
        */
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        /* Creates a 'X-Total-Count' in the page's header; Will be used by
            the frontend to limit the page number the user can enter */
        response.header('X-Total-Count', count['count(*)']);

        return response.json({ incidents });
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        /*  When a user logs into the webpage, their logging ID and other info
            are stored in 'headers'. the authorization part, can be different */
        const ong_id = request.headers.authorization;
        
        /* This connection returns an array with a sigle value;
           '[id]' represents a variable named ID receiving an auto_incremented ID
            returned from the database.
        */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        //Gets 'owner'(ong_id) of the incident
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //Checks if this incident's owner is the same trying to delete de incident    
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Not allowed'});
        }

        //Delete the incident 
        await connection('incidents').where('id', id).delete();

        //Change status code, returning a 'No Content' Status
        return response.status(204).send();
    }
};