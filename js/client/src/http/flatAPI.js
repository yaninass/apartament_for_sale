import { $authHost,$host } from "./index";


export const fetchDistrict = async ()=>{
    const {data} = await $host.get('api/district')
    return data
}

export const createFlat = async (formData)=>{
    const {data}=await $authHost.post('api/flat',formData)
    return data
}
export const fetchFlat = async(districtId,page,limit = 6)=>{
    const {data}=await $host.get('api/flat', {params:{
        districtId,page,limit
    }
    })
    return data
}
export const fetchOneFlat = async (id) => {
        const { data } = await $host.get('api/flat/'+id);
        return data
}
export const fetchOneDistrict = async (id)=>{
    const {data}=await $host.get('api/district/'+id)
    return data.district_name
}
export const deleteFlat = async(id)=>{
    const { data } = await $authHost.delete(`api/flat/${id}`);
    return data;
}