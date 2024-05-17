import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import '../css/ModernCarousel.css';

export default function ModernCarousel() {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(idx);

  const trend = idx > prevIdx ? 1 : -1;

  const mediaIndex = Math.abs(idx % mediaItems.length);

  return (
    <div className="carousel-container">
      <button
        onClick={() => {
          setPrevIdx(idx);
          setIdx((pv) => pv - 1);
        }}
        className="carousel-button carousel-button-left"
      >
        <FiChevronLeft />
      </button>

      <div className="carousel-overlay">
        <AnimatePresence initial={false} custom={trend}>
          {mediaItems[mediaIndex].type === "image" ? (
            <motion.img
              variants={imgVariants}
              custom={trend}
              initial="initial"
              animate="animate"
              exit="exit"
              key={mediaItems[mediaIndex].id}
              src={mediaItems[mediaIndex].src}
              alt={mediaItems[mediaIndex].title}
              className="carousel-image"
            />
          ) : (
            <motion.video
              variants={imgVariants}
              custom={trend}
              initial="initial"
              animate="animate"
              exit="exit"
              key={mediaItems[mediaIndex].id}
              src={mediaItems[mediaIndex].src}
              alt={mediaItems[mediaIndex].title}
              className="carousel-image"
              controls
              autoPlay
              loop
              muted
            />
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={() => {
          setPrevIdx(idx);
          setIdx((pv) => pv + 1);
        }}
        className="carousel-button carousel-button-right"
      >
        <FiChevronRight />
      </button>

      <AnimatePresence initial={false} custom={trend}>
        <motion.span
          custom={trend}
          variants={titleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={mediaItems[mediaIndex].id}
          className="carousel-title"
        >
          {mediaItems[mediaIndex].title}
        </motion.span>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          key={mediaItems[mediaIndex].id + mediaItems.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="carousel-bg"
          style={{
            backgroundImage: `url(${mediaItems[mediaIndex].type === "image" ? mediaItems[mediaIndex].src : ""})`,
          }}
        />
      </AnimatePresence>
    </div>
  );
}

const imgVariants = {
  initial: (trend) => ({
    x: trend === 1 ? "200%" : "-200%",
    opacity: 0,
  }),
  animate: { x: "-50%", opacity: 1 },
  exit: (trend) => ({
    x: trend === 1 ? "-200%" : "200%",
    opacity: 0,
  }),
};

const titleVariants = {
  initial: (trend) => ({
    y: trend === 1 ? 20 : -20,
    opacity: 0,
  }),
  animate: { y: 0, opacity: 1 },
  exit: (trend) => ({
    y: trend === 1 ? -20 : 20,
    opacity: 0,
  }),
};

const mediaItems = [
  {
    src: "../assets/animated_video.mov",
    title: "First Roller Coaster Ride!!!!",
    id: 1,
    type: "video",
  },
  {
    src: "https://images.unsplash.com/photo-1637141816287-4a55cfeecda2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "Another Title",
    id: 2,
    type: "image",
  },
  {
    src: "https://images.unsplash.com/photo-1633774712811-53b489597e78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    title: "And Another",
    id: 3,
    type: "image",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    title: "A Title",
    id: 4,
    type: "image",
  },
];
  