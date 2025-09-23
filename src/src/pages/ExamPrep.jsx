import React, { useState, useRef, useEffect } from "react";

const ExamPrep = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Welcome to ExamPrep! Get exam-ready answers ✍️" },
  ]);
  const [input, setInput] = useState("");
  const chatboxRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "Here’s the exam-ready answer for: " + input },
    ]);
    setInput("");
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#fbf9f1" }}>
      <header
        style={{
          padding: "1rem",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
        }}
      >
        📘 ExamPrep 
      </header>

      <div
        ref={chatboxRef}
        style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1rem", overflowY: "auto" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              margin: "0.5rem 0",
              padding: "0.8rem",
              borderRadius: "8px",
              maxWidth: "70%",
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              background: msg.type === "user" ? "#667eea" : "#ddd9c5",
              color: msg.type === "user" ? "white" : "black",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", borderTop: "1px solid #ccc", padding: "0.5rem", background: "white" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question..."
          style={{ flex: 1, padding: "0.7rem", border: "1px solid #ccc", borderRadius: "6px", outline: "none" }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "0.5rem",
            padding: "0.7rem 1rem",
            border: "none",
            borderRadius: "6px",
            background: "#f4b30c",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ExamPrep;
