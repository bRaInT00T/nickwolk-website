// Code to display the kanban board
import React from 'react';
import {CustomKanban} from '../components/kanban.js';
import BubbleText from "../components/BubbleText.js";

function KanbanBoard() {
    return (
        <div>
            <BubbleText initialText="Daily Scrum" headingLevel="h1" />
            <div style={{ padding: "20px", margin: "auto", justifyContent: "center", display: "Flex" }}>
                <CustomKanban />
            </div>
        </div>
    );
}

export default KanbanBoard;
