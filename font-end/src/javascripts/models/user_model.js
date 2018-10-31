
// 提供列表数据
const list = (page) => {
    return $.ajax({
        url: '/api/v1/user/list',
        data: page,
        success:(results) => {
          
           return results
          
        }
    })
}

const save = (data) => {
    return new Promise((resolve) => {
        $('.user-save #save-form').ajaxSubmit({
            url: '/api/v1/user/save',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}
// 提供删除数据
const remove = (data) => {
    return $.ajax({
        url: '/api/v1/user/remove',
        data,
        success:(results) => {
            
           return results
        }
    })
}
// 提供某条数据
const listone = (data) => {
    return $.ajax({
        url: '/api/v1/user/listone',
        data,
        success:(results) => {
          
           return results
        }
    })
}


// 更新某条数据
const update = () => {
   /* return $.ajax({
        url: '/api/v1/position/update',
        type: 'post',
        data,
        success:(results) => {
           return results
        }
    })*/
    return new Promise((resolve) => {
        $('.user-update #update-form').ajaxSubmit({
            url: '/api/v1/user/update',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}

export default {
    list,
   save,
   remove,
   listone,
   update
}
