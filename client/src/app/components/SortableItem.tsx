import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'

export function SortableItem(props: any) {
    const {
      attributes, 
      listeners, 
      setNodeRef, 
      transform, 
      transition
    } = useSortable({id: props.id})

  const style = {
    transform: CSS.Transform.toString(transform) , 
    transition
  };
  
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <h1 className=' w-14'>
          {props.id}
        </h1>
    </div>
  );
}