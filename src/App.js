import React, { useState } from 'react';
import TagView from './TagView';
import './App.css';

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: "Data" },
        { name: 'child1-child2', data: "Data" },
      ],
    },
    { name: 'child2', data: "Data" },
  ],
};

const App = () => {
  const [tree, setTree] = useState(initialTree);
  const [exportableTree , setExportableTree] = useState('')

  const updateTree = (updatedTag, parentTag = null) => {
    if (parentTag === null) {
      setTree(updatedTag);
    } else {
      const updateTagInTree = (currentTag) => {
        if (currentTag.name === updatedTag.name) {
          return updatedTag;
        }
        if (currentTag.children) {
          return {
            ...currentTag,
            children: currentTag.children.map(updateTagInTree),
          };
        }
        return currentTag;
      };
      setTree(updateTagInTree(parentTag));
    }
  };

  const exportTree = () => {
    const exportableTree = JSON.stringify(tree, null, 2);
    setExportableTree(exportableTree)
  };

  return (
    <div className="container">
      <TagView tag={tree} updateTree={updateTree} />
      <button className="export-button" onClick={exportTree}>
        Export
      </button>
      <p>{exportableTree}</p>
    </div>
  );
};

export default App;
