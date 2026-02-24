import { AnalyzeStoreProps } from '@/stores/UseAnalyzeStore';

import { analyze } from '@/lib/api/analyze';

export type AnalyzeMixProps = AnalyzeStoreProps & {
  e: React.FormEvent<HTMLFormElement>;

  url: string;

  setErrorMessage: (error: string) => void;
};

const analyzeMix = async ({
  e,
  isAnalyzing,
  setIsAnalyzing,
  setResponse,
  url,
  setIsFinishedAnalyzing,
  response,

  setErrorMessage
}: AnalyzeMixProps) => {
  e.preventDefault();
  if (isAnalyzing || !url.trim()) return;

  setIsFinishedAnalyzing(false);
  setIsAnalyzing(true);

  if (response) {
    setResponse(null);
  }

  const pollInterval = 2000;

  const fetchData = async () => {
    try {
      const data = await analyze(url);
      setResponse(data);
      return data.status;
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : String(err));

      return 'error';
    }
  };

  let status;

  do {
    status = await fetchData();

    if (status === 'done') {
      setIsAnalyzing(true);
    }
    if (status === 'done' || status === 'error') break;

    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  } while (status !== 'done');

  setIsAnalyzing(false);
  setIsFinishedAnalyzing(true);
};

export default analyzeMix;
