import styles from './loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div data-testid="loader" className={styles['square']}>
      <div className={styles['big-circle']}>
        <div className={styles['little-circle']}></div>
      </div>
    </div>
  );
};

export default Loader;
