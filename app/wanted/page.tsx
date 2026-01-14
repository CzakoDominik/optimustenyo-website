'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const charges = [
  { text: 'Túl kemény rimek terjesztése', code: 'BTK 420.§' },
  { text: 'Illegálisan erős flow birtoklása', code: 'BTK 69.§' },
  { text: 'Beat-lopás első fokon', code: 'BTK 187.§' },
  { text: 'Fülek elleni merénylet', code: 'BTK 666.§' },
  { text: 'Zenei tehetség illegális használata', code: 'BTK 999.§' },
  { text: 'Túlzott stílus a nyilvános tereken', code: 'BTK 808.§' },
];

const info = [
  { label: 'Művésznév', value: 'OPTIMUSTENYO' },
  { label: 'Származási hely', value: 'Tiszatenyő' },
  { label: 'Foglalkozás', value: 'Magyar Gangster Rapper' },
  { label: 'Státusz', value: 'KÖRÖZÖTT' },
];

export default function WantedPage() {
  return (
    <div className="min-h-screen bg-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Wanted Poster Container */}
        <div className="bg-amber-50 border-8 border-amber-900 shadow-2xl relative">
          {/* Header */}
          <div className="bg-red-700 text-white py-6 border-b-4 border-amber-900">
            <h1 className="text-5xl sm:text-6xl font-bold text-center mb-2">
              KÖRÖZÉS
            </h1>
            <p className="text-3xl sm:text-4xl font-bold text-center">
              WANTED
            </p>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Profile Photo Placeholder */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-64 h-64 mx-auto mb-8 bg-amber-200 border-4 border-amber-900 rounded-lg flex items-center justify-center text-9xl"
            >
              🎤
            </motion.div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-amber-100 border-4 border-amber-900 p-6">
              {info.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-b-2 border-amber-900 pb-2"
                >
                  <p className="text-sm font-semibold text-amber-900 uppercase">
                    {item.label}
                  </p>
                  <p className="text-xl font-bold text-amber-950">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Charges */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-red-700 mb-6 uppercase">
                Vádpontok / Charges
              </h2>
              <div className="space-y-3">
                {charges.map((charge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-amber-100 border-2 border-amber-900 p-4 flex justify-between items-center"
                  >
                    <span className="font-semibold text-amber-950">
                      {charge.text}
                    </span>
                    <span className="text-red-700 font-bold">
                      {charge.code}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Warning Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mb-6 bg-red-100 border-4 border-red-700 p-4"
            >
              <p className="text-xl font-bold text-red-900">
                ⚠️ VESZÉLYES ⚠️
              </p>
              <p className="text-sm text-red-800 mt-2">
                Rendkívül tehetséges és veszélyes!<br />
                Ha észleli, kövesse social médiában!
              </p>
            </motion.div>

            {/* Back Button */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-block bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold py-3 px-8 border-4 border-amber-950 transition transform hover:scale-105"
              >
                ← Vissza a főoldalra
              </Link>
            </div>
          </div>

          {/* Danger Stamp */}
          <motion.div
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: -45, opacity: 0.8 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="absolute top-1/4 right-8 pointer-events-none wanted-stamp"
          >
            <div className="border-8 border-red-600 rounded-full w-48 h-48 flex items-center justify-center bg-red-600/10">
              <div className="text-center">
                <p className="text-5xl font-bold text-red-600">
                  VESZÉ-
                </p>
                <p className="text-5xl font-bold text-red-600">
                  LYES
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vintage paper texture effect */}
        <style jsx>{`
          .wanted-poster {
            background-image: 
              repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.03) 0px,
                rgba(0, 0, 0, 0.03) 1px,
                transparent 1px,
                transparent 2px
              );
          }
        `}</style>
      </motion.div>
    </div>
  );
}
