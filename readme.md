# Blush - Cozy Messaging App

A modern, responsive real-time chat web application with a warm, elegant design aesthetic.

## Features

- **Modern UI**: Glassmorphism design with smooth animations
- **Dark/Light Mode**: Toggle between cozy themes
- **Responsive Design**: Perfect mobile and desktop experience
- **Real-time Chat**: Simulated messaging with sample conversations
- **Authentication**: Login and signup forms
- **Firebase Ready**: Architecture prepared for Firebase integration

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins)

## Project Structure

```
blush/
├── index.html          # Main application file
├── style.css           # Styles and themes
├── script.js           # Application logic
├── assets/
│   └── logo.png        # Application logo
└── readme.md           # This file
```

## Getting Started

1. Clone or download the project
2. Open `index.html` in a modern web browser
3. Or serve locally:
   ```bash
   cd blush
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Features Overview

### Authentication
- Clean login/signup forms
- Social login placeholders
- Form validation

### Chat Interface
- Sidebar with recent conversations
- Main chat area with message bubbles
- Message input with emoji placeholder
- Search functionality

### Themes
- Light mode: Warm beige backgrounds, wine red accents
- Dark mode: Soft brown backgrounds, muted wine highlights

### Mobile Experience
- Responsive design
- Mobile-optimized navigation
- Touch-friendly interface

## Future Firebase Integration

The application is structured for easy Firebase integration:

### Authentication
```javascript
// In FirebaseService.signIn()
await firebase.auth().signInWithEmailAndPassword(email, password);
```

### Realtime Database
```javascript
// In FirebaseService.sendMessage()
await db.ref(`chats/${chatId}/messages`).push(message);
```

### User Status
```javascript
// In FirebaseService.setOnlineStatus()
await db.ref(`users/${userId}/online`).set(status);
```

## Design Philosophy

- **Cozy & Warm**: Soft colors and gentle curves
- **Modern & Clean**: Minimalist layout with purposeful spacing
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Performant**: Smooth animations without lag

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

This is a portfolio project. For improvements:
1. Maintain the design aesthetic
2. Ensure responsive compatibility
3. Add Firebase integration carefully
4. Test across devices

## License

Personal portfolio project - feel free to use as inspiration!