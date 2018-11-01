
const mongoose = require('../util/mongoose')
const Moment = require('moment')

var Products = mongoose.model('products', new mongoose.Schema({
    name: String,
    subtitle: String,
    discount: String,
    originalPrice : String,
    productionPlace: String,
    createTime: String,
    formatTime: String
}));
//查询数据总数计算页码等
const listAll = (_query = {}) => {
   
    return Products.find(_query)
            .sort({createTime:-1})
            .then((results) => {
                return results
            })
            .catch((err) => {
                return false
            })
    
}
const list = async ({ pageNo = 1, pageSize = 10, search = '' }) => {   //把req.body 解构  给默认值 
    let reg = new RegExp(search, 'g')
    let _query = {             // 查询的约定条件
        $or: [
            { name: reg },   
            { subtitle: reg },   
            { productionPlace: reg }
        ]
    }

    let listall = await listAll(_query)   //是异步 

    // limit skip
     return Products.find(_query).
            sort({createTime:-1}).
            skip((pageNo - 1) * pageSize).// 从零开始
            limit(~~pageSize).// 截取多少
            then((results) => {
                return {
                    items: results, 
                    pageInfo: { // 页码信息
                        pageNo,
                        pageSize,
                        total: listall.length, // 总数
                        totalPage: Math.ceil(listall.length / pageSize), // 总页数
                        search // 搜索关键字
                    }
                }
                
            }).
            catch((err) => {
                return false
            })
}


const save = (body) => {
    
    let _timestamp = Date.now()
    let moment = Moment(_timestamp)

    return new Products({ 
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

const remove = ({id}) => {
    return Products.deleteOne({ _id: id }).then((results) => {
        results.deleteId = id
        return results
    }).catch((err) => {
        // fs.appendFileSync('./logs/logs.txt', Moment().format("YYYY-MM-DD, hh:mm") + '' +JSON.stringify(err))
        return false
    })
}
const listOne = ({id}) => {
    return Products.find({"_id":id}).
    then((results) => {
        return results
    }).
    catch((err) => {
        return false
    })
}
const update = (body) => {

    if ( body.republish ) {
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.formatTime = moment.format("YYYY-MM-DD, hh:mm")
    }
    return Products.updateOne({ _id: body.id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}
module.exports = {
    list,
    save,
    remove,
    update,
    listOne
}