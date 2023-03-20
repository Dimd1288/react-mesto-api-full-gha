import { useState } from "react";

export function useLoadingButton(initialText, loaderText) {
    const [buttonText, setButtonText] = useState(initialText);
    
    function handleButtonChange() {
        setButtonText(loaderText);
    }

    function resetButton() {
        setButtonText(initialText);
    }

    return { buttonText, handleButtonChange, resetButton };
}