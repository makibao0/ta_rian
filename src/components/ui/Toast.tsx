import { useToastStore } from "../../store/toast.store";

export const Toast = () => {
  const { message, type, show } = useToastStore();

  const base =
    "fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform";

  const variants = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-400 text-black",
  };

  return (
    <div
      className={`
        ${base}
        ${variants[type]}
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
      `}
    >
      {message}
    </div>
  );
};
