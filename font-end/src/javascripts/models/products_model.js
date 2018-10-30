
const list = () => {
   return $.ajax({
       url: '/api/v1/products/list',
       success: (data) => {
            console.log(data)
           return data
          
       }
   })
}
export default {
    list
}
