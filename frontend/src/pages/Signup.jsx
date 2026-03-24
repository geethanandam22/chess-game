import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../slices/authSlice";
export const Signup =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function handleSubmit(e){
        e.preventDefault();
        const  formData= new FormData(e.target);
        const name = formData.get ("name");
        const email = formData.get("email");
        const password = formData.get ("password");
        //console.log(name,email,password);
        try{
            await dispatch(signup({name,email,password})).unwrap();
            //notifcation using  notistack
            navigate("/login");

        }
        catch(err){
            console.log(err);
        }

    }
    return (
       <div className="flex items-center justify-center h-screen">
           <div className="p-10 border border-black rounded">
                <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                    <label>
                      Name
                        <input className="ml-12 border rounded p-1"
                           type="text"
                           name="name"
                           placeholder="Enter name"
                        />
                   </label>
                    <label>
                      Email
                        <input className="ml-12 border rounded p-1"
                           type="text"
                           name="email"
                           placeholder="Enter email"
                        />
                   </label>
                   <label>
                   Password
                       <input  
                           type="password"
                           name="password"
                           placeholder="Enter password"
                           className="ml-4 border rounded p-1"/>
                    </label>
                    <button type="submit" className="border rounded">
                        Signup
                    </button>
                
                </form>
            </div>

       </div>  
    );  
}
