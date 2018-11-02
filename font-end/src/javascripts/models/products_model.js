
const list = (data) => {
   return $.ajax({
       url: '/api/v1/products/list',
       data,
       success: (data) => {
            
           return data
          
       }
   })
}

// // 提供保存数据
// const save = (data) => {
//     return new Promise((resolve) => {
//         $('.position-save #save-form').ajaxSubmit({
//             url: '/api/v1/position/save',
//             type: 'POST',
//             success: (results) => {
//                 resolve(results)
//             }
//         })
//     })
// }
const save = (data) => {        
        return new Promise((resolve) => {
            
            $(".products_save #save-form").ajaxSubmit({
                url: '/api/v1/products/save',
                type: 'POST',
                success: (data) => {
            
                    return data   
                }
            })
        })     
}

const remove = (data) => {
    return $.ajax({
        url: '/api/v1/products/remove',
        type: "delete",
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
