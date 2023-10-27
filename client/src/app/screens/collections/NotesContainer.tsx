import React, {useState} from 'react';
import {DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors} from '@dnd-kit/core';

import { SortableContext, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../../components/SortableItem';
import clsx from 'clsx';
import appActions from '@/mobX/store/appActions';
import { observer } from 'mobx-react';

const NotesContainer = observer(() => {
  const [letters, setLetters] = useState(['Java','Python','C++', 'Php'])
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
            items={letters}
            strategy={appActions.isNotesListVertical? horizontalListSortingStrategy : verticalListSortingStrategy}
        >
            <div className={clsx('pb-[8vw] overflow-hidden', {'flex' : appActions.isNotesListVertical})}>
                {letters.map(item => (
                    <SortableItem key={item} id={item} />
                ))}
            </div>
        </SortableContext>
      
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const {active, over} = event; 
    
    if(active.id != over.id) { 
        setLetters((items) => { 
            const activeIndex = items.indexOf(active.id); 
            const overIndex = items.indexOf(over.id); 
            
            return arrayMove(items, activeIndex, overIndex)
        })
    }
    }

})

export default NotesContainer;

