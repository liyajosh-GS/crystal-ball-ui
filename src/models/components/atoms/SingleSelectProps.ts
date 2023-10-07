export interface DropdownOptions {
  label: string;
  value: string;
}

export interface SingleSelectProps {
  dropdownOptions: DropdownOptions[];
  onChange: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  label?: string;
}
