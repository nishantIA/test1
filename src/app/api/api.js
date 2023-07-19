import { NextRequest, NextResponse } from "next/server";
const API_URL = `https://test1-mbyo.onrender.com`
const iaBaseApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`

export const signin = async(formData)=>{
    try{
        let response = await fetch(
            `${iaBaseApiUrl}/auth/local`,
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(formData),
            }
          );

        if(!response?.ok){
            const error = await response.json();
            return error
        }

        const data = await response.json()
        await setToken(data?.jwt);
        return data
    
    }catch(error){
        console.log(error)
    }
}

export const setToken = async(token)=>{
    const resp = NextResponse.json({
        message:"login successful",
        success:true,
    })
    resp.cookies.set("token",token,{httpOnly:true})
    return resp
}


export const getData = async(endPoint)=>{
    try{
        const res = await fetch(iaBaseApiUrl+'/'+endPoint+"?populate=*",{ cache: 'no-store' });
        if(!res?.ok){
            const responseStatus = res.statusText
            return {responseStatus}
        }
        const responseStatus = res.statusText
        const fetchedData = await res.json();
        const responseData = fetchedData;
        return {responseData,responseStatus};
    }catch(error){
        const errorMessage = error.message
        return {error, errorMessage};
    }
}

export const create = async(endPoint, newData)=>{
    const res = await fetch(iaBaseApiUrl+"/"+endPoint,{
        method:"POST",
        headers: { "content-type": "application/json" },
        body:JSON.stringify(newData)
    });
    return res;
}

export const getOne = async(endPoint,id)=>{
    const res = await fetch(iaBaseApiUrl+'/'+endPoint+"/"+id,{ cache: 'no-store' });
    const data = await res.json();
    return data;
}

export const view = async(endPoint,id)=>{
    const res = await fetch(iaBaseApiUrl+'/'+endPoint+"/"+id,{ cache: 'no-store' });
    const data = await res.json();
    return data;
}

export const edit = async(endPoint,id,updatedData)=>{
    const res = await fetch(iaBaseApiUrl+"/"+endPoint+'/'+id,{
        method:"PUT",
        headers: { "content-type": "application/json" },
        body:JSON.stringify(updatedData)
    });
    return res;
}

export const deleteData = async(endPoint,id)=>{
    const res = await fetch(iaBaseApiUrl+"/"+endPoint+'/'+id,{
        method:"DELETE"
    });
    return res;
}