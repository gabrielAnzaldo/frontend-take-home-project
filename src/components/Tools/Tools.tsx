import styles from "./tools.module.css";
type ToolOptions = "draw" | "text" | "erase";

type ToolsProps = {
  currentTool: string;
  setCurrentTool: (option: ToolOptions) => void;
};

const Tools = ({ currentTool, setCurrentTool }: ToolsProps) => {
  console.log("test: ", currentTool);
  return (
    <div>
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
