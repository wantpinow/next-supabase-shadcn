"use client";

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

export function OtpInput({ n = 6 }: { n: number }) {
  const [otpValues, setOtpValues] = useState<string[]>(Array(n).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(n).fill(null));

  useEffect(() => {
    // Focus the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  useEffect(() => {
    // log the OTP values when they are all filled
    if (otpValues.every((value) => value !== "")) {
      const otp = otpValues.join("");
      console.log(otp);
    }
  }, [otpValues]);

  const handleInputChange = (index: number, value: string) => {
    // Update the OTP values
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move focus to the next input if not the last input
    if (index < n - 1 && value !== "") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Check for Backspace key
    if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
      // Move focus to the previous input
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    // Extract pasted text
    const pastedText = e.clipboardData.getData("text/plain");

    // Find the last non-empty index after pasting
    const lastNonEmptyIndex = pastedText.length - 1;

    // Distribute characters to the respective inputs
    setOtpValues((prevValues) => prevValues.map((_, i) => pastedText[i] || ""));

    // Set focus to the last non-empty input
    if (inputRefs.current[lastNonEmptyIndex]) {
      inputRefs.current[lastNonEmptyIndex]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: n }, (_, i) => (
        <Input
          key={i}
          type="text"
          maxLength={1}
          value={otpValues[i]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(i, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(i, e)
          }
          onPaste={handlePaste}
          className="w-12 h-12 text-center rounded-md border border-secondary"
          ref={(input) => (inputRefs.current[i] = input)}
        />
      ))}
    </div>
  );
}
