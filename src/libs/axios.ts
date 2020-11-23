import originalAxios, { AxiosError, AxiosResponse } from 'axios';

import AxiosResponseError from 'errors/AxiosResponseError';

import Domain from 'constants/Domain';

// axios response type 인지 확인
const isAxiosResponse = (item: unknown): item is AxiosResponse => {
    const response = item as AxiosResponse<typeof item>;
    return (
        typeof response === 'object' &&
        response.data !== undefined &&
        typeof response.status === 'number' &&
        response.config !== undefined
    );
};

// axios error type 인지 확인
const isAxiosError = (item: unknown): item is AxiosError => {
    const error = item as AxiosError<typeof item>;
    return (
        typeof error === 'object' &&
        typeof error.name === 'string' &&
        typeof error.message === 'string' &&
        error.config !== undefined &&
        (typeof error.code === 'undefined' || typeof error.code === 'string') &&
        typeof error.isAxiosError === 'boolean'
    );
};

// axios 초기 설정
const axios = originalAxios.create({
    baseURL: Domain.API_URL,
    timeout: 2500,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
});

axios.interceptors.response.use(
    // response 가공
    (response) => (isAxiosResponse(response) ? response.data : response),

    // error 데이터 가공
    (error: unknown) => {
        // axios 외부의 에러인 경우
        if (!isAxiosError(error)) {
            throw new AxiosResponseError(error);
        }

        // axios 내부 에러인 경우
        if (!isAxiosResponse(error.response)) {
            throw new AxiosResponseError(error.response);
        }

        throw new AxiosResponseError(error.response.data);
    }
);

export default axios;
