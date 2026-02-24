'use client';

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';

// stores
import { usePlayerStore } from '@/stores/PlayerStore';

interface SoundCloudWidget {
  bind(eventName: string, callback: (data?: unknown) => void): void;
  unbind(eventName: string): void;
  play(): void;
  pause(): void;
  toggle(): void;
  seekTo(milliseconds: number): void;
  load(url: string, options?: { auto_play?: boolean }): void;
  getPosition(callback: (position: number) => void): void;
  getDuration(callback: (duration: number) => void): void;
}

interface SoundCloudWidgetAPI {
  Widget: {
    (iframe: HTMLIFrameElement): SoundCloudWidget;
    Events: {
      PLAY: string;
      PAUSE: string;
      FINISH: string;
      READY: string;
    };
  };
}

declare global {
  interface Window {
    SCWP: SoundCloudWidgetAPI;
  }
}

export interface SoundcloudPlayerRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seekTo: () => void;
}

type SoundcloudPlayerProps = {
  onPlayStateChange?: (isPlaying: boolean) => void;
};

const SoundcloudPlayer = forwardRef<SoundcloudPlayerRef, SoundcloudPlayerProps>(
  ({ onPlayStateChange }, ref) => {
    const {
      mixURL,
      isPlaying,
      setCurrentPosition,
      setDuration,
      seekToPosition,
      clearSeekRequest
    } = usePlayerStore();

    const encodedUrl = encodeURIComponent(mixURL || '');
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodedUrl}`;

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<SoundCloudWidget | null>(null);
    const previousUrlRef = useRef<string>('');
    const positionIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useImperativeHandle(ref, () => ({
      play: () => widgetRef.current?.play(),
      pause: () => widgetRef.current?.pause(),
      toggle: () => widgetRef.current?.toggle(),
      seekTo: () => {
        const position = usePlayerStore.getState().seekToPosition;
        if (position !== null) {
          widgetRef.current?.seekTo(position);
        }
      }
    }));

    // Handle user-requested seeks
    useEffect(() => {
      if (seekToPosition !== null && widgetRef.current) {
        widgetRef.current.seekTo(seekToPosition);
        clearSeekRequest();
      }
    }, [seekToPosition, clearSeekRequest]);

    // Update position periodically when playing
    useEffect(() => {
      if (isPlaying && widgetRef.current) {
        positionIntervalRef.current = setInterval(() => {
          widgetRef.current?.getPosition((position) => {
            setCurrentPosition(position);
          });
        }, 1000);
      } else {
        if (positionIntervalRef.current) {
          clearInterval(positionIntervalRef.current);
          positionIntervalRef.current = null;
        }
      }

      return () => {
        if (positionIntervalRef.current) {
          clearInterval(positionIntervalRef.current);
        }
      };
    }, [isPlaying, setCurrentPosition]);

    // Handle play/pause based on isPlaying state
    useEffect(() => {
      if (!widgetRef.current || !mixURL) return;

      if (isPlaying) {
        widgetRef.current.play();
      } else {
        widgetRef.current.pause();
      }
    }, [isPlaying, mixURL]);

    // Load new track when mixURL changes
    useEffect(() => {
      if (!widgetRef.current || !mixURL) return;

      // Only load if the URL actually changed
      if (previousUrlRef.current !== mixURL) {
        previousUrlRef.current = mixURL;
        widgetRef.current.load(mixURL, { auto_play: isPlaying });

        // Get duration and handle pending seek when track loads
        setTimeout(() => {
          widgetRef.current?.getDuration((duration) => {
            setDuration(duration);
          });
          // Apply pending seek after track is loaded
          const pendingSeek = usePlayerStore.getState().seekToPosition;
          if (pendingSeek !== null && widgetRef.current) {
            widgetRef.current.seekTo(pendingSeek);
            clearSeekRequest();
          }
        }, 1000);
      }
    }, [mixURL, isPlaying, setDuration, clearSeekRequest]);

    useEffect(() => {
      const initWidget = () => {
        if (iframeRef.current && window.SC) {
          const widget = window.SC.Widget(iframeRef.current);
          widgetRef.current = widget;

          widget.bind(window.SC.Widget.Events.PLAY, () => {
            onPlayStateChange?.(true);
          });

          widget.bind(window.SC.Widget.Events.PAUSE, () => {
            onPlayStateChange?.(false);
          });

          widget.bind(window.SC.Widget.Events.FINISH, () => {
            onPlayStateChange?.(false);
          });
        }
      };

      if (window.SC) {
        initWidget();
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://w.soundcloud.com/player/api.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener('load', initWidget);
        return () => {
          existingScript.removeEventListener('load', initWidget);
        };
      }

      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    }, [onPlayStateChange]);

    return (
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          width="100%"
          height="166"
          allow="autoplay; encrypted-media"
        />
      </div>
    );
  },
);

SoundcloudPlayer.displayName = 'SoundcloudPlayer';

export default SoundcloudPlayer;
