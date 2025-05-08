import React, { createContext, useContext, useState } from "react";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
    const [doctorId, setDoctorId] = useState(null);

    return (
        <DoctorContext.Provider value={{ doctorId, setDoctorId }}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctor = () => useContext(DoctorContext);
