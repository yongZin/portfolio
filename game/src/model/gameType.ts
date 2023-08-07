export interface RankItem {
  nickname: string;
  rankRecord: string;
}

export interface MemoryGameProps {
  setRun: React.Dispatch<React.SetStateAction<boolean>>;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
  resetCount: number;
}

export interface TimerProps {
  run: boolean;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
  recordValue: (record: string) => void;
}