import { Row } from "@components/row";
import { toast } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";

type ToastType = "success" | "error" | "warning";

interface CustomToastProps {
  message: string;
  statusCode?: number;
  type: ToastType;
}

export const showToast = ({ message, statusCode, type }: CustomToastProps) => {
  const toastStyles = {
    success: { borderColor: "#a1b5a6", backgroundColor: "#fff" },
    error: { borderColor: "#f5b9bf", backgroundColor: "#fff" },
    warning: { borderColor: "#f4e8c3", backgroundColor: "#fff" },
  };
  const content = (t: any) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        padding: "10px",
        backgroundColor: toastStyles[type].backgroundColor,
        border: `1px solid ${toastStyles[type].borderColor}`,
        color: "#333",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      <Row type="vertical">
        <span>Message: {message}</span>
        <span>Status Code:{statusCode ? `(${statusCode}) ` : ""}</span>
      </Row>
      <span
        onClick={() => toast.dismiss(t.id)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#555",
        }}
      >
        <HiXMark />
      </span>
    </div>
  );

  toast.custom(content, { duration: 5000 });
};
