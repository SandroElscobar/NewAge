require('../../../db/models/index')

module.exports = {
    users: async (_, args, {models}) => {
        return models.User.find({})
    }
}