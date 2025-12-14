import { useState, useCallback } from "react";

// Custom hook para la validación de formularios
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Manejador de cambios genérico para cualquier input
  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsFormValid(e.target.closest("form").checkValidity());
  };

  // Función para resetear el formulario a un estado inicial
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setValues, setErrors, setIsFormValid]
  );

  return { values, handleChange, errors, isFormValid, resetForm };
}
