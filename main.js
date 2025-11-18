// StockAnalyzer Pro - Main JavaScript File
// Comprehensive functionality for modern stock analysis platform

// Global variables
let particleSystem;
let marketChart;
let mainChart;
let overviewChart;
let technicalChart;
let comparisonChart;
let sectorChart;

// Mock data for demonstration
const mockStockData = {
    topGainers: [
        { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 2149.20, change: 1.75, volume: '2.3M' },
        { symbol: 'AXISBANK', name: 'Axis Bank', price: 1265.40, change: 1.26, volume: '1.8M' },
        { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 2906.00, change: 0.78, volume: '1.2M' },
        { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 15930.00, change: 0.33, volume: '890K' },
        { symbol: 'TITAN', name: 'Titan Company', price: 3879.20, change: 0.27, volume: '1.5M' }
    ],
    topLosers: [
        { symbol: 'TECHM', name: 'Tech Mahindra', price: 1422.00, change: -2.12, volume: '2.1M' },
        { symbol: 'INFY', name: 'Infosys', price: 1486.40, change: -1.41, volume: '3.2M' },
        { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', price: 2050.20, change: -1.41, volume: '1.1M' },
        { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals', price: 7385.50, change: -1.36, volume: '650K' },
        { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 1013.60, change: -1.29, volume: '1.8M' }
    ],
    marketTicker: [
        { symbol: 'RELIANCE', price: 2847.50, change: 0.89 },
        { symbol: 'TCS', price: 4123.80, change: 1.24 },
        { symbol: 'HDFCBANK', price: 1678.90, change: -0.45 },
        { symbol: 'ICICIBANK', price: 1123.45, change: 0.67 },
        { symbol: 'HINDUNILVR', price: 2567.30, change: 0.34 },
        { symbol: 'ITC', price: 445.80, change: -0.78 },
        { symbol: 'KOTAKBANK', price: 1890.20, change: 0.56 },
        { symbol: 'SBIN', price: 678.90, change: 1.12 }
    ],
    holdings: [
        { company: 'Reliance Industries', quantity: 50, avgPrice: 2456.80, current: 2847.50, change: 15.92 },
        { company: 'TCS', quantity: 25, avgPrice: 3890.40, current: 4123.80, change: 6.00 },
        { company: 'HDFC Bank', quantity: 100, avgPrice: 1723.50, current: 1678.90, change: -2.59 },
        { company: 'Infosys', quantity: 75, avgPrice: 1423.60, current: 1486.40, change: 4.41 },
        { company: 'ICICI Bank', quantity: 150, avgPrice: 1089.20, current: 1123.45, change: 3.14 }
    ],
    watchlist: [
        { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.50, change: 0.89 },
        { symbol: 'TCS', name: 'Tata Consultancy', price: 4123.80, change: 1.24 },
        { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.90, change: -0.45 },
        { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 2149.20, change: 1.75 },
        { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 2906.00, change: 0.78 }
    ],
    news: [
        {
            title: 'RBI Maintains Repo Rate at 6.5% for Fifth Consecutive Time',
            time: '2 hours ago',
            sentiment: 'positive',
            source: 'Economic Times'
        },
        {
            title: 'Tech Stocks Rally on Strong Q3 Earnings Reports',
            time: '4 hours ago',
            sentiment: 'positive',
            source: 'Business Standard'
        },
        {
            title: 'Crude Oil Prices Surge Amid Geopolitical Tensions',
            time: '6 hours ago',
            sentiment: 'negative',
            source: 'Financial Express'
        },
        {
            title: 'India GDP Growth Expected at 7.2% for FY2025',
            time: '8 hours ago',
            sentiment: 'positive',
            source: 'Mint'
        }
    ],
    alerts: [
        { type: 'price', message: 'RELIANCE crossed ₹2,850 resistance level', time: '15 min ago' },
        { type: 'news', message: 'New analyst coverage on TCS with Buy rating', time: '1 hour ago' },
        { type: 'earnings', message: 'INFY Q3 results announcement tomorrow', time: '3 hours ago' }
    ],
    comparisonStocks: [
        { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.50, change: 0.89, marketCap: '18.2T', pe: 24.5, volume: '12.3M' },
        { symbol: 'TCS', name: 'Tata Consultancy', price: 4123.80, change: 1.24, marketCap: '15.1T', pe: 28.3, volume: '8.7M' },
        { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.90, change: -0.45, marketCap: '12.8T', pe: 18.7, volume: '15.2M' },
        { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1123.45, change: 0.67, marketCap: '7.9T', pe: 16.2, volume: '9.8M' }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initParticleSystem();
    initTypewriter();
    initScrollAnimations();
    initMarketTicker();
    initTopMovers();
    initMarketChart();
    initSearchFunctionality();
    
    // Page-specific initializations
    if (window.location.pathname.includes('dashboard.html')) {
        initDashboard();
    } else if (window.location.pathname.includes('analytics.html')) {
        initAnalytics();
    }
}

// Particle system for background animation
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter effect for hero text
function initTypewriter() {
    const heroText = document.getElementById('heroText');
    if (!heroText) return;
    
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Scroll animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Market ticker animation
function initMarketTicker() {
    const ticker = document.getElementById('marketTicker');
    if (!ticker) return;
    
    ticker.innerHTML = '';
    
    mockStockData.marketTicker.forEach(stock => {
        const tickerItem = document.createElement('div');
        tickerItem.className = 'ticker-item';
        tickerItem.innerHTML = `
            <span class="font-semibold">${stock.symbol}</span>
            <span class="ml-2">₹${stock.price.toFixed(2)}</span>
            <span class="ml-2 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}">
                ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
            </span>
        `;
        ticker.appendChild(tickerItem);
    });
}

// Top movers sections
function initTopMovers() {
    const topGainers = document.getElementById('topGainers');
    const topLosers = document.getElementById('topLosers');
    
    if (topGainers) {
        topGainers.innerHTML = '';
        mockStockData.topGainers.forEach(stock => {
            const stockElement = createStockElement(stock, 'gain');
            topGainers.appendChild(stockElement);
        });
    }
    
    if (topLosers) {
        topLosers.innerHTML = '';
        mockStockData.topLosers.forEach(stock => {
            const stockElement = createStockElement(stock, 'loss');
            topLosers.appendChild(stockElement);
        });
    }
}

function createStockElement(stock, type) {
    const div = document.createElement('div');
    div.className = 'flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer';
    div.innerHTML = `
        <div>
            <div class="font-semibold">${stock.symbol}</div>
            <div class="text-sm text-gray-400">${stock.name}</div>
        </div>
        <div class="text-right">
            <div class="font-semibold">₹${stock.price.toFixed(2)}</div>
            <div class="text-sm ${type === 'gain' ? 'text-green-400' : 'text-red-400'}">
                ${type === 'gain' ? '+' : ''}${stock.change.toFixed(2)}%
            </div>
        </div>
    `;
    return div;
}

// Market chart initialization
function initMarketChart() {
    const chartContainer = document.getElementById('marketChart');
    if (!chartContainer) return;
    
    marketChart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' },
            splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [{
            name: 'SENSEX',
            type: 'line',
            data: [65000, 66200, 67800, 68400, 69200, 68800, 70500, 71200, 69800, 71500, 67847, 68200],
            smooth: true,
            lineStyle: {
                color: '#00D4FF',
                width: 3
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
                    ]
                }
            }
        }],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00D4FF',
            textStyle: { color: '#FFFFFF' }
        }
    };
    
    marketChart.setOption(option);
    
    // Responsive resize
    window.addEventListener('resize', () => {
        marketChart.resize();
    });
}

