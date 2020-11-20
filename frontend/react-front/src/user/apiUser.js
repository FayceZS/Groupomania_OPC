export const read = (userId,token) => {
    return  fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
         method : 'GET',
         headers : {
             Accept : "application/json",
             "Content-type" : "application/json",
             Authorization : `Bearer ${token}`
         }
     })
         .then(response =>{
         
         return response.json();})
         .catch(err => console.log(err));       
         

 }


 export const update = (userId,token,user) => {
     console.log(`Modifications : ${user}`);
    return  fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
         method : 'PUT',
         headers : {
             Accept : "application/json",
             Authorization : `Bearer ${token}`
         },
         body : user
     })
         .then(response =>{
         
         return response.json();})
         .catch(err => console.log(err));       
         

 }

 export const remove = (userId,token) => {
    return  fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
         method : 'DELETE',
         headers : {
             Accept : "application/json",
             "Content-type" : "application/json",
             Authorization : `Bearer ${token}`
         }
     })
         .then(response =>{
         
         return response.json();})
         .catch(err => console.log(err));       
         

 }

 export const list = (token)=>{
    return  fetch(`${process.env.REACT_APP_API_URL}/user/getAllUsers`,{
        method : 'GET',
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
        .then(response =>{
        
        return response.json();})
        .catch(error => console.log(error));       
 }