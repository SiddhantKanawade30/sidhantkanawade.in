import { Toaster, toast } from 'sonner';
import { useState } from 'react';

export const Input = ({label, placeholder, type, value, onChange}: {label: string, placeholder: string, type: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
    const [inputValue, setInputValue] = useState(value || "");


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange?.(e);
    };


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (!form) {
            toast.error("Form not found");
            return;
        }

        const audio = new Audio("/click.mp3");
        audio.play();
        
        const formData = new FormData(form);
    
        const response = await fetch(process.env.NEXT_PUBLIC_FORM_URL as string, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
          });
      
          if (response.ok) {
            toast.success("Email sent! ✅");
            form.reset();
          } else {
            toast.error("Falied to submit email ❌");
          }
    }


    return (
        
        <>
        <Toaster />
        <form onSubmit={handleSubmit}>
        <div className="flex px-4 pt-5 flex-col max-w-lg w-full gap-2 min-w-0">
            <div className="relative">
                <input 
                    id={label} 
                    name={label} 
                    type={type} 
                    placeholder={placeholder} 
                    value={value !== undefined ? value : inputValue} 
                    onChange={handleInputChange as unknown as React.ChangeEventHandler<HTMLInputElement>} 
                    className="border border-neutral-300 rounded-md p-2 pr-12 w-full text-sm md:text-base shadow-siddhant focus:ring-1 focus:ring-secondary focus:outline-none" 
                />
                <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 shadow-[inset_1px_1px_23px_0px_#00000024] text-primary px-4 md:px-6 py-1 rounded text-xs md:text-sm hover:bg-neutral-300 cursor-pointer transition-colors duration-200"
                >
                    Send
                </button>
            </div>
        </div>
        </form>
        </>
    )
}
