/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps<T extends Record<string, any>> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: T;
  excludeKeys?: (keyof T)[]; // Keys to exclude from display
  keyLabels?: Partial<Record<keyof T, string>>; // Custom labels for keys
  keyOrder?: (keyof T)[]; // Custom order for keys
}

export function Modal<T extends Record<string, any>>({
  isOpen,
  onClose,
  title,
  data,
  excludeKeys = [],
  keyLabels = {},
  keyOrder = [],
}: ModalProps<T>) {
  // Filter and prepare the data for display
  const getDisplayData = () => {
    let entries = Object.entries(data) as [keyof T, any][];

    // Filter out excluded keys
    if (excludeKeys.length > 0) {
      entries = entries.filter(([key]) => !excludeKeys.includes(key));
    }

    // Apply custom key order if provided
    if (keyOrder.length > 0) {
      entries.sort(([keyA], [keyB]) => {
        const indexA = keyOrder.indexOf(keyA);
        const indexB = keyOrder.indexOf(keyB);
        return (
          (indexA === -1 ? Infinity : indexA) -
          (indexB === -1 ? Infinity : indexB)
        );
      });
    }

    return entries;
  };

  // Format the key for display (handles camelCase to Title Case)
  const formatKey = (key: keyof T): string => {
    if (keyLabels[key]) return keyLabels[key] as string;
    return String(key)
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Format the value for display
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof Date) return value.toLocaleDateString();
    return String(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {getDisplayData().map(([key, value]) => (
            <div key={String(key)} className="grid grid-cols-4 gap-4">
              <dt className="text-sm font-medium text-muted-foreground">
                {formatKey(key)}:
              </dt>
              <dd className="col-span-3 text-sm">{formatValue(value)}</dd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
