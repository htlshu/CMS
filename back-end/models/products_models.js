
const mongoose = require('../util/mongoose')
const Moment = require('moment')

var Products = mongoose.model('products', new mongoose.Schema({
    productsName: String,
    details: String,
    discountse: String,
    originalPrice : String,
    currentPrice : String,
    createTime: String,
    formatTime: String
}));


// const list = () => {
//     // limit skip
//      return Products.find({}).
//             then((results) => {
//                 return results
//             }).
//             catch((err) => {
//                 return false
//             })
// }
const list = () => {
    return [
        {
            "productsName" : "葡萄",
            "originalPrice" : 100
        }
    ]
}

const save = (body) => {
    
    let _timestamp = Date.now()
    let moment = Moment(_timestamp)

    return new Position({ 
        ...body,
        createTime: _timestamp,
        formatTime: moment.format("YYYY-MM-DD, hh:mm")
    }).save()
      .then((result) => {
        return result
      })
      .catch((err) => {
          return false
      })

}

module.exports = {
    list,
    save
}