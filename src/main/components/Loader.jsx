import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
      {/* Premium Bar Loader */}
      <div className="flex gap-1 h-8 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="w-1.5 h-full bg-black rounded-full"
          />
        ))}
      </div>
      
      {/* Sophisticated Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400"
      >
        Syncing Systems
      </motion.p>
    </div>
  );
}