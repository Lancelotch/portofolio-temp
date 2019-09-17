const productByCategory = `
{
    status: status,
    products: data.data[].{
        id: id,
        name: name,
        thumbnail: image.mediumUrl,
        isVideoExist: videoUrl != null && videoUrl != '',
        price: price
    } || \`[]\`,
    totalData: data.element,
    error: status != to_number('200') && 'Error happend'
}
`

export default productByCategory;