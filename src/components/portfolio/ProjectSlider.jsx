// // "use client";

// // import { useEffect, useState } from "react";

// // export default function ProjectSlider({ images = [] }) {
// //   const [current, setCurrent] = useState(0);

// //   useEffect(() => {
// //     if (!images.length) return;
// //     const interval = setInterval(() => {
// //       setCurrent((prev) => (prev + 1) % images.length);
// //     }, 3500);

// //     return () => clearInterval(interval);
// //   }, [images]);

// //   if (!images.length) {
// //     return (
// //       <div className="h-56 rounded-2xl bg-white/5" />
// //     );
// //   }

// //   return (
// //     <div className="relative h-56 overflow-hidden rounded-2xl">
// //       {images.map((img, index) => (
// //         <img
// //           key={index}
// //           src={img}
// //           alt={`Project image ${index + 1}`}
// //           className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
// //             current === index ? "opacity-100" : "opacity-0"
// //           }`}
// //         />
// //       ))}
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// export default function ProjectSlider({ images = [] }) {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     if (!images.length) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 3500);

//     return () => clearInterval(interval);
//   }, [images]);

//   if (!images.length) {
//     return <div className="h-52 rounded-2xl bg-white/5 md:h-56" />;
//   }

//   return (
//     <div className="relative h-52 overflow-hidden rounded-2xl md:h-56">
//       <AnimatePresence mode="wait">
//         <motion.img
//           key={images[current]}
//           src={images[current]}
//           alt={`Project image ${current + 1}`}
//           className="h-full w-full object-cover"
//           initial={{ opacity: 0.2, scale: 1.04 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.6 }}
//         />
//       </AnimatePresence>

//       <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`h-2.5 w-2.5 rounded-full transition ${
//               current === index ? "bg-cyan-400" : "bg-white/40"
//             }`}
//             aria-label={`Go to image ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// export default function ProjectSlider({ images = [] }) {
//   const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     setCurrent(0);
//   }, [validImages.length]);

//   useEffect(() => {
//     if (validImages.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % validImages.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [validImages.length]);

//   if (!validImages.length) {
//     return (
//       <div className="h-52 rounded-2xl bg-white/5 md:h-56">
//         <div className="flex h-full items-center justify-center text-sm text-white/40">
//           No image uploaded
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative h-52 overflow-hidden rounded-2xl md:h-56">
//       <AnimatePresence mode="wait" initial={false}>
//         <motion.img
//           key={validImages[current]}
//           src={validImages[current]}
//           alt={`Project image ${current + 1}`}
//           className="absolute inset-0 h-full w-full object-cover"
//           initial={{ opacity: 0, scale: 1.04 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.6 }}
//         />
//       </AnimatePresence>

//       {validImages.length > 1 ? (
//         <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
//           {validImages.map((_, index) => (
//             <button
//               key={index}
//               type="button"
//               onClick={() => setCurrent(index)}
//               className={`h-2.5 w-2.5 rounded-full transition ${
//                 current === index ? "bg-cyan-400" : "bg-white/40"
//               }`}
//               aria-label={`Go to image ${index + 1}`}
//             />
//           ))}
//         </div>
//       ) : null}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// export default function ProjectSlider({ images = [] }) {
//   const validImages = useMemo(() => {
//     if (!Array.isArray(images)) return [];
//     return images.filter((img) => typeof img === "string" && img.trim() !== "");
//   }, [images]);

//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     setCurrent(0);
//   }, [validImages]);

//   useEffect(() => {
//     if (validImages.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % validImages.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [validImages.length]);

//   if (!validImages.length) {
//     return (
//       <div className="flex h-52 items-center justify-center rounded-2xl bg-white/5 text-sm text-white/40 md:h-56">
//         No image uploaded
//       </div>
//     );
//   }

//   return (
//     <div className="relative h-52 overflow-hidden rounded-2xl md:h-56">
//       <AnimatePresence mode="wait" initial={false}>
//         <motion.img
//           key={validImages[current]}
//           src={validImages[current]}
//           alt={`Project image ${current + 1}`}
//           className="absolute inset-0 h-full w-full object-cover"
//           initial={{ opacity: 0, scale: 1.04 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.6 }}
//           onError={(e) => {
//             e.currentTarget.src = "/fallback-project.jpg";
//           }}
//         />
//       </AnimatePresence>

//       {validImages.length > 1 && (
//         <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
//           {validImages.map((_, index) => (
//             <button
//               key={index}
//               type="button"
//               onClick={() => setCurrent(index)}
//               className={`h-2.5 w-2.5 rounded-full transition ${
//                 current === index ? "bg-cyan-400" : "bg-white/40"
//               }`}
//               aria-label={`Go to image ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProjectSlider({ images = [], title = "Project" }) {
  const validImages = useMemo(() => {
    if (!Array.isArray(images)) return [];
    return images.filter(
      (img) => typeof img === "string" && img.trim() !== ""
    );
  }, [images]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [validImages.length]);

  useEffect(() => {
    if (validImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % validImages.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [validImages.length]);

  if (!validImages.length) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/5 text-sm text-white/40">
        No image uploaded
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={validImages[current]}
          src={validImages[current]}
          alt={`${title} image ${current + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>

      {validImages.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
          {validImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                current === index ? "bg-cyan-400" : "bg-white/40"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}