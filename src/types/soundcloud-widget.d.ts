declare global {
  interface Window {
    SC: {
      Widget: {
        new (iframeElement: HTMLIFrameElement | string): SoundCloudWidget;
        (iframeElement: HTMLIFrameElement | string): SoundCloudWidget;
        Events: {
          LOAD_PROGRESS: string;
          PLAY_PROGRESS: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
          SEEK: string;
          READY: string;
          OPEN_SHARE_PANEL: string;
          CLICK_DOWNLOAD: string;
          CLICK_BUY: string;
          ERROR: string;
        };
      };
    };
  }
}

export interface SoundCloudWidget {
  bind(eventName: string, callback: (data?: unknown) => void): void;
  unbind(eventName: string): void;
  load(
    url: string,
    options?: { auto_play?: boolean; callback?: () => void }
  ): void;
  play(): void;
  pause(): void;
  toggle(): void;
  seekTo(milliseconds: number): void;
  setVolume(volume: number): void;
  next(): void;
  prev(): void;
  skip(soundIndex: number): void;
  getVolume(callback: (volume: number) => void): void;
  getDuration(callback: (duration: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  getSounds(callback: (sounds: Sound[]) => void): void;
  getCurrentSound(callback: (sound: Sound) => void): void;
  getCurrentSoundIndex(callback: (index: number) => void): void;
  isPaused(callback: (paused: boolean) => void): void;
}

export interface Sound {
  id: number;
  title: string;
  duration: number;
  permalink_url: string;
  artwork_url: string | null;
  user: {
    username: string;
    permalink_url: string;
  };
}

export {};
