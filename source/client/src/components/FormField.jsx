import { useState } from 'react';

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  as = 'input',
  options = [],
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = as === 'input' && type === 'password';
  const inputType = isPasswordField && isPasswordVisible ? 'text' : type;

  if (as === 'select') {
    return (
      <label className="form-field">
        <span>{label}</span>
        <select name={name} onChange={onChange} value={value}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (as === 'textarea') {
    return (
      <label className="form-field">
        <span>{label}</span>
        <textarea name={name} onChange={onChange} placeholder={placeholder} rows="4" value={value} />
      </label>
    );
  }

  return (
    <label className="form-field">
      <span>{label}</span>
      <div className={isPasswordField ? 'input-shell input-shell-password' : 'input-shell'}>
        <input name={name} onChange={onChange} placeholder={placeholder} type={inputType} value={value} />
        {isPasswordField ? (
          <button
            aria-label={isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            className="password-toggle"
            type="button"
            onClick={() => setIsPasswordVisible((current) => !current)}
          >
            {isPasswordVisible ? (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M3 4.5L19.5 21"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <path
                  d="M10.7 6.1A10.9 10.9 0 0 1 12 6c5.4 0 9.3 4.5 10 6-.4.8-1.7 2.9-3.9 4.7M14.1 14.3A3 3 0 0 1 9.8 10M6.2 7.2C4 9 2.7 11.2 2.3 12c.7 1.5 4.6 6 9.7 6 1 0 2-.2 2.9-.5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M2.3 12C3 10.5 6.9 6 12 6s9 4.5 9.7 6c-.7 1.5-4.6 6-9.7 6s-9-4.5-9.7-6Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            )}
          </button>
        ) : null}
      </div>
    </label>
  );
}

export default FormField;
