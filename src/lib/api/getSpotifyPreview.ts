export const extractSpotifyIdFromUrl = (
  url: string | undefined | null
): string | null => {
  if (!url) return null;
  const match = url.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};

export const getSpotifyPreview = async (
  id: string | null
): Promise<string | null> => {
  if (!id) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SPOTIFY_PREVIEW_URL}?id=${id}`
    );
    const data = await response.json();
    return data.previewUrl;
  } catch {
    return null;
  }
};
