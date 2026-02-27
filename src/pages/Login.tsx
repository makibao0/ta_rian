import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useFormik } from "formik";
import { loginSchema } from "../validations/auth.scheme";
export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showPassword, setshowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const success = await login(values.username, values.password);
      if (success) {
        navigate("/dashboard");
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 flex justify-center items-center flex-col p-8 order-2 md:order-1">
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">Login</h1>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center gap-4"
          >
            <Input
              containerClassName="w-full"
              name="username"
              label="Username"
              leftIcon={
                <FontAwesomeIcon icon={faUser} color="gray" size="sm" />
              }
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.username}
              touched={formik.touched.username}
            />

            <Input
              containerClassName="w-full"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              leftIcon={
                <FontAwesomeIcon icon={faLock} color="gray" size="sm" />
              }
              rightIcon={
                <button
                  type="button"
                  onClick={() => setshowPassword(!showPassword)}
                  className="bg-transparent px-2"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    color="gray"
                    size="sm"
                  />
                </button>
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
              touched={formik.touched.password}
            />

            <Button className="w-full mt-2" loading={loading} type="submit">
              Login
            </Button>
          </form>

          <div className="text-center text-sm mt-8 p-4 bg-gray-50 rounded-lg w-full text-gray-500 border border-gray-100">
            <p className="font-semibold mb-1">Demo credentials:</p>
            Username: <span className="font-mono">emilys</span> <br />
            Password: <span className="font-mono">emilyspass</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-linear-to-r from-blue-700 to-blue-500 flex justify-center items-center p-12 order-1 md:order-2 min-h-75 md:min-h-screen">
        <img
          src="/images/dashboard.png"
          alt="Login illustration"
          className="w-3/4 md:w-2/3 h-auto aspect-square object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
