export interface InputProps {
  type: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  minimumValue?: string;
  icon?: any;
  width?: string;
  className? : string,
  onChange?: (e: any) => void;
}
