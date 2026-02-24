import { create } from 'zustand';

// types
import { AnalyzeResponse } from '@/types/analyze';

export type AnalyzeStoreProps = {
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  response: AnalyzeResponse | null;
  setResponse: (response: AnalyzeResponse | null) => void;
  isFinishedAnalyzing: boolean;
  setIsFinishedAnalyzing: (isFinishedAnalyzing: boolean) => void;
  errorMessage?: string;
  setErrorMessage: (error: string) => void;
};

export const useAnalyzeStore = create<AnalyzeStoreProps>((set) => ({
  // Analyzing Processing
  isAnalyzing: false,
  setIsAnalyzing: (isAnalyzing: boolean) => set({ isAnalyzing }),
  errorMessage: '',

  // Responses
  response: null,
  setResponse: (response: AnalyzeResponse | null) => set({ response }),

  // is Finished Analyzing
  isFinishedAnalyzing: false,
  setIsFinishedAnalyzing: (isFinishedAnalyzing: boolean) =>
    set({ isFinishedAnalyzing }),

  setErrorMessage: (errorMessage: string) => set({ errorMessage })
}));
