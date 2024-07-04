import { $authHost,$host } from "./index";
import { jwtDecode}  from "jwt-decode";
export const createApplication = async (flatId)=>{
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; 

    const { data } = await $authHost.post('api/application', { status:'Получена', userId, flatId });
    return data;
}
export const fetchApplication = async ()=>{
    const {data} = await $authHost.get('api/application')
    return data;
}

export const updateApplication = async (id,updateData)=>{
    const { data } = await $authHost.put(`api/application/${id}`, updateData);
    return data;
}
export const deleteApplication = async (id)=>{
    const { data } = await $authHost.delete(`api/application/${id}`);
    return data;
}

