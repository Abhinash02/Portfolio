// import "./globals.css";
// import Providers from "./providers";
// import { Toaster } from "react-hot-toast";

// export const metadata = {
//   title: "Abhinash | MERN Stack Developer",
//   description: "Portfolio of Abhinash - MERN Stack Developer"
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-slate-950 text-white">
//         <Toaster position="top-right" />
//         <providers>{children} </providers>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Abhinash | MERN Stack Developer",
  description: "Portfolio of Abhinash - MERN Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#020617",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
              success: {
                style: {
                  border: "1px solid rgba(34,197,94,0.35)",
                },
              },
              error: {
                style: {
                  border: "1px solid rgba(239,68,68,0.35)",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}