// Search functionality
function initSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            }
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(e.target.value);
            }
        });
    });
}

function performSearch(query) {
    console.log('Searching for:', query);
    // Add search animation and redirect to dashboard
    anime({
        targets: '.search-input',
        scale: [1, 1.05, 1],
        duration: 300,
        easing: 'easeInOutQuad'
    });
    
    // Simulate search and redirect
    setTimeout(() => {
        if (!window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'dashboard.html';
        }
    }, 500);
}

// Dashboard initialization
function initDashboard() {
    initHoldingsTable();
    initWatchlist();
    initAlerts();
    initNews();
    initMainChart();
    initSectorChart();
    updateDashboardMetrics();
}

function initHoldingsTable() {
    const table = document.getElementById('holdingsTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    mockStockData.holdings.forEach(holding => {
        const row = document.createElement('div');
        row.className = 'stock-row';
        const pnlColor = holding.change >= 0 ? 'text-green-400' : 'text-red-400';
        const pnlSign = holding.change >= 0 ? '+' : '';
        
        row.innerHTML = `
            <div class="font-semibold">${holding.company}</div>
            <div>${holding.quantity}</div>
            <div>₹${holding.avgPrice.toFixed(2)}</div>
            <div>₹${holding.current.toFixed(2)}</div>
            <div class="${pnlColor}">${pnlSign}${holding.change.toFixed(2)}%</div>
        `;
        table.appendChild(row);
    });
}

