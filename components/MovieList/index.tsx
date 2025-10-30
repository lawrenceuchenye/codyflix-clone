import React from "react";
import styles from "./index.module.css";
import { isEmpty } from "lodash";

interface MovieProps {
  data: Record<string, any>[];
  title: String;
}

const MovieCard: React.FC<{ data: Record<string, any> }> = ({ data }) => {
  return (
    <div className={styles.movieCard}>
      <img src={data?.thumbnailUrl} />
    </div>
  );
};

const index: React.FC<MovieProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return isEmpty;
  }

  return (
    <div className={styles.movieListContainer}>
      <div className={styles.mainMovieListContainerHeader}>
        <p>{title}</p>
      </div>
      <div className={styles.movieList}>
        {data.map((movie) => {
          return <MovieCard data={movie} />;
        })}
      </div>
    </div>
  );
};

export default index;
