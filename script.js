class FinanceTracker {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.budgets = JSON.parse(localStorage.getItem('budgets')) || {};
        this.categoryChart = null;
        this.trendChart = null;
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.initCharts();
        this.initTheme();
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
    }

    initTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.initTheme();
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

        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
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
        this.updateCharts();
        document.getElementById('transactionForm').reset();
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveData();
        this.updateDisplay();
        this.updateCharts();
    }

    updateDisplay() {
        this.updateBalance();
        this.displayTransactions();
        this.displayBudgets();
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

    displayTransactions(transactionsToShow = this.transactions) {
        const container = document.getElementById('transactionsList');
        container.innerHTML = '';

        transactionsToShow.forEach(transaction => {
            const div = document.createElement('div');
            div.className = `transaction-item ${transaction.type}`;

            div.innerHTML = `
                <div class="transaction-details">
                    <h4>${transaction.description}</h4>
                    <p>${transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)} • ${new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="transaction-amount ${transaction.type}">
                        ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
                    </span>
                    <button class="delete-btn" onclick="tracker.deleteTransaction(${transaction.id})">Delete</button>
                </div>
            `;

            container.appendChild(div);
        });
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

    initCharts() {
        if (typeof Chart === 'undefined') {
            // Fallback when Chart.js is not available - create CSS-based charts
            this.createFallbackCharts();
            return;
        }

        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        const trendCtx = document.getElementById('trendChart').getContext('2d');

        this.categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                        '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
                        '#4BC0C0', '#36A2EB'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        this.trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Income',
                    data: [],
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Expenses',
                    data: [],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        this.updateCharts();
    }

    updateCharts() {
        if (typeof Chart === 'undefined') {
            this.updateFallbackCharts();
            return;
        }
        this.updateCategoryChart();
        this.updateTrendChart();
    }

    createFallbackCharts() {
        const categoryChart = document.getElementById('categoryChart');
        const trendChart = document.getElementById('trendChart');
        
        // Create fallback category chart container
        categoryChart.innerHTML = `
            <div class="fallback-chart">
                <div id="fallbackCategoryChart" class="fallback-pie-chart">
                    <div class="chart-placeholder">No expense data yet</div>
                </div>
            </div>
        `;
        
        // Create fallback trend chart container  
        trendChart.innerHTML = `
            <div class="fallback-chart">
                <div id="fallbackTrendChart" class="fallback-line-chart">
                    <div class="chart-placeholder">No trend data yet</div>
                </div>
            </div>
        `;
        
        this.updateFallbackCharts();
    }

    updateFallbackCharts() {
        this.updateFallbackCategoryChart();
        this.updateFallbackTrendChart();
    }

    updateFallbackCategoryChart() {
        const container = document.getElementById('fallbackCategoryChart');
        if (!container) return;
        
        const expenses = this.transactions.filter(t => t.type === 'expense');
        const categoryTotals = {};

        expenses.forEach(transaction => {
            categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
        });

        const categories = Object.keys(categoryTotals);
        const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

        if (categories.length === 0) {
            container.innerHTML = '<div class="chart-placeholder">No expense data yet</div>';
            return;
        }

        // Create simple bar chart representation
        const chartHtml = categories.map((category, index) => {
            const amount = categoryTotals[category];
            const percentage = ((amount / total) * 100).toFixed(1);
            const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
            const color = colors[index % colors.length];
            
            return `
                <div class="fallback-category-item">
                    <div class="category-info">
                        <span class="category-name">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                        <span class="category-amount">$${amount.toFixed(2)} (${percentage}%)</span>
                    </div>
                    <div class="category-bar">
                        <div class="category-bar-fill" style="width: ${percentage}%; background-color: ${color}"></div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="fallback-category-legend">
                ${chartHtml}
            </div>
        `;
    }

    updateFallbackTrendChart() {
        const container = document.getElementById('fallbackTrendChart');
        if (!container) return;
        
        const monthlyData = {};

        this.transactions.forEach(transaction => {
            const monthKey = new Date(transaction.date).toISOString().slice(0, 7);
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { income: 0, expenses: 0 };
            }
            monthlyData[monthKey][transaction.type === 'income' ? 'income' : 'expenses'] += transaction.amount;
        });

        const sortedMonths = Object.keys(monthlyData).sort();
        
        if (sortedMonths.length === 0) {
            container.innerHTML = '<div class="chart-placeholder">No trend data yet</div>';
            return;
        }

        const maxValue = Math.max(
            ...sortedMonths.map(month => Math.max(monthlyData[month].income, monthlyData[month].expenses))
        );

        const chartHtml = sortedMonths.map(month => {
            const data = monthlyData[month];
            const incomeHeight = maxValue > 0 ? (data.income / maxValue) * 100 : 0;
            const expenseHeight = maxValue > 0 ? (data.expenses / maxValue) * 100 : 0;
            const monthName = new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            
            return `
                <div class="trend-month">
                    <div class="trend-bars">
                        <div class="trend-bar income-bar" style="height: ${incomeHeight}%" title="Income: $${data.income.toFixed(2)}"></div>
                        <div class="trend-bar expense-bar" style="height: ${expenseHeight}%" title="Expenses: $${data.expenses.toFixed(2)}"></div>
                    </div>
                    <div class="trend-label">${monthName}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="fallback-trend-chart">
                <div class="trend-legend">
                    <span class="legend-item"><span class="legend-color income-color"></span> Income</span>
                    <span class="legend-item"><span class="legend-color expense-color"></span> Expenses</span>
                </div>
                <div class="trend-container">
                    ${chartHtml}
                </div>
            </div>
        `;
    }

    updateCategoryChart() {
        if (!this.categoryChart) return;
        const expenses = this.transactions.filter(t => t.type === 'expense');
        const categoryTotals = {};

        expenses.forEach(transaction => {
            categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
        });

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        this.categoryChart.data.labels = labels.map(label =>
            label.charAt(0).toUpperCase() + label.slice(1)
        );
        this.categoryChart.data.datasets[0].data = data;
        this.categoryChart.update();
    }

    updateTrendChart() {
        if (!this.trendChart) return;
        const monthlyData = {};

        this.transactions.forEach(transaction => {
            const monthKey = new Date(transaction.date).toISOString().slice(0, 7);
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { income: 0, expenses: 0 };
            }
            monthlyData[monthKey][transaction.type === 'income' ? 'income' : 'expenses'] += transaction.amount;
        });

        const sortedMonths = Object.keys(monthlyData).sort();
        const incomeData = sortedMonths.map(month => monthlyData[month].income);
        const expenseData = sortedMonths.map(month => monthlyData[month].expenses);

        this.trendChart.data.labels = sortedMonths.map(month => {
            const date = new Date(month + '-01');
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        });
        this.trendChart.data.datasets[0].data = incomeData;
        this.trendChart.data.datasets[1].data = expenseData;
        this.trendChart.update();
    }

    addBudget() {
        const category = document.getElementById('budgetCategory').value;
        const amount = parseFloat(document.getElementById('budgetAmount').value);

        if (category && amount) {
            this.budgets[category] = amount;
            this.saveData();
            this.displayBudgets();
            document.getElementById('budgetCategory').value = '';
            document.getElementById('budgetAmount').value = '';
        }
    }

    displayBudgets() {
        const container = document.getElementById('budgetList');
        container.innerHTML = '';

        Object.entries(this.budgets).forEach(([category, budgetAmount]) => {
            const spent = this.transactions
                .filter(t => t.type === 'expense' && t.category === category)
                .reduce((sum, t) => sum + t.amount, 0);

            const percentage = (spent / budgetAmount) * 100;
            const isOver = percentage > 100;

            const div = document.createElement('div');
            div.className = 'budget-item';
            div.innerHTML = `
                <div>
                    <strong>${category.charAt(0).toUpperCase() + category.slice(1)}</strong>
                    <p>$${spent.toFixed(2)} / $${budgetAmount.toFixed(2)} (${percentage.toFixed(1)}%)</p>
                    <div class="budget-progress">
                        <div class="budget-progress-bar ${isOver ? 'over' : ''}" 
                             style="width: ${Math.min(percentage, 100)}%"></div>
                    </div>
                </div>
                <button class="delete-btn" onclick="tracker.deleteBudget('${category}')">Remove</button>
            `;
            container.appendChild(div);
        });
    }

    deleteBudget(category) {
        delete this.budgets[category];
        this.saveData();
        this.displayBudgets();
    }

    saveData() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
        localStorage.setItem('budgets', JSON.stringify(this.budgets));
    }
}

const tracker = new FinanceTracker();

function addBudget() {
    tracker.addBudget();
}