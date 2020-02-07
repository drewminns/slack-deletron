import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTypes, IInitialState } from '../store';

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

export const FileTypeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { file_types } = useSelector((state: IInitialState) => ({
    file_types: state.form.file_types,
  }));
  const TYPES = ENUM_ARRAY(FILE_TYPES);

  function handleOnChangeEvent(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    dispatch(updateTypes(value, file_types));
  }

  const options = TYPES.map(option => (
    <label key={option.key}>
      <input
        type="checkbox"
        checked={file_types.includes(option.key)}
        onChange={handleOnChangeEvent}
        value={option.key}
      />
      {option.value}
    </label>
  ));

  return <div>{options}</div>;
};

FileTypeSelector.displayName = 'File Type Selector';
