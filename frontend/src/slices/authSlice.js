import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from  "../api/client";
const  initialState= {
    user:null,
    status:"idle",
    error:null,
    isAuthChecked:false,

};
 export const  login = createAsyncThunk(
    "auth/login",
    async({email, password},thunkAPI)=>{
        try{
            //axios
            const res = await api.post("/auth/login",{ email,password });
            return res.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message ||"login failed");

        }
    },
 );
export const  signup = createAsyncThunk(
    "auth/signup",
    async({name, email, password},thunkAPI)=>{
        try{
            //axios
            const res = await api.post("/auth/signup",{name, email,password});
            return res.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message ||"signup failed");
        }
    },
 );
 export const  logout = createAsyncThunk("auth/logout",async(_,thunkAPI)=>{
        try{
            //axios
            const res = await api.post("/auth/logout");
            return res.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message ||"logout failed");
        }
    },
 );

 //fetch me reducer
 export const fetchMe = createAsyncThunk("auth/fetchMe",async(_,thunkAPI)=>{
    try{
        const res = await api.get("/auth/me");
        return res.data.user;

    }
    catch(err){
        return thunkAPI.rejectWithValue(err.message ||"fetch me failed");
    }
 });

 //refresh reducer
 export const refresh = createAsyncThunk("auth/referesh",async(_,thunkAPI)=>{
    try{
        const res = await api.post("/auth/refresh");
        return res.data;

    }
    catch(err){
        return thunkAPI.rejectWithValue(err.message  ||"refresh failed");
    }
 })



const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        function pending(state) {
            state.user = null;
            state.status = "pending";
            state.error = null;
        }
        function fulfilled(state) {
            state.status = "success",
                state.error = null;
        }
        function rejected(state, action) {
            state.error = action.playload,
                state.status = "error",
                state.user = null;
        }
        builder
            .addCase(login.pending, pending)
            .addCase(login.fulfilled, fulfilled)
            .addCase(login.rejected, rejected)
            .addCase(signup.pending, pending)
            .addCase(signup.fulfilled, fulfilled)
            .addCase(signup.rejected, rejected)
            .addCase (logout.pending,pending)  
            .addCase(logout.fulfilled,(state)=>{
                state.user=null;
                state.status="success";
                state.error=null;
            })
            .addCase(logout.rejected, rejected)
            .addCase(fetchMe.pending,pending)
            .addCase(fetchMe.fulfilled,(state,action)=>{
                state.user=action.payload;
                state.status="success";
                state.error=null;
                state.isAuthChecked=true;
            })
            .addCase(fetchMe.rejected,(state,action)=>{
                state.error=action.payload;
                state.status="error";
                state.user=null;
                state.isAuthChecked=true;
                
            });


    },
});
const authReducer = authSlice.reducer;
export{ authReducer };

