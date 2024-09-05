import styles from "./tools.module.css";
import { ToolOptions } from "@/types";

type ToolsProps = {
  currentTool: string;
  setCurrentTool: (option: ToolOptions) => void;
};

const Tools = ({ currentTool, setCurrentTool }: ToolsProps) => {
  return (
    <div className={styles.toolsWrapper}>
      <button
        onClick={() => setCurrentTool("draw")}
        className={currentTool === "draw" ? styles.selected : ""}
      >
        drawing
      </button>
      <button
        onClick={() => setCurrentTool("text")}
        className={currentTool === "text" ? styles.selected : ""}
      >
        texbox
      </button>
      <button
        onClick={() => setCurrentTool("erase")}
        className={currentTool === "erase" ? styles.selected : ""}
      >
        erase
      </button>
    </div>
  );
};

export default Tools;
