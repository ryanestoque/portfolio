"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xs text-text-tertiary tracking-wider">
              © {new Date().getFullYear()} Ryan Estoque
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-[12px] text-text-tertiary tracking-wider">

            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
