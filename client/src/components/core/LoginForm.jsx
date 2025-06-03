"use client"

import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../services/oparations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form onSubmit={handleOnSubmit} className="mt-2 flex flex-col gap-y-5">
      {/* Email Field */}
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

      <label className="block relative">
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Password <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter password"
          className="w-full rounded-md bg-gray-50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-200 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
        </button>
        <Link to="/forgot-password">
          <p className="mt-2 text-right text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
            Forgot Password?
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="mt-2 w-full rounded-md bg-blue-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
