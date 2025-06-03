import { Link } from "react-router-dom"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description, image, formType }) {
  const loading = false 

  return (
    <div className="relative z-0 flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-r-4 border-l-4 border-blue-300 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="relative z-50 flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-900/10 md:flex-row">
          <div className="hidden md:block md:w-1/2 relative overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt="Authentication Illustration"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/20"></div>
            
            <div className="absolute top-8 right-8 w-16 h-16 bg-blue-200 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-indigo-200 rounded-full opacity-40 blur-xl"></div>
          </div>

          <div className="w-full p-8 md:w-1/2 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 leading-tight">{title}</h1>
              <p className="text-base text-gray-600 leading-relaxed">{description}</p>
            </div>

            {formType === "signup" ? <SignupForm /> : <LoginForm />}

            <div className="mt-6 text-center">
              {formType === "signup" ? (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Create one here
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Link
        to="/"
        className="absolute bottom-6 left-6 group flex items-center space-x-2 px-6 py-3 text-base bg-white text-gray-700 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Subtle background decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
    </div>
  )
}

export default Template