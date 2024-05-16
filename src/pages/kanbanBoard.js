// Code to display the kanban board
import React from 'react';
import {CustomKanban} from '../components/kanban.js';

function KanbanBoard() {
    return (
        <div>
            <h1>Daily Scrum</h1>
            <div style={{ padding: "20px", margin: "auto", justifyContent: "center", display: "Flex" }}>
            
                <CustomKanban />
            </div>
        </div>
    );
}

export default KanbanBoard;
