import Image from "next/image";
import Canvas from "../components/Canvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.code}>
        <p>Frontend Engineer Take Home Project - Gabriel</p>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/classkick.png"
          alt="Classkick Logo"
          width={200}
          height={50}
          priority
        />
      </div>
      <h2>Mock &nbsp;</h2>
      <div className={styles.center}>
        <Image
          src="/classkick-take-home.png"
          alt="Classkick Take Home"
          width={450}
          height={350}
          priority
        />
      </div>
      <h2>Canvas</h2>
      <Canvas />
    </main>
  );
}
