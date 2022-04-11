import React from "react";
import OrderRow from "./OrderRow";

function OrderList(props) {
    const rows = [];
    if (props.orders.length > 0) {
        props.orders.forEach((order) => {
            rows.push(
                <OrderRow
                    order={order}
                    key={order.id} />
            );
        });
    }
    else {
        rows.push(
            <tr>
                <td colspan="2" style={{color: 'gray'}}>No Orders</td>
            </tr>
        );

    }


    return (
        <div className="home">
            <div class="container">
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">Order</th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderList;