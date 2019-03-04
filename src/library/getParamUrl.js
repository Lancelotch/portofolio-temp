 const getParamUrl = (location) => {
    const searchParams = new URLSearchParams(location.search);
    return {
      query: searchParams.get('q') || '',
    };
  }

  export default getParamUrl;