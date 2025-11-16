import InputForm from "@/components/InputForm/InputForm";
import React, { useState } from "react";

export default function InputSearch() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  return <InputForm value={inputValue} onChange={handleInputChange} />;
}
