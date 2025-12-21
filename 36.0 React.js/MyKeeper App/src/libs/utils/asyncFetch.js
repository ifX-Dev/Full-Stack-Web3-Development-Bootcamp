const asyncFetch = async (url, method = "GET", data) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options);
};

const asyncWrapper = async (fn) => {
  try {
    await fn();
  } catch (error) {
    console.log(error);
  }
};
export { asyncFetch as default, asyncWrapper };
