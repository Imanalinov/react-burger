import acceptImage from '../../images/accept.png';
import styles from './order-details.module.scss';

const OrderDetails = () => {
  return (
    <div className={styles.order_details}>
      <p
        className="text text_type_digits-large"
      >
        034536
      </p>
      <p
        className="mt-8 text text_type_main-medium"
      >
        идентификатор заказа
      </p>
      <img
        src={acceptImage}
        alt=""
        className="mt-15"
      />
      <p
        className="mt-15 text text_type_main-default"
      >
        Ваш заказ начали готовить</p>
      <p
        className="mt-2 text text_type_main-default text_color_inactive"
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
