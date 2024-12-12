import { createContext } from "react";

export const Context = createContext();

export const FormProvider = ({children}) => {
    const [ formData, setFormData ] = useState({});

    return(
        <FormProvider.Provider value={{ formData, setFormData }}>
            {children}
        </FormProvider.Provider>
    )
}