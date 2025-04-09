import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai"; // Import send icon

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how’s it going?" },
    { id: 2, name: "Jane Smith", lastMessage: "Looking forward to our meeting!" },
    { id: 3, name: "Mike Johnson", lastMessage: "Can we reschedule?" },
  ];

  const conversations = {
    1: [
      { sender: "John Doe", message: "Hey, how’s it going?", time: "10:30 AM" },
      { sender: "You", message: "Good! How about you?", time: "10:32 AM" },
    ],
    2: [
      { sender: "Jane Smith", message: "Looking forward to our meeting!", time: "9:15 AM" },
      { sender: "You", message: "Me too! See you at 3 PM.", time: "9:20 AM" },
    ],
    3: [
      { sender: "Mike Johnson", message: "Can we reschedule?", time: "8:45 AM" },
      { sender: "You", message: "Sure, what time works for you?", time: "8:50 AM" },
    ],
  };

  return (
    <div className="flex w-full h-127 border border-gray-300 shadow-lg rounded-lg overflow-hidden p-4">
      {/* Users List */}
      <div className="w-1/3 bg-gray-100 border-r border-gray-300 p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Messages</h3>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user.id)}
              className={`p-3 mb-2 cursor-pointer rounded-md transition-all duration-200 ${
                selectedUser === user.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              <p className="font-medium">{user.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Conversation Section */}
      <div className="w-2/3 bg-white p-4 flex flex-col h-full">
        {selectedUser ? (
          <>
            <div className="border-b border-gray-300 pb-2 mb-3">
              <h3 className="text-lg font-semibold text-gray-700">
                {users.find((user) => user.id === selectedUser)?.name}
              </h3>
            </div>
            <div className="flex-grow overflow-y-auto mb-4">
              {conversations[selectedUser].map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-3 rounded-lg max-w-[70%] ${
                    msg.sender === "You"
                      ? "bg-blue-600 text-white self-end ml-auto" // Sender message (aligned to the right)
                      : "bg-gray-200 text-gray-800 self-start mr-auto" // Receiver message (aligned to the left)
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <span className="block text-xs mt-1 text-gray-400">{msg.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <AiOutlineSend className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-500 transition-all" />
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center my-auto">
            Select a user to start a conversation.
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
