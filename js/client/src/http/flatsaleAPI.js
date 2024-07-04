import { $authHost,$host } from "./index";

export const createFlatsale = async (formData)=>{
    const { data } = await $authHost.post('api/flatsale', formData);
    return data;
}

export const fetchFlatsale = async ()=>{
    const {data} = await $authHost.get('api/flatsale')
    return data
}
export const deleteFlatsale = async(id)=>{
    const { data } = await $authHost.delete(`api/flatsale/${id}`);
    return data;
}