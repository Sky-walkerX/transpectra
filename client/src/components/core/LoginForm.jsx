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
    <form
      onSubmit={handleOnSubmit}
      className="mt-7 flex flex-col gap-y-4"
    >
      {/* Email Field */}
      <label className="w-full">
        <p className="mb-1 text-sm font-medium text-richblue-600">
          Email <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-md bg-richblue-5 px-4 py-2 text-sm text-richblue-900 placeholder:text-richblue-300 focus:outline-none focus:ring-2 focus:ring-richblue-300 transition"
        />
      </label>

      {/* Password Field */}
      <label className="relative w-full">
        <p className="mb-1 text-sm font-medium text-richblue-600">
          Password <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter password"
          className="w-full rounded-md bg-richblue-5 px-4 py-2 pr-10 text-sm text-richblue-900 placeholder:text-richblue-300 focus:outline-none focus:ring-2 focus:ring-richblue-300 transition"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -mt-2 cursor-pointer text-richblue-400 hover:text-richblue-600 transition"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={20} />
          ) : (
            <AiOutlineEye fontSize={20} />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 text-right text-xs text-blue-500 hover:underline">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 rounded-md bg-richblue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-richblue-800 transition focus:outline-none focus:ring-2 focus:ring-richblue-400"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
