# Finance 💰

A modern, feature-rich personal finance tracker built with vanilla HTML, CSS, and JavaScript. Track your income, expenses, budgets, and financial goals with a beautiful, responsive UI that supports both light and dark themes.

![Finance App](https://github.com/user-attachments/assets/628c3568-910f-4439-9e46-baf52fbd5e5d)

## ✨ Features

### 💫 Core Functionality
- **Transaction Management**: Add, view, and delete income/expense transactions
- **Smart Categorization**: Organize transactions with emoji-enhanced categories
- **Real-time Balance Tracking**: View total balance, income, and expenses at a glance
- **Local Storage**: All data is stored securely in your browser's local storage

### 🎯 Advanced Features
- **Financial Goals**: Set and track progress towards financial goals
- **Budget Management**: Set category-wise budgets with visual progress indicators
- **Quick Statistics**: Weekly, monthly spending and top category insights
- **Smart Filtering**: Filter transactions by category, type, or search terms
- **Data Export**: Export all your financial data as JSON for backup

### 🎨 Modern UI/UX
- **Dual Theme Support**: Toggle between light and dark modes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Icon Integration**: FontAwesome icons and emoji for better visual hierarchy
- **Glass Morphism Effects**: Modern card-based design with subtle gradients

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/abhinavramanan/Finance.git
   cd Finance
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file access
   open index.html

   # Option 2: Local server (recommended)
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start tracking!**
   - Add your first transaction
   - Set up budgets for different categories
   - Create financial goals
   - Explore the dark theme toggle

## 📱 How to Use

### Adding Transactions
1. Fill in the transaction form with:
   - **Description**: What was the transaction for?
   - **Amount**: How much money was involved?
   - **Category**: Choose from predefined categories (Food, Transportation, etc.)
   - **Type**: Income or Expense
   - **Date**: When did the transaction occur?

2. Click "Add Transaction" to save

### Managing Budgets
1. Navigate to the Budget Management section
2. Enter a category name and budget amount
3. Watch the progress bar fill as you add expenses
4. Get visual warnings when approaching budget limits

### Setting Financial Goals
1. Use the Financial Goals section to set targets
2. Track progress with animated progress bars
3. Add money towards goals incrementally
4. Delete completed or unwanted goals

### Using Advanced Features
- **Search & Filter**: Use the transaction filters to find specific entries
- **Theme Toggle**: Click the moon/sun icon to switch themes
- **Export Data**: Click the download button to backup your data
- **Quick Stats**: Monitor weekly/monthly spending patterns

## 🏗️ Technical Architecture

### File Structure
```
Finance/
├── index.html          # Main HTML structure
├── style.css           # Modern CSS with CSS variables for theming
├── script.js           # ES6+ JavaScript with class-based architecture
└── README.md           # This file
```

### Key Technologies
- **HTML5**: Semantic structure with accessibility considerations
- **CSS3**: 
  - CSS Custom Properties for theming
  - Flexbox and Grid for responsive layouts
  - Transitions and animations for smooth UX
  - Modern gradients and box-shadows
- **JavaScript ES6+**:
  - Class-based architecture
  - Local Storage API for data persistence
  - Event delegation and modern DOM manipulation
  - Modular function design

### Browser Compatibility
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🎨 Customization

### Adding New Categories
To add new transaction categories, update both the HTML select options and the JavaScript category emojis:

```html
<!-- In index.html -->
<option value="newcategory">🆕 New Category</option>
```

```javascript
// In script.js
const categoryEmojis = {
    // ... existing categories
    newcategory: '🆕'
};
```

### Theme Customization
The app uses CSS custom properties for easy theming. Modify the `:root` and `[data-theme="dark"]` selectors in `style.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other variables */
}
```

### Feature Extensions
The modular JavaScript architecture makes it easy to add new features:
- Extend the `FinanceTracker` class with new methods
- Add new UI sections following the existing patterns
- Implement additional data visualization features

## 📊 Data Structure

### Transaction Object
```javascript
{
    id: timestamp,
    description: "string",
    amount: number,
    category: "string",
    type: "income|expense",
    date: Date object
}
```

### Goal Object
```javascript
{
    id: timestamp,
    name: "string",
    target: number,
    current: number,
    createdAt: Date object
}
```

### Budget Structure
```javascript
{
    category: budgetAmount
}
```

## 🔐 Privacy & Security

- **Local Storage Only**: All data stays on your device
- **No External Servers**: No data is sent to any external services
- **No User Tracking**: No analytics or tracking scripts
- **Export Capability**: Full control over your data with export functionality

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the existing code style
4. **Test thoroughly**: Ensure responsive design and cross-browser compatibility
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines
- Use semantic HTML and accessible design patterns
- Follow the existing CSS architecture with custom properties
- Write clean, documented JavaScript with proper error handling
- Test on multiple browsers and device sizes
- Maintain the existing design language and user experience

## 📝 License

This project is open source and available under the [MIT License](https://choosealicense.com/licenses/mit/).

## 🙏 Acknowledgments

- **FontAwesome** for the comprehensive icon library
- **Modern CSS** techniques for responsive design inspiration
- **Progressive Web App** principles for enhanced user experience

## 🐛 Known Issues & Roadmap

### Current Limitations
- Chart.js visualization temporarily disabled due to CDN restrictions
- No cloud sync capability (by design for privacy)
- Limited to single-currency support

### Future Enhancements
- [ ] Add chart visualizations for spending patterns
- [ ] Implement recurring transaction templates
- [ ] Add multi-currency support
- [ ] Create PWA manifest for offline usage
- [ ] Add CSV import/export functionality
- [ ] Implement transaction search with advanced filters

## 📞 Support

For questions, suggestions, or bug reports:
- Open an issue on GitHub
- Contact the maintainer
- Check the documentation above

---

**Made with ❤️ for better financial awareness and management**