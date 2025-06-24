// src/components/inputs/TextInput.jsx
import { Input } from "../ui/input";

const TextInput = ({ label, name, register, error, ...rest }) => (
    <div className="flex flex-col gap-1">
        {label && <label htmlFor={name} className="text-sm font-medium">{label}</label>}
        <Input id={name} {...register(name)} {...rest} />
        {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
);

export default TextInput;