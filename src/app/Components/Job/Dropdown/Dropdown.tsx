import React from 'react';
import './Dropdown.scss';

const Dropdown = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <div>
      <select onChange={onChange}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default Dropdown;
