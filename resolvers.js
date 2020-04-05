// const psql = require('./Database') .psql;

const resolvers = {
  Query: {
      async fact (root, { id }, { models }) {
            return models.factintervention.findById(id)
      },
      async facts (root, args, { models }) {
            return models.factintervention.findAll()
      },
      async employee (root, { id }, { models }) {
            return models.employees.findById(id)
      }
    },
}

module.exports = resolvers
