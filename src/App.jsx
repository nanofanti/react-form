import "./App.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () =>
    toast.success("Form submitted successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  //Formik logic
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "United States",
      terms: "",
    },

    //Validate Form
    validationSchema: yup.object({
      name: yup
        .string()
        .max(20, "Name must be 20 characters or less")
        .required("Name is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      terms: yup.array().required("Terms of service must be checked"),
    }),
    //Submit Form
    onSubmit: (values, { resetForm }) => {
      if (values && values.terms) {
        notify();
        resetForm();
      } else {
        console.error("Terms of service not accepted");
      }
    },
  });

  console.log(formik.errors);
  console.log(formik.values);
  return (
    <>
      <main className="main_container">
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="left_container">
            <h1 className="title_left">Let's get started ✌️</h1>
            <p>
              Join our E-learning platform today and unlock over 500+ courses
              and digital assetss ready to download
            </p>
            <div className="input_main_container">
              {/* Name input field */}
              <div className="input_container">
                <label
                  className={`label_name ${
                    formik.touched.name && formik.errors.name
                      ? "error-color"
                      : ""
                  }`}
                  htmlFor="name"
                >
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : "Name"}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input_name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Email input field */}
              <div className="input_container">
                <label
                  className={`label_name ${
                    formik.touched.email && formik.errors.email
                      ? "error-color"
                      : ""
                  }`}
                  htmlFor="email"
                >
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : "Email"}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input_name"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Country input field */}
              <div className="input_container">
                <label className="label_name" htmlFor="country">
                  Country
                </label>
                <select
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  name="country"
                  id="country"
                  className="input_name"
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>New Zealand</option>
                </select>
              </div>
              {/* Terms of service input field */}
              <div className="checkbox_wrapper">
                <label
                  className={`label_name ${
                    formik.touched.terms && formik.errors.terms
                      ? "error-color"
                      : ""
                  }`}
                  htmlFor="terms"
                >
                  {formik.touched.terms && formik.errors.terms
                    ? formik.errors.terms
                    : "Terms of Service"}
                </label>
                <div className="checkbox_container">
                  <input
                    onChange={formik.handleChange}
                    type="checkbox"
                    name="terms"
                    className="checkbox_terms"
                    checked={formik.values.terms}
                  />
                  <p>
                    I agree to the Terms and Service that my data will be taken
                    and sold.
                  </p>
                </div>
              </div>
              <button className="button_form" type="submit">
                Start learning today
              </button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
              />
            </div>
          </div>
          <div className="right_container">
            <img className="image_learning" src="/learn.jpg" alt="form_learn" />
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
