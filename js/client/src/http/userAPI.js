import { $authHost,$host } from "./index";
import { jwtDecode}  from "jwt-decode";

const setRoleFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('role', decodedToken.role);
    }
};
export const registration = async (email,password,famname,number)=>{
    const {data} = await $host.post('api/user/registration',{email,password,famname,number,role:'USER'})
    localStorage.setItem('token',data.token)
    setRoleFromToken();  
    return jwtDecode(data.token)
}
export const login = async (email,password)=>{
    const {data} = await $host.post('api/user/login',{email,password})
    localStorage.setItem('token',data.token)
    setRoleFromToken();
    return jwtDecode(data.token)
}
export const check = async ()=>{
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    setRoleFromToken();
    return jwtDecode(data.token);
    
}
export const fetchUsers = async () => {
    const { data } = await $authHost.get('api/user/users');
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await $authHost.delete(`api/user/users/${id}`);
    return data;
};

export const changeUserRole = async (id, role) => {
    const { data } = await $authHost.put(`api/user/users/${id}/role`, { role });
    return data;
};