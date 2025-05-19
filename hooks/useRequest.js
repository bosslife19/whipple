// useRequest.js
import { useState } from "react";
import axiosClient from "../axiosClient";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState(null);
    

    const makeRequest = async (url, data) => {
        setLoading(true);
        setError('');
        setSuccess(false);
        setResponse(null);
       

        try {
            const res = await axiosClient.post(url, data);
            
            if (res.data.status) {
                
                setSuccess(true);
                setResponse(res.data);
                return { response: res.data };
            }
        } catch (error) {
            console.log(error);
            const err = error?.response?.data || 'Server Error';
            setError(err);
            return { error: err };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        response,
        makeRequest,
    };
};
