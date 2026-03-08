import axiosInstance from "@/lib/axiosInstance";

export const getInstitutions = async () => {
    try {
        const response = await axiosInstance.get("/companies");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createInstitution = async (data) => {
    try {
        const response = await axiosInstance.post("/companies", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateInstitution = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/companies/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteInstitution = async (id) => {
    try {
        const response = await axiosInstance.delete(`/companies/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
