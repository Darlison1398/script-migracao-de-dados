async function retry(fn, retries = 3) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;

    await new Promise(resolve => setTimeout(resolve, 1000));

    return retry(fn, retries - 1);
  }
}

module.exports = retry;