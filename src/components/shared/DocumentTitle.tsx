'use client';

import { useEffect, useState } from 'react';

// stores
import { useAnalyzeStore } from '@/stores/UseAnalyzeStore';

export default function DocumentTitle() {
  const { isAnalyzing, isFinishedAnalyzing, response } = useAnalyzeStore();
  const [percentage, setPercentage] = useState<number | null | undefined>(null);

  useEffect(() => {
    setPercentage(
      response?.total_chunks &&
        (response.processed_chunks / response.total_chunks) * 100,
    );
  }, [response]);

  useEffect(() => {
    if (isAnalyzing) {
      const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

      let i = 0;
      const interval = setInterval(() => {
        document.title = `${frames[i]} ${Math.round(percentage as number)}% | 404Hz`;
        i = (i + 1) % frames.length;
      }, 100);
      return () => clearInterval(interval);
    } else if (isFinishedAnalyzing) {
      document.title = `${'done! | 404Hz'}`;
    }
  }, [isAnalyzing, isFinishedAnalyzing, percentage]);

  return null;
}
