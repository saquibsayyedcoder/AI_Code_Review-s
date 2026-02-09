import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode}){
    return (
        <div>
            <Editor 
            height= "400px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            />
        </div>
    )
}