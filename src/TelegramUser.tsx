import React, { useEffect, useState } from "react";

const TelegramUser = () => {
  const [telegramUserId, setTelegramUserId] = useState(null);

  useEffect(() => {
    // Check if Telegram WebApp object is available
    if (window.Telegram && window.Telegram.WebApp) {
      // Initialize the Telegram WebApp
      window.Telegram.WebApp.ready();

      // Access the user's data
      const user = window.Telegram.WebApp.initDataUnsafe?.user;

      // If user data exists, set the user ID in state
      if (user) {
        setTelegramUserId(user.id);
      } else {
        console.log("User data is not available");
      }
    }
  }, []);

  return (
    <div>
      {telegramUserId ? (
        <p>Telegram User ID: {telegramUserId}</p>
      ) : (
        <p>Loading Telegram user data...</p>
      )}
    </div>
  );
};

export default TelegramUser;
