import { Controller } from "react-hook-form";
import "../components/styles/InputField.css";

/**
 * InputField Component
 * A reusable input component for use with react-hook-form.
 * The defaultValue is set to an empty string to ensure controlled input.
 */
const InputField = ({ name, control, label, type = "text", error }) => {
  return (
    <div className="input-field-container mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            id={name}
            {...field}
            type={type}
            value={field.value || ""}
            className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        )}
      />
      {error && (
        <p
          className="mt-1 text-sm text-red-500"
          id={`${name}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
