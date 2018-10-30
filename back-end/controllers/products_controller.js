
// const product = require('../views/product')
const products_models = require('../models/products_models')

const list = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await products_models.list()
    res.render('products', { 
        status: 200, 
        data: JSON.stringify(_data)
    })

}

module.exports =　{
    list
}