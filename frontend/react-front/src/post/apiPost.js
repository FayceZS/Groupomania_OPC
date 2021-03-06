export const create = (userId,token,publication) => {
    
    publication.set('userId',userId);

   return  fetch(`${process.env.REACT_APP_API_URL}/posts/createpost`,{
        method : 'POST',
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`,
            

        },
        body : publication
    })
        .then(response =>{
        
        return response.json();})
        .catch(err => console.log(err));       
        

}


export const list = (token)=>{
    return  fetch(`${process.env.REACT_APP_API_URL}/posts/getAllPosts`,{
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

 export const singlePost = (token,postId)=>{
    return  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`,{
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

 export const remove = (postId,token) => {
    return  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`,{
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

 

export const updatePost = (userId,token,publication) => {
    
    publication.set('userId',userId);

   return  fetch(`${process.env.REACT_APP_API_URL}/posts/${publication.id}`,{
        method : 'PUT',
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`,
            

        },
        body : publication
    })
        .then(response =>{
        
        return response.json();})
        .catch(err => console.log(err));       
        

}