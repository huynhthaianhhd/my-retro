import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Tag from "../Tag";
function Column(props) {
  const { listTasks, showModalEdit, deleteTag, type, idColumn } = props;
  let typeName = "type-went-well";
  if (type === 'improve') {
    typeName = "type-improve";
  }
  if (type === 'action') {
    typeName = "type-action";
  }
  return (
    <div>
      <Droppable droppableId={idColumn || type}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {listTasks.map((item, index) => {
              return (
               <Tag key={item.id} typeName={typeName} item={item} showModalEdit={showModalEdit} deleteTag={deleteTag} index={index} />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
