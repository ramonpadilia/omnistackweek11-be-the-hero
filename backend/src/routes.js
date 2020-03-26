//micro web framework to handle routes, configs, requests, etc...
const express = require('express');

//imports all the methods from Controllers
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//imports Router method from package express and assing to routes variable
const routes = express.Router();

routes.post('/session', SessionController.create);

//Routes for ONGS in the database
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);

//Routes for INCIDENTS in the database
routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incidents/:id', IncidentsController.delete);

//Gets a list of all incidents related to this ONG's profile
routes.get('/profile', ProfileController.index);

/* exports variables from this module allowing
 them to be used in another files/modules */
module.exports = routes;




/* Param Types:
        Query Parameters = Named Parameters sent to a specific route after '?'
            (Used for filters, pagination, etc...);
        Route Parameters = Parameters used to identify resources (same as routes)
        Request Body = Used to create / modify resources
 */

/* //Query Parameters Example:
routes.get('/users', (request, response) => {
    const queryParam = request.query;

    console.log(queryParam);

    return response.json({
        city: "Limeira",
        state: "São Paulo",
        country: "Brazil"
    });
});

//Route Parameters Example:
routes.get('/users/:id', (request, response) => {
    const routeParam = request.params;

    console.log(routeParam);

    return response.json({
        city: "Limeira",
        state: "São Paulo",
        country: "Brazil"
    });
});

// Request Body Example: (POST user data from body)
routes.post('/users', (request, response) => {
    const bodyParam = request.body;

    console.log(bodyParam);

    return response.json({
        city: "Limeira",
        state: "São Paulo",
        country: "Brazil"
    });
}); */

