import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const history = useHistory();
    
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [password,setPassword] = useState("")
    const [cpassword,setCpassword] = useState("")
    const [email,setEmail] = useState("")

    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return 
        }
        fetch('/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstname,
                lastname,
                password,
                cpassword,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
               console.log(data.error);
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    

  const routeChange = () =>{ 
    let path = `newPath`; 
    history.push("/signin");
  }
    return(
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Create New Customer Account</h2>
            <input
            type="text"
            placeholder="First name"
            value={firstname}
            onChange={(e)=>setFirstname(e.target.value)}
            />
            <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e)=>setLastname(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
             <input
            type="password"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e)=>setCpassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                Submit
            </button>
            <button className="btn waves-effect waves-light #64b5f6 black darken-1"
            onClick={()=>routeChange()}
            >
                Cancel
            </button>
            
        </div>
        
               
    </div>  
    
    )
}

export default Signup
