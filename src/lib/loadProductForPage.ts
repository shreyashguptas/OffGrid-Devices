export async function loadProductForPage<T>(
  label: string,
  fetcher: () => Promise<T>,
): Promise<T | null> {
  try {
    return await fetcher();
  } catch (error) {
    console.error(`Failed to fetch ${label}.`, error);
    return null;
  }
}
