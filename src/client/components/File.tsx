import React from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { deleteFileById, IInitialState } from '../store';

import { Button } from './';
import { formatBytes } from '../utils';

interface IFileProps {
  title: string;
  id: string;
  created: Date;
  image: string;
  type: string;
  size: number;
}

export const File: React.FC<IFileProps> = ({ title, image, id, created, type, size }: IFileProps) => {
  const dispatch = useDispatch();
  let imageSrc = image;
  if (!image) {
    imageSrc = `https://images.unsplash.com/photo-1426901555017-389235de7b0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9`;
  }

  const handleDeleteById = () => dispatch(deleteFileById(id));

  return (
    <div className="bg-white border overflow-hidden flex-initial w-1/5 mx-2 mb-4">
      <div className="relative h-56 overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-56 object-cover object-center" />
      </div>
      <div className="px-6 pt-4">
        <span className="inline-block text-sm font-semibold text-gray-700 mr-2">{formatBytes(size)}</span>
      </div>
      <div className="px-6 pt-2 pb-4">
        <div className="font-bold text-xl mb-2">
          {title} - {type}
        </div>
        <p className="text-gray-700 text-base">{format(new Date(created), 'MMM dd yyyy')}</p>
      </div>
      <div className="px-6 pb-4">
        <Button handleClick={handleDeleteById} content="Delete File" />
      </div>
    </div>
  );
};

File.displayName = 'File';
