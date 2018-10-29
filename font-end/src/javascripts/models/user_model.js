
// 提供列表数据
const list = (page) => {
    return $.ajax({
        url: '/api/v1/user/listall',
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

export default {
    list,
   save
}
