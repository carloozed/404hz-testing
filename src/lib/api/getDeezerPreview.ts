export const extractDeezerIdFromUrl = (
  url: string | undefined | null
): string | null => {
  if (!url) return null;
  const match = url.match(/deezer\.com\/track\/(\d+)/);
  return match ? match[1] : null;
};

export const getDeezerPreview = async (
  id: string | null
): Promise<string | null> => {
  if (!id) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEEZER_PREVIEW_URL}?id=${id}`
    );
    const data = await response.json();
    return data.preview; // Deezer returns "preview", not "previewUrl"
  } catch {
    return null;
  }
};
