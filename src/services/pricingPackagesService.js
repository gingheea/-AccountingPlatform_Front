import api from '../api/axiosInstance'

export async function getPricingPackages() {
    const response = await api.get('/pricing-packages')
    return response.data
}

export async function getPricingPackageById(id) {
    const response = await api.get(`/pricing-packages/${id}`)
    return response.data
}


export async function createPricingPackage(payload) {
    const response = await api.post("/pricing-packages", payload);
    return response.data;
}

export async function updatePricingPackage(id, payload) {
    await api.put(`/pricing-packages/${id}`, payload);
}

export async function deletePricingPackage(id) {
    await api.delete(`/pricing-packages/${id}`);
}

export async function activatePricingPackage(id) {
    await api.patch(`/pricing-packages/${id}/activate`);
}

export async function deactivatePricingPackage(id) {
    await api.patch(`/pricing-packages/${id}/deactivate`);
}