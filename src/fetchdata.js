const fetchData = async (url) => {
  let isLoading = true,
    isError = false,
    data = null;
  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      isError = true;
      isLoading = false;
      return { isLoading, isError, data };
    }
    // change to response
    const response = await resp.json();
    data = response;
  } catch (error) {
    isError = true;
  }
  // hide loading
  isLoading = false;

  return { isLoading, isError, data };
};
export default fetchData;
