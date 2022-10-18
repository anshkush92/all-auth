import { useState } from "react";

// Test ------------------ Since it is a Custom Hook, it returns Custom Logic not JSX components -----------
const useLoading = () => {
    // Using the re-useable Stateful Logic
    const [isLoading, setIsLoading] = useState(false);

    // The function for changing the re-usable state isLoading (useful in form submission, showing Loader)
    const toggleIsLoading = () => {
        setIsLoading((previousState) => !previousState);
    }

    return { isLoading, toggleIsLoading, setIsLoading };
}

// Test ------------------- Exporting the Custom Hooks --------------------
export default useLoading;