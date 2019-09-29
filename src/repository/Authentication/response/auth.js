const auth = `
{
    status: status,
    token: data.data.access_token,
    error: status != to_number('200') && data
}
`

export default auth;