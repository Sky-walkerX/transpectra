import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { toast } from 'react-hot-toast';

function CreateOrder() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warehouseId, setWarehouseId] = useState("");
  const [formData, setFormData] = useState({
    manufacturerId: '',
    estimatedDeliveryDate: '',
    selectedProducts: [{ name: '', quantity: '' }]
  });

  useEffect(() => {
    // Fetch manufacturers when component mounts
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
        const x = await apiConnector("GET", "http://localhost:4000/api/v1/warehouse/"+user._id);
        if (x.data) {
            console.log(x.data)
            setWarehouseId(x.data.warehouse._id);
        }
      const response = await apiConnector(
        "GET",
        "http://localhost:4000/api/v1/manufacturer/"
      );
      if (response.data.success) {
        console.log(response.data)
        setManufacturers(response.data.manufacturers);
      }
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      toast.error("Failed to fetch manufacturers");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...formData.selectedProducts];
    newProducts[index][field] = value;
    setFormData(prev => ({
      ...prev,
      selectedProducts: newProducts
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: [...prev.selectedProducts, { name: '', quantity: '' }]
    }));
  };

  const removeProduct = (index) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.manufacturerId || !formData.estimatedDeliveryDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.selectedProducts.some(product => !product.name || !product.quantity)) {
      toast.error("Please fill in all product details");
      return;
    }

    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/order/create",
        {
          selectedProducts: formData.selectedProducts,
          manufacturerId: formData.manufacturerId,
          estimatedDeliveryDate: formData.estimatedDeliveryDate,
          warehouseId: warehouseId // Using warehouse manager's ID as warehouseId
        }
      );

      if (response.data.success) {
        toast.success("Order created successfully!");
        navigate('/dashboard/orders');
      } else {
        toast.error(response.data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create New Order</h1>
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="px-4 py-2 bg-richblue-600 text-white rounded-lg hover:bg-richblue-700 transition-colors"
          >
            Back to Orders
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-richblue-900 rounded-lg shadow-lg border border-richblue-700 p-6">
          {/* Manufacturer Selection */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Select Manufacturer</label>
            <select
              name="manufacturerId"
              value={formData.manufacturerId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-richblue-500"
              required
            >
              <option value="">Select a manufacturer</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer._id} value={manufacturer._id}>
                  {manufacturer.companyName} - {manufacturer.companyAddress}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Date */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Estimated Delivery Date</label>
            <input
              type="date"
              name="estimatedDeliveryDate"
              value={formData.estimatedDeliveryDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-richblue-500"
              required
              min={new Date().toISOString().split('T')[0]} // Set minimum date to today
            />
          </div>

          {/* Products Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Products</h2>
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center gap-2 px-4 py-2 bg-richblue-600 text-white rounded-lg hover:bg-richblue-700 transition-colors"
              >
                <FaPlus />
                Add Product
              </button>
            </div>

            {formData.selectedProducts.map((product, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-richblue-500"
                    required
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                    className="w-full px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-richblue-500"
                    required
                    min="1"
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-richblue-600 text-white rounded-lg hover:bg-richblue-700 transition-colors font-medium ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Order...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateOrder; 