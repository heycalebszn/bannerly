import { createContext, useContext } from "react";

export const Context = createContext();

export const FormProvider = ({children}) => {
    const [ formData, setFormData ] = useState({
        name: "",
        field: "",
        twitter: "",
        github: "",
    });

    return(
        <FormProvider.Provider value={{ formData, setFormData }}>
            {children}
        </FormProvider.Provider>
    )
}