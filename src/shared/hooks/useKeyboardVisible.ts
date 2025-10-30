import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardVisible = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleShow = () => setKeyboardVisible(true);
    const handleHide = () => setKeyboardVisible(false);

    const showListener = Keyboard.addListener("keyboardDidShow", handleShow);
    const hideListener = Keyboard.addListener("keyboardDidHide", handleHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return keyboardVisible;
};

export default useKeyboardVisible;
