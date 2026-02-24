'use client';

import { createContext, useContext, useMemo } from 'react';

// prismic types
import { SocialIconsDocument } from '@/prismicio-types';

type IconContextType = {
  all: SocialIconsDocument[];
  byUid: Map<string, SocialIconsDocument>;
  getIcon: (uid: string) => SocialIconsDocument | undefined;
} & Record<string, SocialIconsDocument | undefined>;

const IconContext = createContext<IconContextType | undefined>(undefined);

export function IconProvider({
  children,
  iconProps
}: {
  children: React.ReactNode;
  iconProps: SocialIconsDocument[];
}) {
  const value = useMemo(() => {
    const byUid = new Map(iconProps.map((icon) => [icon.uid, icon]));

    const baseContext = {
      all: iconProps,
      byUid,
      getIcon: (uid: string) => byUid.get(uid)
    };

    // Create a Proxy that automatically returns icons by their UID
    return new Proxy(baseContext, {
      get(target, prop) {
        if (prop in target) {
          return target[prop as keyof typeof target];
        }
        // If the property doesn't exist, try to find an icon with that UID
        if (typeof prop === 'string') {
          return byUid.get(prop);
        }
        return undefined;
      }
    }) as IconContextType;
  }, [iconProps]);

  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

export function useIcons() {
  const context = useContext(IconContext);

  if (context === undefined) {
    throw new Error('Error using IconContext');
  }

  return context;
}
