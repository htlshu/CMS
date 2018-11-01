
const list = (data) => {
   return $.ajax({
       url: '/api/v1/products/list',
       data,
       success: (data) => {
            
           return data
          
       }
   })
}
const save = (data) => {
   return $.ajax({
       url: '/api/v1/products/save',
       type:"post",
       data,
       success: (data) => {
           return data   
       }
   })
}

const remove = (data) => {
    return $.ajax({
        url: '/api/v1/products/remove',
        type: 'post',
        data,
        success: (data) => {
            return data
        }
    })
}
const update = (data) => {
    return $.ajax({
        url: '/api/v1/products/update',
        type: 'post',
        data,
        success: (data) => {
            return data
        }
    })
}
const listOne = (data) => {
    return $.ajax({
        url:'/api/v1/products/listOne',
        type:'post',
        data,
        success: (data) => {
            
            return data
        }

    })
}
export default {
    list,
    save,
    remove,
    update,
    listOne
}
