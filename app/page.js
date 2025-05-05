"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return; // Don't send empty messages
    setIsLoading(true);
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setIsLoading(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Stack
        direction={"column"}
        width="500px"
        height="700px"
        sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
        p={2}
        spacing={3}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          sx={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '3px',
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
              sx={{
                animation: 'fadeIn 0.3s ease-in-out',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0, transform: 'translateY(10px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Box
                sx={{
                  bgcolor: message.role === "assistant" ? "primary.main" : "secondary.main",
                  color: "white",
                  borderRadius: "16px",
                  p: 2,
                  maxWidth: "80%",
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack 
          direction={"row"} 
          spacing={2}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            p: 1,
          }}
        >
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
