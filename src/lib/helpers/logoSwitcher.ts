import { useIcons } from '@/providers/IconContext';

export const useLogoSwitcher = () => {
  const icons = useIcons();

  const getLogoUrl = (social: string): string => {
    // Try to get from context first
    const icon = icons.getIcon(social);
    if (icon?.data?.icon?.url) {
      return icon.data.icon.url;
    }

    switch (social) {
      case 'soundcloud':
        return 'https://404hertz.cdn.prismic.io/404hertz/aKRLQaTt2nPbadBl_soundcloud.svg';
      default:
        return 'https://404hertz.cdn.prismic.io/404hertz/aKRLQaTt2nPbadBl_soundcloud.svg';
    }
  };

  return getLogoUrl;
};
