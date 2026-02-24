'use client';

import React from 'react';

import styles from './Navbar.module.css';

// types
import { NavigationDocument } from '@/prismicio-types';

//prismic
import { PrismicNextLink } from '@prismicio/next';
import { asLink } from '@prismicio/client';

//component
import FadeIn from './FadeIn';

// stores
import { useUserStore } from '@/stores/UserStore';

// varia
import { usePathname } from 'next/navigation';

type NavbarProps = {
  navbar: NavigationDocument;
  isOpen?: boolean;
  toggle?: () => void;
  isSocialbarVisible?: boolean;
};

export default function Navbar({ navbar, toggle }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <div className={styles.container}>
      <ul className={styles.navbar}>
        {navbar.data.items.map((item, index) =>
          !user && item.link.text == 'Dashbaord' ? null : (
            <FadeIn
              key={index}
              delay={index * 0.05}
              duration={0.25}
              ease="var(--spring-bezier)"
            >
              <PrismicNextLink field={item.link}>
                {
                  <li className={styles.navItem} onClick={toggle}>
                    <div
                      className={`${styles.index} ${pathname === asLink(item.link) ? styles.active : ''}`}
                    >
                      {'0' + (index + 1)}
                    </div>
                    <p>{item.link.text}</p>
                  </li>
                }
              </PrismicNextLink>
            </FadeIn>
          ),
        )}
      </ul>
    </div>
  );
}
