import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import './App.css';

const TagView = ({ tag, updateTree, removeTag }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [nameEditMode, setNameEditMode] = useState(false);
  const [tagData, setTagData] = useState(tag.data || '');
  const [tagName, setTagName] = useState(tag.name);

  const toggleCollapse = () => setCollapsed(!collapsed);

  const handleNameChange = (e) => {
    if (e.key === 'Enter') {
      setNameEditMode(false);
      updateTree({ ...tag, name: tagName });
    }
  };

  const handleDataChange = (e) => {
    setTagData(e.target.value);
    updateTree({ ...tag, data: e.target.value });
  };

  const addChild = () => {
    const newChild = { name: 'New Child', data: 'Data' };
    const updatedTag = {
      ...tag,
      children: tag.children ? [...tag.children, newChild] : [newChild],
      data: undefined,
    };
    updateTree(updatedTag);
    setCollapsed(false);
  };

  return (
    <div className="tag-content">
      <div className="tag-header">
        <button className="icon-button" onClick={toggleCollapse}>
          {collapsed ? <FaChevronRight /> : <FaChevronDown />}
        </button>
        {nameEditMode ? (
          <input
            className="name-input"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            onKeyDown={handleNameChange}
            autoFocus
          />
        ) : (
          <div className="tag-name" onClick={() => setNameEditMode(true)}>
            {tag.name}
          </div>
        )}
        <button className="icon-button add-button" onClick={addChild}>
          <FaPlus />
        </button>
        {removeTag && (
          <button className="icon-button delete-button" onClick={removeTag}>
            <FaTrash />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="tag-children">
          {tag.children ? (
            tag.children.map((child, index) => (
              <TagView
                key={index}
                tag={child}
                updateTree={(updatedChild) => {
                  const updatedChildren = [...tag.children];
                  updatedChildren[index] = updatedChild;
                  updateTree({ ...tag, children: updatedChildren });
                }}
                removeTag={() => {
                  const updatedChildren = tag.children.filter((_, i) => i !== index);
                  updateTree({ ...tag, children: updatedChildren });
                }}
              />
            ))
          ) : (
            <div className='data-input-container'>
                <span>Data</span>
                <input
              className="data-input"
              value={tagData}
              onChange={handleDataChange}
            />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagView;
