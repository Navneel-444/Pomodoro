const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
        const data = await knex('sessions');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving session: ${err}`)
    }
}

module.exports = {
    index
}