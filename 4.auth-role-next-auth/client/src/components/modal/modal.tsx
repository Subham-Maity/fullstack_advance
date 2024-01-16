"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  title?: string;
  onClose?: () => void;
  onOk?: () => void;
  children: React.ReactNode;
};

export default function Dialog({ title, onClose, onOk, children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = useMemo(
    () => searchParams.get("showDialog"),
    [searchParams],
  );

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    router.back();
    onClose && onClose();
  };

  const clickOk = () => {
    onOk && onOk();
    closeDialog();
  };

  return showDialog === "y" ? (
    <motion.dialog
      ref={dialogRef}
      className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/50 dark:bg-gray-800 bg-transparent"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="w-full max-w-full flex flex-col">
        <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-transparent">
          {title && <h1 className="text-2xl">{title}</h1>}
          {onClose && (
            <motion.button
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              x
            </motion.button>
          )}
        </div>
        <div className="px-5 pb-6">
          {children}
          {onOk && (
            <div className="flex flex-row justify-end mt-2">
              <motion.button
                onClick={clickOk}
                className="bg-green-500 py-1 px-2 rounded border-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                OK
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.dialog>
  ) : null;
}