function initWatchlist() {
    const watchlist = document.getElementById('watchlist');
    if (!watchlist) return;
    
    watchlist.innerHTML = '';
    
    mockStockData.watchlist.forEach(stock => {
        const item = document.createElement('div');
        item.className = 'watchlist-item';
        const changeColor = stock.change >= 0 ? 'text-green-400' : 'text-red-400';
        const changeSign = stock.change >= 0 ? '+' : '';
        
        item.innerHTML = `
            <div class="flex-1">
                <div class="font-semibold text-sm">${stock.symbol}</div>
                <div class="text-xs text-gray-400">${stock.name}</div>
            </div>
            <div class="text-right">
                <div class="font-semibold text-sm">₹${stock.price.toFixed(2)}</div>
                <div class="text-xs ${changeColor}">${changeSign}${stock.change.toFixed(2)}%</div>
            </div>
        `;
        watchlist.appendChild(item);
    });
}

function initAlerts() {
    const alerts = document.getElementById('alertsList');
    if (!alerts) return;
    
    alerts.innerHTML = '';
    
    mockStockData.alerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = 'alert-item';
        item.innerHTML = `
            <div class="font-semibold text-sm mb-1">${alert.message}</div>
            <div class="text-xs text-gray-400">${alert.time}</div>
        `;
        alerts.appendChild(item);
    });
}

function initNews() {
    const news = document.getElementById('marketNews');
    if (!news) return;
    
    news.innerHTML = '';
    
    mockStockData.news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        const sentimentClass = `sentiment-${item.sentiment}`;
        
        newsItem.innerHTML = `
            <h4 class="font-semibold mb-2">${item.title}</h4>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-400">${item.source}</span>
                <span class="text-sm ${sentimentClass}">${item.time}</span>
            </div>
        `;
        news.appendChild(newsItem);
    });
}

function initMainChart() {
    const chartContainer = document.getElementById('mainChart');
    if (!chartContainer) return;
    
    mainChart = echarts.init(chartContainer);
    
    const dates = [];
    const values = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        dates.push(date.toISOString().split('T')[0]);
        values.push(67000 + Math.random() * 3000);
    }
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF', show: false }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' },
            splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [{
            name: 'Portfolio Value',
            type: 'line',
            data: values,
            smooth: true,
            lineStyle: {
                color: '#00D4FF',
                width: 2
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.2)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.02)' }
                    ]
                }
            }
        }],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00D4FF',
            textStyle: { color: '#FFFFFF' }
        }
    };
    
    mainChart.setOption(option);
}

function initSectorChart() {
    const chartContainer = document.getElementById('sectorChart');
    if (!chartContainer) return;
    
    sectorChart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00D4FF',
            textStyle: { color: '#FFFFFF' }
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: [
                { value: 35, name: 'Technology', itemStyle: { color: '#00D4FF' } },
                { value: 20, name: 'Banking', itemStyle: { color: '#10B981' } },
                { value: 15, name: 'Healthcare', itemStyle: { color: '#F59E0B' } },
                { value: 12, name: 'Energy', itemStyle: { color: '#EF4444' } },
                { value: 10, name: 'Consumer', itemStyle: { color: '#8B5CF6' } },
                { value: 8, name: 'Others', itemStyle: { color: '#6B7280' } }
            ],
            label: {
                color: '#FFFFFF',
                fontSize: 12
            },
            labelLine: {
                lineStyle: { color: '#4B5563' }
            }
        }]
    };
    
    sectorChart.setOption(option);
}

