

// export default function Footer() {
//   return (
//     <footer className="border-t border-white/10 py-8 text-center text-white/50">
//       <p className="text-sm md:text-base">
//         © 2026
        
//             <a
//   href="/admin/login"
//   className="text-sm font-black tracking-tight text-white transition duration-300 hover:text-white md:text-sm"
//   aria-label="Admin login"
//   title="Admin"
// >
//   Abhinash
// </a>
        
//          Abhinash. Built with Next.js, Tailwind CSS, and MongoDB.{" "}
   
//       </p>
//     </footer>
//   );
// }

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-white/50">
      <p className="text-sm md:text-base">
        © 2026{" "}
        <a
          href="/admin/login"
          className="font-semibold text-white/70 transition duration-300"
          aria-label="Admin login"
          title="Admin"
        >
          Abhinash Mern Developer 
        </a>
        . Built with Next.js, Tailwind CSS, and MongoDB.
      </p>
    </footer>
  );
}