import axiosClient from './axiosClient';

export const getHeroes = (page = 1, limit = 5) =>
    axiosClient.get('/', { params: { page, limit } }).then(res => res.data);

export const getHeroById = (id) =>
    axiosClient.get(`/${id}`).then(res => res.data);

export const createHero = (formData) =>
    axiosClient.post('/', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => res.data);

export const updateHero = (id, formData) =>
    axiosClient.put(`/${id}`, formData).then(res => res.data);

export const deleteHero = (id) =>
    axiosClient.delete(`/${id}`).then(res => res.data);
