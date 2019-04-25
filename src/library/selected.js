const checkVariant = (variantId, valueid, selectedId) => {
    const id = variantId + valueid
    var check = function(element) {
        return element === id
    }
    let statusSelected = selectedId.some(check)
    return statusSelected
}

export default checkVariant