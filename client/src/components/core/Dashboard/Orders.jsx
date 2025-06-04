import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWarehouseOrdersDetails } from '../../../services/oparations/warehouseAPI';
// import img from '../../../assets/Images/invimg.png';
import QRModal from "../../Common/QrModal";
import PastDeliveryTable from './PastDeliveryTable';
// import {apiConnector} from "../../../services/apiConnector";
// import {toast} from "react-hot-toast";

const Orders = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    qrModal, 
    // setQRModal
  ] = useState(null);

  const warehouse = useSelector((state) => state.warehouse?.warehouse || null);
  const managerId = warehouse?._id;
  // const orderList = useSelector((state) => state.order?.order || []);

  useEffect(() => {
    if (managerId) {
      dispatch(fetchWarehouseOrdersDetails({ managerId }));
    }
  }, [dispatch, managerId]);

  // const handleOpenPDF = async (filePath) => {
  //   try {
  //     const response = await apiConnector(
  //       "POST",                        // HTTP method
  //       "http://localhost:4000/api/v1/pdf/generate-signed-url",     // Backend endpoint
  //       { filePath },
  //     );
  
  //     const { url } = response.data;
  //     if (url) {
  //       window.open(url, "_blank", "noopener,noreferrer"); // Open the signed URL
  //     } else {
  //       alert("Failed to fetch the signed URL.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching signed URL:", error);
  //   }
  // };
  
  // const handleTrackDelivery = (orderId) => navigate(`/dashboard/track-delivery`);
  // const handleRemindManufacturer = (orderId) => {
  //   // Logic to remind manufacturer
  //   toast.success("Reminder Sent Successfully for Order!")
  // };

  return (
    <div className="w-full">
      <PastDeliveryTable />
      {qrModal && <QRModal modalData={qrModal} qrImage={qrModal.qrImage} />}
    </div>
  );
};

export default Orders;
