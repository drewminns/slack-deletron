import React from 'react';

export enum FILE_TYPES {
  images = 'Images',
  pdfs = 'PDF',
  gdocs = 'Google Docs',
  spaces = 'Posts',
  snippets = 'Snippets',
}

function ENUM_ARRAY(listENUM: typeof FILE_TYPES) {
  return Object.entries(listENUM).map(([key, value]) => ({
    value,
    key,
  }));
}

interface IFileTypeSelectorProps {
  activeTypes: string[];
  updateValue: (value: string) => void;
}

export const FileTypeSelector: React.FC<IFileTypeSelectorProps> = ({
  activeTypes,
  updateValue,
}: IFileTypeSelectorProps) => {
  const TYPES = ENUM_ARRAY(FILE_TYPES);

  function handleOnChangeEvent(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    updateValue(value);
  }

  const options = TYPES.map(option => (
    <label key={option.key}>
      <input
        type="checkbox"
        checked={activeTypes.includes(option.key)}
        onChange={handleOnChangeEvent}
        value={option.key}
      />
      {option.value}
    </label>
  ));

  return <div>{options}</div>;
};

FileTypeSelector.displayName = 'Type Selector Component';
