import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import '../css/kanban.css';

export const CustomKanban = () => {
  return (
    <div className="full-screen">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex-row-scroll">
      <Column
        title="BACKLOG"
        column="backlog"
        headingColor="text-gray"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="IN PROGRESS"
        column="doing"
        headingColor="text-blue"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="COMPLETE"
        column="done"
        headingColor="text-green"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

const Column = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="col0">
      <div className="col1">
        <h3 className={`${headingColor}`}>{title}</h3>
        <span className="kheader">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`${
          active ? "colActive" : "colInactive"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="card"
      >
          <p className="card-title">{title}</p>
        </motion.div>
      </>
    );
  };

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="drop-indicator"
    />
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`burn-barrel ${active ? 'burn-barrel-active' : 'burn-barrel-inactive'}`}
    >
      <div className="barrel-item">
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
      </div>
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="card-input"
          />
          <div className="form-buttons">
            <button
              onClick={() => setAdding(false)}
              className="button-close"
            >
              Close
            </button>
            <button
              type="submit"
              className="button-submit"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="button-add-card"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

const DEFAULT_CARDS = [
    // BACKLOG
    { title: "Find my Flipper Zero", id: "1", column: "backlog" },
    // TODO
    { title: "Deploy 'Nick Wolk': Elevate team velocity and streamline project delivery.", id: "2", column: "todo" },
    { title: "Integrate 'Nick Wolk' with 'Company Objectives': Accelerate towards targets with precision and agility.", id: "3", column: "todo" },
    { title: "Connect 'Nick Wolk' to 'Team Goals': Watch productivity and solutions skyrocket!", id: "4", column: "todo" },
    { title: "Implement ValueAddFunction: where 'Nick Wolk' inputs lead to 'enhanced output' across all business operations.",
      id: "5",
      column: "todo" },
    // DOING
    { title: "Get a job yesterday....", id: "6", column: "doing" },
    { title: "Setup a Kubernetes microk8s cluster on spare RaspberryPi's", id: "7", column: "doing" },
    { title: "Build a website in React for promoting myself",
      id: "8",
      column: "doing" },
    { title: "Add logging to daily CRON", id: "9", column: "doing" },
    // DONE
    { title: "Get you to this page! 🎉",
      id: "10",
      column: "done" },
    { title: "Elevate team velocity and streamline project delivery.",
      id: "11",
      column: "done" },
  ];
