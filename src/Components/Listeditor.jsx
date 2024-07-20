import { useState } from "react";

function ListEditor({ lists, onEditListName, onSelectList }) {
    const [isEditing, setIsEditing] = useState(null);
  
    const handleEdit = (oldName) => {
      const newName = prompt('Enter new list name:', oldName);
      if (newName && newName !== oldName) {
        onEditListName(oldName, newName);
        setIsEditing(null);
      }
    };
  
    return (
      <ul>
        {lists.map(list => (
          <li key={list.name}>
            {isEditing === list.name ? (
              <input
                type="text"
                defaultValue={list.name}
                onBlur={() => handleEdit(list.name)}
                autoFocus
              />
            ) : (
              <>
                <span onClick={() => onSelectList(list.name)}>{list.name}</span>
                <button onClick={() => setIsEditing(list.name)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }
  
  export default ListEditor;
  