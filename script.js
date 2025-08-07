class FinanceTracker {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.budgets = JSON.parse(localStorage.getItem('budgets')) || {};
        this.goals = JSON.parse(localStorage.getItem('goals')) || [];
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.initTheme();
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
    }

    setupEventListeners() {
        document.getElementById('transactionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });

        document.getElementById('filterCategory').addEventListener('change', () => {
            this.filterTransactions();
        });

        document.getElementById('filterType').addEventListener('change', () => {
            this.filterTransactions();
        });

        document.getElementById('searchTransaction').addEventListener('input', () => {
            this.filterTransactions();
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearFilters();
        });

        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        document.getElementById('exportData').addEventListener('click', () => {
            this.exportData();
        });
    }

    addTransaction() {
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;

        const transaction = {
            id: Date.now(),
            description,
            amount,
            category,
            type,
            date: new Date(date)
        };

        this.transactions.unshift(transaction);
        this.saveData();
        this.updateDisplay();
        document.getElementById('transactionForm').reset();
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
        
        this.showNotification(`Transaction added: ${description}`, 'success');
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveData();
        this.updateDisplay();
        this.showNotification('Transaction deleted', 'info');
    }

    addGoal() {
        const name = document.getElementById('goalName').value.trim();
        const target = parseFloat(document.getElementById('goalTarget').value);
        const current = parseFloat(document.getElementById('goalCurrent').value) || 0;

        if (!name || !target || target <= 0) {
            this.showNotification('Please enter valid goal details', 'error');
            return;
        }

        const goal = {
            id: Date.now(),
            name,
            target,
            current: Math.min(current, target),
            createdAt: new Date()
        };

        this.goals.push(goal);
        this.saveData();
        this.displayGoals();
        
        document.getElementById('goalName').value = '';
        document.getElementById('goalTarget').value = '';
        document.getElementById('goalCurrent').value = '';
        
        this.showNotification(`Goal "${name}" added successfully!`, 'success');
    }

    updateGoal(id, newCurrent) {
        const goal = this.goals.find(g => g.id === id);
        if (goal) {
            goal.current = Math.min(Math.max(0, newCurrent), goal.target);
            this.saveData();
            this.displayGoals();
        }
    }

    deleteGoal(id) {
        this.goals = this.goals.filter(g => g.id !== id);
        this.saveData();
        this.displayGoals();
        this.showNotification('Goal deleted', 'info');
    }

    updateDisplay() {
        this.updateBalance();
        this.updateQuickStats();
        this.displayTransactions();
        this.displayBudgets();
        this.displayGoals();
        this.displayCategoryBreakdown();
    }

    updateBalance() {
        const totalIncome = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalBalance = totalIncome - totalExpenses;

        document.getElementById('totalBalance').textContent = `$${totalBalance.toFixed(2)}`;
        document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
        document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    }

    updateQuickStats() {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const weeklySpent = this.transactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= oneWeekAgo)
            .reduce((sum, t) => sum + t.amount, 0);

        const monthlySpent = this.transactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= oneMonthAgo)
            .reduce((sum, t) => sum + t.amount, 0);

        const categoryCounts = {};
        this.transactions.forEach(t => {
            categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
        });

        const topCategory = Object.keys(categoryCounts).reduce((a, b) => 
            categoryCounts[a] > categoryCounts[b] ? a : b, 'None');

        document.getElementById('weeklySpent').textContent = `$${weeklySpent.toFixed(2)}`;
        document.getElementById('monthlySpent').textContent = `$${monthlySpent.toFixed(2)}`;
        document.getElementById('totalTransactions').textContent = this.transactions.length;
        document.getElementById('topCategory').textContent = topCategory.charAt(0).toUpperCase() + topCategory.slice(1);
    }

    displayTransactions(transactionsToShow = this.transactions) {
        const container = document.getElementById('transactionsList');
        container.innerHTML = '';

        if (transactionsToShow.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No transactions found</p>';
            return;
        }

        transactionsToShow.forEach(transaction => {
            const div = document.createElement('div');
            div.className = `transaction-item ${transaction.type}`;

            const categoryEmojis = {
                food: '🍽️', transportation: '🚗', shopping: '🛍️', entertainment: '🎬',
                utilities: '💡', healthcare: '🏥', salary: '💰', freelance: '💼',
                investment: '📈', other: '📦'
            };

            div.innerHTML = `
                <div class="transaction-details">
                    <h4>${categoryEmojis[transaction.category] || '📦'} ${transaction.description}</h4>
                    <p>${transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)} • ${new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span class="transaction-amount ${transaction.type}">
                        ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
                    </span>
                    <button class="delete-btn" onclick="tracker.deleteTransaction(${transaction.id})" title="Delete transaction">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            container.appendChild(div);
        });
    }

    displayGoals() {
        const container = document.getElementById('goalsList');
        container.innerHTML = '';

        this.goals.forEach(goal => {
            const progress = (goal.current / goal.target) * 100;
            const div = document.createElement('div');
            div.className = 'goal-item';

            div.innerHTML = `
                <div class="goal-header">
                    <span class="goal-name">${goal.name}</span>
                    <span class="goal-progress">${progress.toFixed(1)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="goal-amount">
                    $${goal.current.toFixed(2)} / $${goal.target.toFixed(2)}
                    <div style="float: right;">
                        <input type="number" placeholder="Add amount" step="0.01" style="width: 100px; margin-right: 10px; padding: 5px; border: 1px solid #ddd; border-radius: 4px;" onchange="tracker.updateGoal(${goal.id}, ${goal.current} + parseFloat(this.value || 0))">
                        <button onclick="tracker.deleteGoal(${goal.id})" style="background: #f44336; color: white; border: none; padding: 5px 8px; border-radius: 4px; cursor: pointer;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(div);
        });
    }

    displayCategoryBreakdown() {
        const container = document.getElementById('categoryBreakdown');
        container.innerHTML = '';

        const categoryTotals = {};
        this.transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            });

        const sortedCategories = Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const categoryEmojis = {
            food: '🍽️', transportation: '🚗', shopping: '🛍️', entertainment: '🎬',
            utilities: '💡', healthcare: '🏥', salary: '💰', freelance: '💼',
            investment: '📈', other: '📦'
        };

        sortedCategories.forEach(([category, amount]) => {
            const div = document.createElement('div');
            div.className = 'category-breakdown-item';
            div.innerHTML = `
                <span>${categoryEmojis[category] || '📦'} ${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span style="font-weight: 600; color: var(--error-color);">$${amount.toFixed(2)}</span>
            `;
            container.appendChild(div);
        });

        if (sortedCategories.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666;">No expense data available</p>';
        }
    }

    filterTransactions() {
        const categoryFilter = document.getElementById('filterCategory').value;
        const typeFilter = document.getElementById('filterType').value;
        const searchTerm = document.getElementById('searchTransaction').value.toLowerCase();

        let filtered = this.transactions;

        if (categoryFilter) {
            filtered = filtered.filter(t => t.category === categoryFilter);
        }

        if (typeFilter) {
            filtered = filtered.filter(t => t.type === typeFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(t =>
                t.description.toLowerCase().includes(searchTerm) ||
                t.category.toLowerCase().includes(searchTerm)
            );
        }

        this.displayTransactions(filtered);
    }

    clearFilters() {
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterType').value = '';
        document.getElementById('searchTransaction').value = '';
        this.displayTransactions();
    }

    displayBudgets() {
        const container = document.getElementById('budgetList');
        container.innerHTML = '';

        Object.entries(this.budgets).forEach(([category, budget]) => {
            const spent = this.transactions
                .filter(t => t.type === 'expense' && t.category === category)
                .reduce((sum, t) => sum + t.amount, 0);

            const percentage = (spent / budget) * 100;
            const status = percentage > 100 ? 'over' : percentage > 80 ? 'warning' : 'good';

            const div = document.createElement('div');
            div.className = 'budget-item';
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    <button onclick="tracker.deleteBudget('${category}')" style="background: #f44336; color: white; border: none; padding: 5px 8px; border-radius: 4px; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p>Spent: $${spent.toFixed(2)} / $${budget.toFixed(2)} (${percentage.toFixed(1)}%)</p>
                <div style="width: 100%; height: 8px; background: #e0e0e0; border-radius: 4px; margin-top: 10px;">
                    <div style="width: ${Math.min(percentage, 100)}%; height: 100%; background: ${status === 'over' ? '#f44336' : status === 'warning' ? '#ff9800' : '#4caf50'}; border-radius: 4px; transition: width 0.3s;"></div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    deleteBudget(category) {
        delete this.budgets[category];
        this.saveData();
        this.displayBudgets();
        this.showNotification(`Budget for ${category} deleted`, 'info');
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.initTheme();
        localStorage.setItem('theme', this.theme);
    }

    initTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    exportData() {
        const data = {
            transactions: this.transactions,
            budgets: this.budgets,
            goals: this.goals,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finance-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Data exported successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;

        const colors = {
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    saveData() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
        localStorage.setItem('budgets', JSON.stringify(this.budgets));
        localStorage.setItem('goals', JSON.stringify(this.goals));
    }
}

function addBudget() {
    const category = document.getElementById('budgetCategory').value.trim();
    const amount = parseFloat(document.getElementById('budgetAmount').value);

    if (!category || !amount || amount <= 0) {
        tracker.showNotification('Please enter valid budget details', 'error');
        return;
    }

    tracker.budgets[category] = amount;
    tracker.saveData();
    tracker.displayBudgets();

    document.getElementById('budgetCategory').value = '';
    document.getElementById('budgetAmount').value = '';

    tracker.showNotification(`Budget set for ${category}: $${amount}`, 'success');
}

// Add some CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the app
const tracker = new FinanceTracker();