import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description, image, formType }) {
  const loading = false;

  return (
    <div className="relative z-0 flex h-screen items-center justify-center bg-gray-100 px-4 py-6">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="relative z-50 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row">
          {/* Left Image Section */}
          <div
            className={`md:w-1/2 hidden md:flex items-center justify-center bg-blue-50`}
          >
            <img
              src={image}
              alt="Illustration"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full p-6 md:w-1/2 md:p-10">
            <h1 className="mb-2 text-3xl font-bold text-blue-600">{title}</h1>
            <p className="mb-6 text-sm text-gray-600 opacity-80">
              {description}
            </p>

            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>
      )}

      {/* Go Back to Home Link */}
      <Link
        to="/"
        className={`absolute ${
          formType === "signup" ? "bottom-6" : "bottom-10"
        } left-6 text-sm bg-blue-600 text-white rounded-md p-4 py-2.5 hover:bg-blue-800 transition`}
      >
        Go back to Home
      </Link>

      {/* Decorative Corner Image */}
      {/* <img
        src={cornerImage}
        alt="Decorative Element"
        className="absolute z-10 bottom-0 right-0 h-24 w-5/12 opacity-80"
      /> */}
    </div>
  );
}

export default Template;
