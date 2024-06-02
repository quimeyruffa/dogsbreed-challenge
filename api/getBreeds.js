const getBreeds = async () => {
  const url = "https://dog.ceo/api/breeds/list/all";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const { url, status, statusText } = res;
      throw new Error(`Error: ${status} ${statusText} in fetch ${url}`);
    }

    const { status, message } = await res.json();

    if (status !== "success") {
      throw new Error(`Error: ${message}`);
    }

    return message;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default getBreeds;
