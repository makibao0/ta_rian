import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productController } from "../controllers/product.controller";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../components/ui/Input";
import { useProductStore } from "../store/product.store";
import { useToastStore } from "../store/toast.store";
import { Button } from "../components/ui/Button";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct, deleteProduct } = useProductStore();
  const { showToast } = useToastStore();
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      stock: 0,
      description: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number().positive().required("Price is required"),
      stock: Yup.number().min(0).required("Stock is required"),
    }),
    onSubmit: async (values) => {
      const success = await updateProduct(Number(id), values);
      if (success) {
        showToast("Product updated successfully!", "success");
        navigate("/product");
      }
    },
  });

  useEffect(() => {
    if (id) {
      productController
        .getProductById(Number(id))
        .then((data) => {
          if (data?.images && data.images.length > 0) {
            setImagePreview(data.images[0]);
          }
          formik.setValues({
            title: data.title,
            price: data.price,
            stock: data.stock,
            description: data.description || "",
            category: data.category,
          });
        })
        .catch(() => showToast("Failed to fetch product", "error"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleDelete = async () => {
    const success = await deleteProduct(Number(id));
    if (success) showToast("Product deleted successfully!", "success");
    navigate("/product");
  };

  if (loading)
    return <div className="p-10 animate-pulse">Loading product data...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">Edit Product #{id}</h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border space-y-4"
      >
        <div>
          <img src={imagePreview} alt={"preview"} className="aspect-square" />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Title
          </label>
          <Input
            {...formik.getFieldProps("title")}
            type="text"
            className={`w-full p-2 border rounded-lg outline-none focus:ring-2 ${formik.errors.title ? "border-red-500" : "focus:ring-blue-500"}`}
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <span className="text-red-500 text-xs">{formik.errors.title}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <Input
              {...formik.getFieldProps("title")}
              type="number"
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("price")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <Input
              {...formik.getFieldProps("title")}
              type="number"
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("stock")}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...formik.getFieldProps("title")}
            rows={4}
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("description")}
          />
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button
            type="submit"
            loading={formik.isSubmitting}
            className="w-full text-white py-2 rounded-lg font-semibold  transition-colors disabled:bg-blue-300"
          >
            Save Changes
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
            loading={formik.isSubmitting}
            className="bg-red-700 hover:bg-red-500"
          >
            Delete Product
          </Button>
        </div>
      </form>
    </div>
  );
}
