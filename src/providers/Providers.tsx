'use client';

// prismic types
import {
  PlaceholderImageTrackDocument,
  SocialIconsDocument,
  MediaPlayerIconsDocument,
  ArrowDocument,
  WhiteArrowDocument,
  LogoDocument
} from '@/prismicio-types';

// context
import ImageProvider from '@/providers/ImageContext';
import { IconProvider } from '@/providers/IconContext';
import { MobileProvider } from '@/providers/MobileContext';

export type ImageContextProps = {
  placeholderImageSong: PlaceholderImageTrackDocument | null;
  children?: React.ReactNode;
  blackArrow: ArrowDocument;
  whiteArrow: WhiteArrowDocument;
  logo: LogoDocument;
};

export function Providers({
  children,
  icons,
  imageContextProps,
  mediaPlayerIcons
}: {
  children: React.ReactNode;
  icons: SocialIconsDocument[];
  imageContextProps: ImageContextProps;
  mediaPlayerIcons: MediaPlayerIconsDocument;
}) {
  return (
    <MobileProvider>
      <ImageProvider
        placeholderImageSong={imageContextProps.placeholderImageSong}
        mediaPlayerIcons={mediaPlayerIcons}
        whiteArrow={imageContextProps.whiteArrow}
        blackArrow={imageContextProps.blackArrow}
        logo={imageContextProps.logo}
      >
        <IconProvider iconProps={icons}>{children}</IconProvider>
      </ImageProvider>
    </MobileProvider>
  );
}
