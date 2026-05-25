import api from '../api/axiosInstance'

export async function getPricingPackages() {
    const response = await api.get('/pricing-packages')
    return response.data
}

export async function getPricingPackageById(id) {
    const response = await api.get(`/pricing-packages/${id}`)
    return response.data
}