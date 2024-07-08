import usersApi from "../apis/usersApi";

const BASE_URL = '';

export const findAll = async() => {
    try {
        const response = await usersApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const save = async ({ username, email, password, docente,padrefam,fechaNacimiento ,id_hijo,nombres,apellidos,genero}) => {
    try {
        return await usersApi.post(BASE_URL, {
            username,
            email,
            password,
            fechaNacimiento,
            docente,
            padrefam,
            id_hijo,
            nombres,
            apellidos,
            genero
        });
    } catch (error) {
        throw error;
    }
}

export const update = async({ id, username, email, password }) => {
    try {
        return await usersApi.put(`${BASE_URL}/${id}`, {
            username,
            email,
            password
        });
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await usersApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}