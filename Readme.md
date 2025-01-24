# Portfolio Analytics Dashboard

This is a Portfolio Analytics Dashboard built using Next.js for the frontend, Node.js/Express for the backend, and MongoDB as the database. The dashboard allows users to monitor their investment strategies, analyze market data, and view key metrics with interactive visualizations.

---

## Features

### Core Features:

1. **Dynamic Charts:**

   - Portfolio growth over time.
   - Asset allocation by class.
   - Profit/Loss per strategy.

2. **Key Metrics View:**

   - Total Portfolio Value.
   - Daily P&L (Profit & Loss).
   - Win Rate.

3. **Filtering and Sorting:**
   - Filter data by date range.
   - Sort data by performance metrics.

### Fintech-Specific Features:

1. **Strategy Performance Report:**

   - ROI (Return on Investment).
   - CAGR (Compound Annual Growth Rate).
   - Drawdown Percentage.

2. **Market Updates:**
   - Section displaying recent trades and market trends.

### Optional Bonus:

- Compare performance of multiple strategies side by side.

---

## Tech Stack

- **Frontend:** Next.js
- **Backend:** Node.js/Express
- **Database:** MongoDB

---

## Setup Instructions

### Prerequisites:

1. Node.js installed on your system.
2. MongoDB instance or Atlas cluster set up.

### Steps to Run the Application Locally:

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd portfolio-analytics-dashboard
   ```

2. **Install Dependencies:**

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd backend
     npm install
     ```

3. **Set Environment Variables:**

   - Create a `.env` file in the `backend` folder and configure the following variables:
     ```env
     PORT=5000
     MONGO_URI=<your-mongo-db-uri>
     ```

4. **Run the Backend:**

   ```bash
   cd backend
   npm start
   ```

   The backend will be available at `http://localhost:5000`.

5. **Run the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

---

## Directory Structure

```
portfolio-analytics-dashboard/
├── frontend/       # Frontend application (Next.js)
├── backend/        # Backend API (Node.js/Express)
├── README.md       # Project documentation
```

---

## Dummy Data

- Dummy financial data is used for:
  - Strategy performance.
  - Portfolio allocation.
  - Recent trades.
- Data is stored as a JSON file in the `backend/data/` directory for initial testing.

---

## Key Functionalities

### Date Picker:

- Allows users to filter data by selecting date ranges.
- Ensure responsiveness and interactivity for filtering.

### Visualizations:

- Charts are built using libraries like `chart.js` or `recharts`.

### Strategy Comparison:

- Compare multiple strategies side by side with detailed performance metrics.

---

## Issues and Improvements

### Known Issues:

- **Date Picker:** Currently unresponsive. Ensure that data updates dynamically when a date range is selected.

### Future Improvements:

1. Add user authentication.
2. Enable live market data integration via APIs.
3. Implement advanced analytics and projections.

---

## License

This project is licensed under the MIT License.
