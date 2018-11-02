
const mongoose  = require('../util/mongoose')

const AdminModel = mongoose.model('admins')

const getUserInfoById = (id) => {
    return AdminModel
    .findById(id)
    .then(results => {
        return results
    })
    .catch(err => {
        return false
    })
}


const auths = () => {
    return {
        'map': 6,
        'list': 1,
        'list-remove': 5
    }
}


module.exports = {
    getUserInfoById,
    auths
}