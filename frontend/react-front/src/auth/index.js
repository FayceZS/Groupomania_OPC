


export const signup = user => {

    console.log(process.env.REACT_APP_API_URL) ;    
         
    return    fetch(`${process.env.REACT_APP_API_URL}/auth/signup`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        
        return response.json()
    })
    .catch(err => {console.log(err)});

   // return   this.signup;
};

export const signin = user => {

         
    return    fetch(`${process.env.REACT_APP_API_URL}/auth/signin`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        console.log(res.body);
        return res.json()
        
    })
    .catch(res => {
        if(res.status===401){
            console.log("Utilisateur plomb")
        }
    })

  
};


export const authenticate = (jwt,next) => {
    if(typeof window !== undefined){
        localStorage.setItem('jwt',JSON.stringify(jwt))
        next();
    }
}

export const signOut = (next) => {
    if(typeof window !== undefined) localStorage.removeItem('jwt')
    next()
    window.location.reload();
}

export const isAuthenticated = () => {
    if(typeof window === "undefined"){
        return false
    }

    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }

    else{return false};
}
