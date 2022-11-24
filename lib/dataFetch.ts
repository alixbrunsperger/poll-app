interface queryBody {
    query: string
}
const headers = {
    "content-type": "application/json"
};

const getOptions = (query: queryBody) => ({
    method: "POST",
    body: JSON.stringify(query),
    headers,
})

export const postQuery = (query: queryBody) => fetch(
    window.location.origin + "/api/graphql",
    getOptions(query),
).then(response => response.json());