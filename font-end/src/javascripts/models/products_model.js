
const list = () => {
   return $.ajax({
       url: '/api/products/list',
       success: (data) => {
           return data
       }
   })
}
export default {
    list
}
