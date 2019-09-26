export function checkSortTabs(status) {
    let params = {}
    if (status === 0 || status === 4) {
        params = {
            direction: "desc",
            sortBy: "orderActivityDate.orderDate"

        }
    } else {
        params = {
            direction: "desc",
            sortBy: "creationDate"
        }
    }
    return params
}