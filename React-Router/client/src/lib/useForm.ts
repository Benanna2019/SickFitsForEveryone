import { useState, useEffect } from "react";

interface IInputs {
  image: string;
  name: string;
  price: number;
  description: string;
}

export default function useForm(initial: IInputs) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    // This function runs when the things that we are watching change
    setInputs(initial);
  }, [initialValues]);

  // {
  //     name: 'ben',
  //     description: 'nice shoes',
  //     price: 1000
  // }

  function handleChange(e: any) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      //copy existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, _]) => [key, ""])
    ) as unknown as IInputs;
    setInputs(blankState);
  }
  // return the things that we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
