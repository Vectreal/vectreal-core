import styles from '../styles.module.css';

interface Props {
  loader: JSX.Element;
}

const SpinnerWrapper = ({ loader }: Props) => {
  return <div className={styles['spinner-wrapper']}>{loader}</div>;
};

export default SpinnerWrapper;
