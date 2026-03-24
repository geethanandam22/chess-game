import axios from "axios";
const api = axios .create({
    baseURL: "http://localhost:5001/api/v1",
    withCredentials:true,
});
api.interceptors.response.use((response)=>response,async(error)=>{
    const originalRequest = error.config;
    const isRefreshcall=originalRequest?.url?.includes("/auth/refresh");
    if(
        error.response.status === 401 && !originalRequest._retry && !isRefreshcall){
        originalRequest._retry=true;
        try{
            await api.post("/auth/refresh");
            return api(originalRequest);

        }catch(refreshErr){
            return Promise.reject(refreshErr);
        }
        
    }

})
export { api };