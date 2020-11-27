

export const createComment = (userId,token,commentaire) => {
    
    

   return  fetch(`${process.env.REACT_APP_API_URL}/comments/createComment`,{
        method : 'POST',
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`,
            

        },
        body : JSON.stringify(commentaire)
    })
        .then(response =>{
        
        return response.json();})
        .catch(err => console.log(err));       
        

}


export const getCommentsOfPost = (token,idPost)=>{
    return  fetch(`${process.env.REACT_APP_API_URL}/comments/getAllcomments/${idPost}`,{
        method : 'GET',
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        
    })
        .then(response =>{
        
        return response.json();})
        .catch(error => console.log(error));       
 }

 export const singleComment = (token,commentId)=>{
    return  fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`,{
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

 export const removeComment = (commentId,token) => {
    return  fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`,{
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

 

export const updatePost = (userId,token,comment) => {
    
    comment.set('userId',userId);

   return  fetch(`${process.env.REACT_APP_API_URL}/comments/${comment.id}`,{
        method : 'PUT',
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`,
            

        },
        body : comment
    })
        .then(response =>{
        
        return response.json();})
        .catch(err => console.log(err));       
        

}