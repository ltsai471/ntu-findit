import { useLocation } from 'react-router-dom'
import "../../styles.css";

function OrderDetail(props) {
  const location = useLocation()
  const { id, customer, items } = location.state

  const rows = [];
  if (items.length > 0) {
    items.forEach((item) => {
      rows.push(
        <span>{item.item_name}<br /></span>
      );
    });
  }
  else {
    rows.push(
      <span>(None)<br /></span>
    );
  }

  return (
    <div className="home">
      <div class="container">
        <table className="mt-10">
          <tr>
            <td colspan="2">Order</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Customer</td>
            <td>{customer}</td>
          </tr>
          <tr>
            <td>Items</td>
            <td>{rows}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default OrderDetail;