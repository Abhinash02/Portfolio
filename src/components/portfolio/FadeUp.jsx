// // "use client";

// // import { motion } from "framer-motion";

// // export default function FadeUp({ children, delay = 0, className = "" }) {
// //   return (
// //     <motion.div
// //       className={className}
// //       initial={{ opacity: 0, y: 40 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, amount: 0.2 }}
// //       transition={{ duration: 0.7, delay }}
// //     >
// //       {children}
// //     </motion.div>
// //   );
// // }


// "use client";

// import { motion } from "framer-motion";

// export default function FadeUp({ children, delay = 0, className = "" }) {
//   return (
//     <motion.div
//       className={className}
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.7, delay }}
//     >
//       {children}
//     </motion.div>
//   );
// }

"use client";

import { motion } from "framer-motion";

export default function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}