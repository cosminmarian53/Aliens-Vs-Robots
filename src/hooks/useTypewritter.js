import { useState, useEffect } from "react";

const useTypewriter = (text, speed, wordsPerLine = 10) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => {
          if (wordCount >= wordsPerLine) {
            setWordCount(0);
            return prev + "\n" + text[index];
          }
          if (text[index] === " ") {
            setWordCount(wordCount + 1);
          }
          return prev + text[index];
        });
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, wordCount, wordsPerLine]);

  return displayText;
};

export default useTypewriter;
