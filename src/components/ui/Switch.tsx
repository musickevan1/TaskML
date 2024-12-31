interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onChange: () => void;
}

export function Switch({ checked, onChange, className = '', ...props }: SwitchProps) {
  return (
    <button
      role="switch"
      type="button"
      aria-checked={checked}
      onClick={onChange}
      className={className}
      {...props}
    >
      <span className="sr-only">{checked ? 'Enable' : 'Disable'}</span>
    </button>
  );
}