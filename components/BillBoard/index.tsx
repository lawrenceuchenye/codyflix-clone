import { useEffect } from "react";
import styles from "./index.module.css";
import useBillBoard from "@/hook/useBillBoard";
import { AiOutlineInfoCircle } from "react-icons/ai";

const index = () => {
  const { data: data } = useBillBoard();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles.Billboard}>
      <video
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      ></video>
      <div className={styles.movieInfo}>
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <button>
          {" "}
          <AiOutlineInfoCircle className={styles.icon} />
          More Info
        </button>
      </div>
    </div>
  );
};

export default index;
