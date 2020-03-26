
exports.up = function(knex) {
    /* '.UP' = what this function is going to do if
        everything works as intendend */ 
    return knex.schema.createTable('incidents', function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //Field which will receive a foreign key to another table
        table.string('ong_id').notNullable();

        /* Setting a field on this table to serve as a container for a
        Foreing Key to ONGs table referencing this case owner */
        table.foreign('ong_id').references('id').inTable('ongs');
      });
};

exports.down = function(knex) {
    // '.DOWN' = what is going to happen if something goes wrong
    return knex.schema.dropTable('incidents');  
};
