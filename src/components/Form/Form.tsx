import { useFormContext } from '../../context/FormContext';
import Group from '../Group/Group';
import Total from '../Total/Total';
import Button, { ButtonTheme } from '../ui/Button/Button';
import styles from './Form.module.scss';

const Form = () => {
  const { data, addGroup, logForm } = useFormContext();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.title}>Форма</h2>
      <ul className={styles.groups}>
        {data.groups.map((group) => (
          <li key={group.id}>
            <Group groupId={+group.id} />
          </li>
        ))}
      </ul>
      <Button
        theme={ButtonTheme.BLUE}
        onClick={() => {
          addGroup();
        }}
      >
        добавить группу
      </Button>
      <Total initialSum={data.sum} />
      <Button theme={ButtonTheme.BLUE} onClick={logForm}>
        Отправить форму
      </Button>
    </form>
  );
};

export default Form;
