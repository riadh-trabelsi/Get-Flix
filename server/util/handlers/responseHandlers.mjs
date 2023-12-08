const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

const error = (res) => responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something went wrong!"
});

const notFound = (res) => responseWithData(res, 404, {
    status: 404,
    message: "Ressource not found"
});

const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const empty = (res) => responseWithData(res, 204, {
    status: 204,
    message: "No content"
});

const unauthorize = (res, redirectUrl = '/welcome') => 
    responseWithData(res, 401, {
        status: 401,
        message: "Unauthorized",
        redirect: redirectUrl
    });

const forbidden = (res) => responseWithData(res, 403, {
    status: 403,
    message: "Forbidden"
});

export default {
    error,
    created,
    empty,
    ok,
    unauthorize,
    forbidden,
    notFound
}