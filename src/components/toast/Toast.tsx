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
        justifycontent: "space-between",
        gap: "10px",
        padding: "10px",
        backgroundColor: toastStyles[type].backgroundColor,
        border: `1px solid ${toastStyles[type].borderColor}`,
        color: "#333",
        border_radius: "6px",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      <Row type="vertical">
        {message}
        {statusCode ? `(${statusCode}) ` : ""}
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

// import { toast } from "react-hot-toast";

// type ToastType = "success" | "error" | "warning";

// interface CustomToastProps {
//   message: string;
//   statusCode?: number;
//   type: ToastType;
// }

// export const showToast = ({ message, statusCode, type }: CustomToastProps) => {
//   const toastStyles = {
//     success: { borderColor: "#a1b5a6", backgroundColor: "#fff" },
//     error: { borderColor: "#f5b9bf", backgroundColor: "#fff" },
//     warning: { borderColor: "#f4e8c3", backgroundColor: "#fff" },
//   };

//   const content = (
//     <div>
//       <strong>{statusCode ? `(${statusCode}) ` : ""}</strong>
//       {message}
//     </div>
//   );

//   if (type === "warning") {
//     toast.custom(
//       t => (
//         <div
//           style={{
//             backgroundColor: toastStyles.warning.backgroundColor,
//             border: `2px solid ${toastStyles.warning.borderColor}`,
//             color: "#333",
//             border_radius: "4px",
//             fontSize: "14px",
//             fontWeight: "500",
//           }}
//         >
//           {content}
//         </div>
//       ),
//       { duration: 4000 }
//     );
//   } else {
//     toast[type](content, {
//       style: {
//         backgroundColor: toastStyles[type].backgroundColor,
//         border: `1px solid ${toastStyles[type].borderColor}`,
//         color: "#333",
//         border_radius: "4px",
//         fontSize: "14px",
//         fontWeight: "500",
//       },
//     });
//   }
// };
