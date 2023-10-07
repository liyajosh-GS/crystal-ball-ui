export interface DisplayAndEditTextProps {
  id: string;
  name: string;
  value: string | undefined;
  disabled: boolean;
  onChange?: (value: string) => void;
}
