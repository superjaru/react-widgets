import React from "react";
import axios from "axios";

export const Convert = ({ language, text }) => {
  const [translated, setTranslated] = React.useState("");
  const [debouncedText, setDebouncedText] = React.useState(text);
  React.useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        // {body},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };
    doTranslation();
  }, [language, debouncedText]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [text]);
  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};
