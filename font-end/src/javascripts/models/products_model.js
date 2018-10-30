
const list = () => {
   return $.ajax({
       url: '/api/v1/products/list',
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

export default {
    list,
    save
}
