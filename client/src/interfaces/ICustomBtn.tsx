export interface ICustomBtn {
  type: string;
  buttonText: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
