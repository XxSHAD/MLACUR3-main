import React, { useEffect, useState } from "react";
import { getOrders } from "../../api";
import MyModal from "./MyModal";
import 'bootstrap/dist/css/bootstrap.css';
import classes from './MyOrders.module.css';

function MyOrders() {
  const itemStyle = {
    padding: "8px 20px 8px 20px",
  };

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleViewClick = (item) => {
    setSelectedOrder(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const serialNoToFilter = localStorage.getItem("serialNo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrders();
        console.log("done");
        setData(response.data);
        console.log(localStorage.getItem('serialNo'));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (data.length > 0) {
      // const customerIdToFilter = localStorage.getItem("serialNo").toString(); 
      const customerIdToFilter = localStorage.getItem("serialNo").toString();
      const filteredOrders = data.filter((order) => order.customerID === customerIdToFilter);
      setFilteredData(filteredOrders);
    }
  }, [data]);

  useEffect(() => {
    console.log("Filtered data:", filteredData);
  }, [filteredData]);


  return (
    <div className="tab-pane fade active show">
      <div className="row" style={{ marginTop: "16px" }}>
        {filteredData.map((item, index) => (
          <div className={`col-md-6 ${classes.bookingBlock1}`} key={index}>
            <div className={classes.header}>
              <div className={classes.orderId}>
                <p className={classes.head1}>Order ID-</p>
                <p className={classes.head3}>{item.id}</p>
              </div>
              <div className={classes.orderId}>
                <p className={classes.head2}>AED-</p>
                <p className={classes.head3}>{item.subtotal}</p>
              </div>
            </div>
            <div className={classes.line}></div>
            <div className={classes.details}>
              <div className={classes.item}>
                <p className={classes.textcolor1}>Pickup Date: {item.pickupDate}</p>
                <p className={classes.textcolor2}>Emirate: {item.emirate_id}</p>
              </div>
              <div className={classes.item}>
                <p className={classes.textcolor1}>Delivery Date: {item.deliveryDate}</p>
                <p className={classes.textcolor2}>Status: {item.orderStatus}</p>
              </div>
            </div>
            <div className={classes["item-price"]}>
              <button
                onClick={() => handleViewClick(item)}
                className={`btn btn-primary ${classes.viewButton}`}
                style={{
                  backgroundColor: "#67cbdf",
                  color: "white",
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <MyModal showModal={showModal} handleCloseModal={handleCloseModal} orderDetails={selectedOrder} />
      )}
    </div>
  );
}

export default MyOrders;
