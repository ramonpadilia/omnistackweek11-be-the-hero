
exports.up = function(knex) {
    /* '.UP' = what this function is going to do if
        everything works as intendend */ 
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
      });
};

exports.down = function(knex) {
    // '.DOWN' = what is going to happen if something goes wrong
    return knex.schema.dropTable('ongs');  
};
