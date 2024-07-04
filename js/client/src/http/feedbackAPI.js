import { $authHost,$host } from "./index";
import { jwtDecode}  from "jwt-decode";
export const createFeedback = async (feedback)=>{
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; 

    const { data } = await $authHost.post('api/feedback', { ...feedback, userId });
    return data;
}

export const fetchFeedback = async ()=>{
    const {data} = await $host.get('api/feedback')
    return data
}
export const deleteFeedback = async(id)=>{
    const { data } = await $authHost.delete(`api/feedback/${id}`);
    return data;
}