// Code to display the kanban board
import React from 'react';
import {CustomKanban} from '../components/kanban.js';

function KanbanBoard() {
    return (
        <div style={{ padding: "20px", margin: "auto", justifyContent: "center", display: "Flex" }}>
            <CustomKanban />
        </div>
    );
}

export default KanbanBoard;
