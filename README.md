# Finance

A modern, sleek personal finance tracker with a beautiful user interface and comprehensive features for managing your financial life.

![Finance App](https://github.com/user-attachments/assets/978d4cd9-ea24-4220-88e7-89968141814b)

## ✨ Features

### 💰 Transaction Management
- **Add Transactions**: Easily add income and expense transactions with detailed categorization
- **Smart Categories**: Pre-defined categories with emoji icons for better visual recognition
- **Real-time Updates**: Instant balance calculations and transaction updates
- **Search & Filter**: Advanced filtering by category, type, and search functionality
- **Delete Transactions**: Remove transactions with a single click

### 📊 Financial Overview
- **Balance Cards**: Visual cards showing total balance, income, and expenses
- **Color-coded Display**: Green for income, red for expenses, blue for balance
- **Real-time Calculations**: Automatic balance updates as you add transactions

### 🎯 Budget Management
- **Set Budgets**: Create budgets for different categories
- **Progress Tracking**: Visual progress bars showing budget utilization
- **Over-budget Alerts**: Red indicators when you exceed budget limits
- **Budget Overview**: Complete view of all your budgets and their status

### 📈 Data Visualization
- **Expense Categories Chart**: Pie chart showing expense distribution (when Chart.js is available)
- **Monthly Trends**: Line chart displaying income vs expenses over time
- **Graceful Fallbacks**: Clean placeholders when charts aren't available

### 🌙 Modern UI/UX
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Modern Typography**: Clean, readable Inter font
- **Accessibility**: Focus indicators and proper ARIA labels

### 💾 Data Persistence
- **Local Storage**: All data is saved locally in your browser
- **No Server Required**: Works completely offline
- **Privacy Focused**: Your financial data never leaves your device
- **Instant Loading**: Fast startup with locally stored data

## 🚀 Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhinavramanan/Finance.git
   cd Finance
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or serve it with a local server:
     ```bash
     python3 -m http.server 8000
     # Then visit http://localhost:8000
     ```

### Usage

#### Adding Transactions
1. Click on the "Add Transaction" form
2. Fill in the transaction details:
   - **Description**: Brief description of the transaction
   - **Amount**: Transaction amount (positive number)
   - **Category**: Select from predefined categories
   - **Type**: Choose Income or Expense
   - **Date**: Transaction date (defaults to today)
3. Click "Add Transaction" to save

#### Managing Budgets
1. Scroll to the "Budget Management" section
2. Enter a category name and budget amount
3. Click "Set Budget" to create the budget
4. View progress bars showing spending vs budget
5. Remove budgets using the "Remove" button

#### Using Filters
- **Category Filter**: Show transactions from specific categories
- **Type Filter**: Filter by income or expense transactions
- **Search**: Find transactions by description or category
- **Combined Filters**: Use multiple filters simultaneously

#### Dark Mode
- Click the moon/sun icon in the top-right corner
- Theme preference is saved automatically
- Provides better viewing in low-light conditions

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS custom properties
- **Vanilla JavaScript**: No framework dependencies
- **Chart.js**: Data visualization (optional)
- **Local Storage API**: Data persistence

### Browser Compatibility
- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### File Structure
```
Finance/
├── index.html          # Main HTML file
├── style.css           # Comprehensive CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

### Key Features Implementation

#### CSS Custom Properties
```css
:root {
  --primary-color: #6366f1;
  --success-color: #10b981;
  --danger-color: #ef4444;
  /* ... more variables for consistent theming */
}
```

#### Dark Mode Support
```css
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... dark theme overrides */
}
```

#### Responsive Grid Layout
```css
.balance-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

## 📱 Screenshots

### Light Mode
![Light Mode](https://github.com/user-attachments/assets/978d4cd9-ea24-4220-88e7-89968141814b)

### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/6a36b798-a9ff-4d02-9549-47e2f7b34537)

### With Data
![Working App](https://github.com/user-attachments/assets/415bfd40-1c1c-4ffb-94e0-9c55fae27699)

## 🔧 Customization

### Adding New Categories
Modify the category options in `index.html`:
```html
<option value="new-category">🏷️ New Category</option>
```

### Changing Color Scheme
Update CSS custom properties in `style.css`:
```css
:root {
  --primary-color: #your-color;
  --success-color: #your-color;
  /* ... */
}
```

### Modifying Animations
Adjust transition properties:
```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Test your changes across different browsers
- Ensure responsive design compatibility
- Add appropriate comments for complex logic
- Update documentation for new features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Future Enhancements

- [ ] Import/Export functionality (CSV, JSON)
- [ ] Recurring transactions
- [ ] Financial goals tracking
- [ ] Multiple account support
- [ ] Advanced reporting and analytics
- [ ] Transaction categories customization
- [ ] Receipt attachments
- [ ] Multi-currency support
- [ ] Data backup and sync options

## 💡 Tips for Best Experience

1. **Regular Backups**: Export your data periodically
2. **Consistent Categorization**: Use the same categories for similar transactions
3. **Daily Entry**: Enter transactions daily for better tracking
4. **Budget Reviews**: Review and adjust budgets monthly
5. **Mobile Usage**: Works great on mobile devices for on-the-go entry

## ⚡ Performance

- **Fast Loading**: Minimal dependencies for quick startup
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Efficient Storage**: Optimized localStorage usage
- **Memory Friendly**: Lightweight JavaScript implementation

---

**Built with ❤️ for personal finance management**