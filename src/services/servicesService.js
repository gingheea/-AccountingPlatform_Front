import api from '../api/axiosInstance'

export async function getServices() {
    const response = await api.get('/services')
    return response.data
}

export async function getServiceById(id) {
    const response = await api.get(`/services/${id}`)
    return response.data
}

export async function createService(payload) {
    const response = await api.post("/services", payload);
    return response.data;
}

export async function updateService(id, payload) {
    await api.put(`/services/${id}`, payload);
}

export async function deleteService(id) {
    await api.delete(`/services/${id}`);
}

export async function deactivateService(id) {
    await api.patch(`/services/${id}/deactivate`);
}

export async function activateService(id) {
    await api.patch(`/services/${id}/activate`);
}

