import React, { useState, useEffect } from 'react';
import BlockComponent from "../BlockComponent/BlockComponent";
import ControlsComponent from "../ControlsComponent/ControlsComponent";
import ZoomComponent from "../ZoomComponet/ZoomComponent";
import {Block} from "../BlockComponent/BlockComponent";
import './styles.css';

function App() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 1,
      name: 'Categories',
      children: [],
    },
  ]);
  const [zoomValue, setZoomValue] = useState("100%");

  useEffect(() => {
    setZoomValue(`${Math.round(scale * 100)}%`);
  }, [scale]);

  const changePosition = (position:{x:number,y:number}) => {
    setPosition(position)
  }

  const changeScale = (scale:number) => {
    setScale(scale)
  }

  const addBlock = (parentId: number) => {
    const newBlock: Block = {
      id: Date.now(),
      name:'Category',
      children: [],
    };

    const updatedBlocks = [...blocks];
    const parentBlock = findBlock(updatedBlocks, parentId);

    if (parentBlock) {
      parentBlock.children.push(newBlock);
      setBlocks(updatedBlocks);
    }
  };

  const editBlock = (id: number, name: string) => {
    const updatedBlocks = [...blocks];
    const block = findBlock(updatedBlocks, id);

    if (block) {
      block.name = name;
      setBlocks(updatedBlocks);
    }
  };

  const deleteBlock = (id: number) => {
    const updatedBlocks = [...blocks];

    removeBlock(updatedBlocks, id);
    setBlocks(updatedBlocks);
  };

  const findBlock = (blocks: Block[], id: number): Block | undefined => {
    for (const block of blocks) {
      if (block.id === id) {
        return block;
      }

      const foundBlock = findBlock(block.children, id);

      if (foundBlock) {
        return foundBlock;
      }
    }

    return undefined;
  };

  const removeBlock = (blocks: Block[], id: number) => {
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].id === id) {
        blocks.splice(i, 1);
        return;
      }

      removeBlock(blocks[i].children, id);
    }
  };


  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  return (
      <div className="App">
        <div className='header'>
          <div className='services-block'>
            <span>
              Services:
            </span>
            <div className='services-count'>
              0
            </div>
          </div>

          <ZoomComponent
              scale={scale}
              changeScale={changeScale}
              zoomValue={zoomValue}
          />
        </div>

        <ControlsComponent
            position={position}
            changePosition={changePosition}
        />

        <div
            className="container"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: `${position.x}px ${position.y}px`,
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >

              <BlockComponent
                  block={blocks[0]}
                  onAddBlock={addBlock}
                  onEditBlock={editBlock}
                  onDeleteBlock={deleteBlock}
              />
        </div>
      </div>
  );
}
export default App;
