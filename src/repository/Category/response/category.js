const category = `
{
    status: status,
    category: data.data[].{
        id: id,
        idName: idName,
        name: name,
        categorySubResponses: categorySubResponses
    } || \`[]\`,
    error: status != to_number('200') && 'Error happend'
}
`;

export default category;
