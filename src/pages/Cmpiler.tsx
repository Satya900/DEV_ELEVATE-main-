import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const Compiler: React.FC = () => {
  const [code, setCode] = useState<string>("print('Hello, World!')");
  const [language, setLanguage] = useState<string>("71");
  const [output, setOutput] = useState<string>("");

  const handleCompile = async () => {
    setOutput("Compiling...");

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false",
        {
          source_code: code,
          language_id: parseInt(language),
        },
        {
          headers: {
            "X-RapidAPI-Key": "2b22ea0cb6msh7e3e865ff03f1eep11be06jsn4247dfad1f34", // Replace with your key
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const { token } = response.data;

      let result = null;
      do {
        const pollResponse = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "X-RapidAPI-Key": "2b22ea0cb6msh7e3e865ff03f1eep11be06jsn4247dfad1f34",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );
        result = pollResponse.data;
      } while (result.status.description === "In Queue" || result.status.description === "Processing");

      setOutput(result.stdout || result.stderr || "No output");
    } catch (error) {
      setOutput("Error compiling code!");
      console.error(error);
    }
  };

  const [editorTheme, setEditorTheme] = useState("vs-light");

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      setEditorTheme(htmlElement.classList.contains("dark") ? "vs-dark" : "vs-light");

      // Listen for changes in dark mode
      const observer = new MutationObserver(() => {
        setEditorTheme(htmlElement.classList.contains("dark") ? "vs-dark" : "vs-light");
      });

      observer.observe(htmlElement, { attributes: true, attributeFilter: ["class"] });

      return () => observer.disconnect(); // Cleanup observer on unmount
    }
  }, []);

  const defaultTemplates: Record<string, string> = {
    "71": `print("Hello, World!")`,
    "62": `import java.util.*;\npublic class Main {\n   public static void main(String[] args) {\n       System.out.println("Hello, World!");\n    }\n}`,
    "63": `console.log("Hello, World!");`,
    "54": `#include <bits/stdc++.h> \nusing namespace std;\nint main() {\n   cout << "Hello, World!";\n   return 0;\n}`,
  };

  // Handle language change and update the code template
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(defaultTemplates[newLanguage] || "");
  };

  return (
    <div className="max-w mx-auto p-1 pt-20 dark:bg-zinc-900">
      <div className="w-full h-14 text-sm bg-gray-100 flex justify-end items-center rounded-md dark:bg-zinc-900">
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)
          }
          className=" h-10 w-28 bg-emerald-500 border rounded-md mr-4 p-2 "
        >
          <option value="71">Python 3</option>
          <option value="62">Java 11</option>
          <option value="63">JavaScript</option>
          <option value="54">C++</option>
        </select>

        <button
          onClick={handleCompile}
          className="h-10 text-sm bg-blue-500 text-white p-2 rounded-md"
        >
          Run Code
        </button>
      </div>

      <div className="w-full flex flex-col lg:flex-row h-screen bg-gray-100  dark:bg-zinc-900">
        {/* Left Panel - Code Editor */}
        <div className="h-1/2 lg:h-full lg:w-1/2 bg-white rounded-md dark:bg-black p-2">
          <Editor
            height="100%"
            language="python"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme={editorTheme}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize: 16,
            }}
          />
        </div>

        {/* Divider Line (Horizontal for Mobile, Vertical for Desktop) */}
        <div className="h-[2px] bg-gray-100 dark:bg-zinc-900 lg:h-full lg:w-[2px]"></div>

        {/* Right Panel - Output */}
        <div className="h-1/2 lg:h-full lg:w-1/2 bg-white rounded-md dark:bg-black p-3">
          <pre className="p-3 rounded-md h-full text-black dark:text-white">Output: <br />{output}</pre>
        </div>
      </div>


    </div>
  );
};

export default Compiler;