# README.md for BinMaster Slayer Macro Project

## Project Overview

BinMaster Slayer Macro is an interactive web application designed for game enthusiasts. It provides real-time updates on a player's slayer quests, macro statistics, personal player information, and rare drops. The application utilizes WebSocket for live communication and updates, ensuring a dynamic and engaging user experience.

## Features

- **Real-Time Slayer Quest Information:** Displays current quest details including time elapsed and state.
- **Macro Statistics:** Shows total bosses encountered, success and failure rates, total Slayer XP gained, and time elapsed.
- **Player Information:** Offers insights into the player's health, mana, location, and username.
- **Rare Drops Tracking:** Lists all rare items dropped during the game session.
- **Chat Functionality:** A dedicated chat area with auto-scroll and click-to-copy message features.
- **Responsive Design:** The UI adapts seamlessly to different screen sizes for optimal viewing.
- **Secure Data Transmission:** Uses a secure method for sending data to the server.

## Installation

1. Clone the repository:

   \```
   git clone [repository URL]
   \```

2. Install dependencies:

   \```
   npm install
   \```

3. Build the application:

   \```
   npm run build
   \```

4. Start the server:

   \```
   npm start
   \```

5. Open `localhost` in your web browser.

## Usage

- The application starts with the default view of slayer quest, macro stats, player info, and drops.
- Interact with the UI elements for detailed information.
- Chat messages can be copied to the clipboard by clicking on them.
- The application will auto-scroll the chat if the corresponding option is enabled.

## Configuration

- Modify the `maxMessages` variable in `chat.js` to adjust the number of chat messages retained.
- To change styling, update the Tailwind CSS configurations.

## Dependencies

- [Socket.IO](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## Security

The application uses localStorage for storing sensitive information like passwords. Ensure to implement proper security measures.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request for review.

## License

This project is licensed under [MIT License](LICENSE.md).

---

*Note: Replace `[repository URL]` with the actual URL of the GitHub repository.*
