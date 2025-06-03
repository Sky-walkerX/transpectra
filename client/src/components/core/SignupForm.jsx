"use client"

import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { sendOtp } from "../../services/oparations/authAPI"
import { setSignupData } from "../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../utils/constants"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.WAREHOUSE_MANAGER)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword, contactNumber } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    // Prepare signup data based on the account type
    const signupData = {
      ...formData,
      accountType,
    }
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
    })
    setAccountType(ACCOUNT_TYPE.WAREHOUSE_MANAGER)
  }

  return (
    <div className="w-full">
      {/* Role Selection */}
      <div className="mb-6 mt-2">
        <p className="mb-3 text-sm font-medium text-gray-700">Select Account Type</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="radio"
                name="accountType"
                value="Supplier"
                checked={accountType === ACCOUNT_TYPE.SUPPLIER}
                onChange={() => setAccountType(ACCOUNT_TYPE.SUPPLIER)}
                className="appearance-none h-5 w-5 rounded-full border border-gray-300 checked:border-blue-600 checked:border-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-blue-700 transition">Manufacturer</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="radio"
                name="accountType"
                value="Warehouse_Manager"
                checked={accountType === ACCOUNT_TYPE.WAREHOUSE_MANAGER}
                onChange={() => setAccountType(ACCOUNT_TYPE.WAREHOUSE_MANAGER)}
                className="appearance-none h-5 w-5 rounded-full border border-gray-300 checked:border-blue-600 checked:border-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-blue-700 transition">Warehouse Manager</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="radio"
                name="accountType"
                value="yard_manager"
                checked={accountType === ACCOUNT_TYPE.YARD_MANAGER}
                onChange={() => setAccountType(ACCOUNT_TYPE.YARD_MANAGER)}
                className="appearance-none h-5 w-5 rounded-full border border-gray-300 checked:border-blue-600 checked:border-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-blue-700 transition">Yard Manager</span>
          </label>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <p className="mb-1.5 text-sm font-medium text-gray-700">
              First Name <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-md bg-gray-50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200"
            />
          </label>

          <label className="block">
            <p className="mb-1.5 text-sm font-medium text-gray-700">
              Last Name <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-md bg-gray-50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200"
            />
          </label>
        </div>

        <label className="block">
          <p className="mb-1.5 text-sm font-medium text-gray-700">
            Email Address <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-md bg-gray-50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200"
          />
        </label>

        <label className="block">
          <p className="mb-1.5 text-sm font-medium text-gray-700">
            Contact Number <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type="text"
            name="contactNumber"
            value={contactNumber}
            onChange={handleOnChange}
            placeholder="Enter your contact number"
            className="w-full rounded-md bg-gray-50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block relative">
            <p className="mb-1.5 text-sm font-medium text-gray-700">
              Create Password <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-md bg-gray-50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
            </button>
          </label>

          <label className="block relative">
            <p className="mb-1.5 text-sm font-medium text-gray-700">
              Confirm Password <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded-md bg-gray-50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5" />
              ) : (
                <AiOutlineEye className="h-5 w-5" />
              )}
            </button>
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-blue-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
