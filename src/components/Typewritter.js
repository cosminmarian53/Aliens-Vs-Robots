import useTypewriter from "../hooks/useTypewritter";

const Typewriter = ({ text, speed, wordsPerLine }) => {
  const displayText = useTypewriter(text, speed, wordsPerLine);

  return <p style={{ whiteSpace: "pre-wrap" }}>{displayText}</p>;
};

export default Typewriter;
