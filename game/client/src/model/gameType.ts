export interface RankItem {
  userName: string;
  userRecord: string;
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

export interface RecordProps {
  userRecord: string;
  setRank: React.Dispatch<React.SetStateAction<RankItem[]>>;
  resetGame: () => void;
}