function updateDashboardMetrics() {
    // Simulate real-time updates
    setInterval(() => {
        const portfolioValue = document.getElementById('portfolioValue');
        const dayChange = document.getElementById('dayChange');
        const totalReturn = document.getElementById('totalReturn');
        
        if (portfolioValue) {
            const currentValue = parseFloat(portfolioValue.textContent.replace(/[₹,]/g, ''));
            const newValue = currentValue + (Math.random() - 0.5) * 1000;
            portfolioValue.textContent = `₹${newValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
        }
    }, 5000);
}

// Analytics initialization
function initAnalytics() {
    initFilterTabs();
    initOverviewChart();
    initTechnicalChart();
    initComparisonTable();
    initComparisonChart();
    initSectorDetails();
}

function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const sections = document.querySelectorAll('.analysis-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.add('hidden'));
            
            // Show selected section
            const filter = tab.dataset.filter;
            const targetSection = document.getElementById(`${filter}-section`);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        });
    });
}

function initOverviewChart() {
    const chartContainer = document.getElementById('overviewChart');
    if (!chartContainer) return;
    
    overviewChart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' },
            splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [
            {
                name: 'NIFTY 50',
                type: 'line',
                data: [19500, 19800, 20100, 19900, 20500, 20123],
                smooth: true,
                lineStyle: { color: '#00D4FF', width: 3 },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                            { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
                        ]
                    }
                }
            },
            {
                name: 'SENSEX',
                type: 'line',
                data: [66000, 67000, 68000, 67500, 69000, 67847],
                smooth: true,
                lineStyle: { color: '#10B981', width: 2 }
            }
        ],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00D4FF',
            textStyle: { color: '#FFFFFF' }
        },
        legend: {
            data: ['NIFTY 50', 'SENSEX'],
            textStyle: { color: '#FFFFFF' },
            top: 10
        }
    };
    
    overviewChart.setOption(option);
}

function initTechnicalChart() {
    const chartContainer = document.getElementById('technicalChart');
    if (!chartContainer) return;
    
    technicalChart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' },
            splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [{
            name: 'Price',
            type: 'candlestick',
            data: [
                [2800, 2850, 2780, 2840],
                [2840, 2880, 2820, 2860],
                [2860, 2890, 2840, 2870],
                [2870, 2910, 2850, 2900],
                [2900, 2920, 2880, 2910]
            ],
            itemStyle: {
                color: '#10B981',
                color0: '#EF4444',
                borderColor: '#10B981',
                borderColor0: '#EF4444'
            }
        }],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00D4FF',
            textStyle: { color: '#FFFFFF' }
        }
    };
    
    technicalChart.setOption(option);
}

function initComparisonTable() {
    const table = document.getElementById('comparisonTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    mockStockData.comparisonStocks.forEach(stock => {
        const row = document.createElement('div');
        row.className = 'comparison-row';
        const changeColor = stock.change >= 0 ? 'text-green-400' : 'text-red-400';
        const changeSign = stock.change >= 0 ? '+' : '';
        
        row.innerHTML = `
            <div class="font-semibold">${stock.symbol}<br><span class="text-xs text-gray-400">${stock.name}</span></div>
            <div>₹${stock.price.toFixed(2)}</div>
            <div class="${changeColor}">${changeSign}${stock.change.toFixed(2)}%</div>
            <div>${stock.marketCap}</div>
            <div>${stock.pe}</div>
            <div>${stock.volume}</div>
        `;
        table.appendChild(row);
    });
}

function initComparisonChart() {
    const chartContainer = document.getElementById('comparisonChart');
    if (!chartContainer) return;
    
    comparisonChart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: mockStockData.comparisonStocks.map(s => s.symbol),
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#4B5563' } },
            axisLabel: { color: '#9CA3AF' },
            splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [{
            name: 'Current Price',
            type: 'bar',
            data: mockStockData.comparisonStocks.map(s => s.price),
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: '#00D4FF' },
                        { offset: 1, color: '#0099CC' }
                    ]
                }
            }
        }],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00D4FF',
            textStyle: { color: '#FFFFFF' }
        }
    };
    
    comparisonChart.setOption(option);
}

function initSectorDetails() {
    const container = document.getElementById('sectorDetails');
    if (!container) return;
    
    const sectors = [
        { name: 'Technology', performance: 12.5, stocks: 45, topStock: 'TCS' },
        { name: 'Banking', performance: 8.3, stocks: 25, topStock: 'HDFCBANK' },
        { name: 'Healthcare', performance: 15.2, stocks: 30, topStock: 'APOLLOHOSP' },
        { name: 'Energy', performance: -2.1, stocks: 20, topStock: 'RELIANCE' },
        { name: 'Consumer', performance: 5.7, stocks: 35, topStock: 'HINDUNILVR' }
    ];
    
    container.innerHTML = '';
    
    sectors.forEach(sector => {
        const item = document.createElement('div');
        item.className = 'technical-indicator';
        const performanceColor = sector.performance >= 0 ? 'text-green-400' : 'text-red-400';
        const performanceSign = sector.performance >= 0 ? '+' : '';
        
        item.innerHTML = `
            <div>
                <div class="font-semibold">${sector.name}</div>
                <div class="text-xs text-gray-400">${sector.stocks} stocks</div>
            </div>
            <div class="text-right">
                <div class="${performanceColor} font-semibold">${performanceSign}${sector.performance.toFixed(1)}%</div>
                <div class="text-xs text-gray-400">${sector.topStock}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(amount);
}

function formatPercentage(value) {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}

// Resize charts on window resize
window.addEventListener('resize', () => {
    if (marketChart) marketChart.resize();
    if (mainChart) mainChart.resize();
    if (overviewChart) overviewChart.resize();
    if (technicalChart) technicalChart.resize();
    if (comparisonChart) comparisonChart.resize();
    if (sectorChart) sectorChart.resize();
});

// Export functions for global access
window.performSearch = performSearch;