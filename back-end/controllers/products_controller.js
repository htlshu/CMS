
// const product = require('../views/product')
const products_models = require('../models/products_models')

const list = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')

    let _data = await products_models.list(req.query)   //get  req.query
   
    res.render('products', { 
        status: 200, 
        data: JSON.stringify(_data)
    })

}
const save = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')  //用post   数据在req.body

    let _data = await products_models.save(req.body)
 
    res.render('products', { 
        status: 200, 
        data: JSON.stringify(_data)
    })

}
const remove =async (req,res,next) => {
    res.set('content-type', 'application/json; charset=utf8')
   
    let _data = await products_models.remove(req.body)
    
    res.render('products',{
        status: 200, 
        data: JSON.stringify(_data)
    })
}
const update = async (req,res,next) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await products_models.update(req.body)
    res.render('products',{
        status: 200, 
        data: JSON.stringify(_data)
    })
}
const listOne = async (req,res,next) => {
    res.set('content-type', 'application/json; charset=utf8')
    
    let _data = await products_models.listOne(req.query)
    
    res.render('products',{
        status: 200, 
        data: JSON.stringify(_data)
    }) 
}

module.exports =　{
    list,
    save,
    remove,
    update,
    listOne
}