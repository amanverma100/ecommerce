
const backendDomain="http://127.0.0.1:5000"
const summaryAPI={
     signup:{
         url:`${backendDomain}/api/signup`,
         method:"post"
     },
     login:
     {
        url:`${backendDomain}/api/login`,
        method:"get"
     },
     verified:
     {
        url:`${backendDomain}/api/verified`
     },
     users:
     {
      url:`${backendDomain}/api/users`
     },
     updateuser:
     {
        url:`${backendDomain}/api/updateuser`
     },
     uploadproduct:
     {
      url:`${backendDomain}/api/uploadproduct`
     },
     getproduct:
     {
      url:`${backendDomain}/api/getproduct`
     },
     updateproduct:
     {
      url:`${backendDomain}/api/updateproduct`
     },
     categoryproduct:
     {
     url:`${backendDomain}/api/categoryproduct`
     }
}
export default summaryAPI;