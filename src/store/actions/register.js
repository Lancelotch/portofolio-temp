import urls from "../../api/urls";

export const fetchData = async () => {
    try {
        const response = await fetch(urls.mainServices+urls.register);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e)
    }
}