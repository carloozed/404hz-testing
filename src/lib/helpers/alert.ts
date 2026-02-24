const platforms = ['soundcloud.com', 'on.soundcloud.com', 'm.soundcloud.com'];

const alertMessage = (url: string) => {
  const isValidUrl = platforms.some((platform) =>
    url.toLowerCase().includes(platform)
  );

  return !isValidUrl;
};

export default alertMessage;
