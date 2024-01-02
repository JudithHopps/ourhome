export const fetchProductList = async () => {
  const apiEndpoint = process.env.REACT_APP_API_END_POINT;

  if (apiEndpoint) {
    const res = await fetch(apiEndpoint);
    const result = await res.json();
    console.log(result);
    return result;
  } else {
    console.error("API endpoint is undefined");
    throw new Error("API endpoint is undefined");
  }
};
