import React, {useState} from "react";
import './styles.css'

export interface Block {
    id: number;
    name: string;
    children: Block[];
}
function BlockComponent({
        block,
        onAddBlock,
        onEditBlock,
        onDeleteBlock,
    }: {
    block: Block;
    onAddBlock: (parentId: number) => void;
    onEditBlock: (id: number, name: string) => void;
    onDeleteBlock: (id: number) => void;
}) {
    const [newName, setNewName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const handleAddBlockClick = () => {
        onAddBlock(block.id);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEditBlock(block.id, newName);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDeleteBlock(block.id);
    };

    return (
        <div className="block">
            <div className="block-content">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                    </>
                ) : (
                    <>
                        <div className="block-name">{block.name}</div>
                        <div className='action-buttons'>
                            <button className='add-button' onClick={handleAddBlockClick}>+</button>
                            {block.id !== 1 && <button className='edit-button' onClick={handleEditClick}>✎</button>}
                            {block.id !== 1 && <button className='delete-button' onClick={handleDeleteClick}>+</button>}
                        </div>
                    </>
                )}
            </div>

            <div className="block-children">
                {block.children.map((child) => (
                    <BlockComponent
                        key={child.id}
                        block={child}
                        onAddBlock={onAddBlock}
                        onEditBlock={onEditBlock}
                        onDeleteBlock={onDeleteBlock}
                    />
                ))}
            </div>
        </div>
    );
}

export default BlockComponent