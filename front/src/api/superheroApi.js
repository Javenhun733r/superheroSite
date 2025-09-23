import axios from 'axios';

const API_BASE = 'http://localhost:5231';

export async function getHeroes(page = 1, limit = 5) {
    const resp = await axios.get(API_BASE, { params: { page, limit } });
    return resp.data;
}

export async function getHeroById(id) {
    const resp = await axios.get(`${API_BASE}/${id}`);
    return resp.data;
}

export async function createHero(data) {
    const resp = await axios.post(API_BASE, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return resp.data;
}

export async function updateHero(id, data) {
    const resp = await axios.put(`${API_BASE}/${id}`, data);
    return resp.data;
}

export async function deleteHero(id) {
    const resp = await axios.delete(`${API_BASE}/${id}`);
    return resp.data;
}
