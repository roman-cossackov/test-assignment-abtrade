import Group from '../Group/Group';
import styles from './Form.module.scss';

// interface FormProps {}

const Form = (props: FormProps) => {
  return (
    <form>
      <h2 className={styles.title}>Форма</h2>
      <Group groupNumber={1} />
    </form>
  );
};

export default Form;
