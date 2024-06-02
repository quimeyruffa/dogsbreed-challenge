export async function fetchWithConcurrency(urls, MAX_CONCURRENCY = 2) {
  const responses = [];

  const fetchUrl = async (url) => {
      const response = await fetch(url);
      const data = await response.json(); 
      responses.push(data);
  };

  const limitConcurrency = async () => {
      const batch = urls.splice(0, MAX_CONCURRENCY);
      await Promise.all(batch.map(fetchUrl));
      if (urls.length > 0) {
          await limitConcurrency();
      }
  };

  await limitConcurrency();
  return responses;
}
