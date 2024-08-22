const ticker = document.getElementById('ticker');
const apiKey = 'YOUR_API_KEY'; // Replace with your Alpha Vantage API key
const symbol = 'STLD'; // The stock symbol you're interested in
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${94RSQM75LXBGQTDC
}`;

async function fetchStockData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Check if the data contains expected fields
        if (data['Time Series (5min)']) {
            updateTicker(data);
        } else {
            console.error('Unexpected data format:', data);
            ticker.innerHTML = `<div>Error: Unable to fetch stock data.</div>`;
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        ticker.innerHTML = `<div>Error: Unable to fetch stock data.</div>`;
    }
}

function updateTicker(data) {
    // Extract the time series data
    const timeSeries = data['Time Series (5min)'];
    
    if (timeSeries && Object.keys(timeSeries).length > 0) {
        // Get the latest time entry
        const latestTime = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTime];
        
        // Display the latest data
        ticker.innerHTML = `
            <div>Symbol: ${data['Meta Data']['2. Symbol']}</div>
            <div>Time: ${latestTime}</div>
            <div>Open: ${latestData['1. open']} USD</div>
            <div>High: ${latestData['2. high']} USD</div>
            <div>Low: ${latestData['3. low']} USD</div>
            <div>Close: ${latestData['4. close']} USD</div>
            <div>Volume: ${latestData['5. volume']}</div>
        `;
    } else {
        console.error('No time series data found:', timeSeries);
        ticker.innerHTML = `<div>No data available.</div>`;
    }
}

// Fetch stock data initially
fetchStockData();

// Update the stock data every 60 seconds
setInterval(fetchStockData, 60000);
