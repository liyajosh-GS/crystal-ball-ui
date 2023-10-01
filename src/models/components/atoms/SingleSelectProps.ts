export interface DropdownOptions {
  label: string;
  value: string;
}

export interface SingleSelectProps {
  label: string;
  dropdownOptions: DropdownOptions[];
  onChange: (value: string) => void;
}
