# Country Search

## Features

- 🌍 Country search with fuzzy matching
- 📦 MongoDB-powered backend API
- 🔁 Toggle between REST API and local DB
- 📜 Infinite scroll with IntersectionObserver
- 🔎 Suggestive input with debounce

## Architecture

![archoneoak drawio](https://github.com/user-attachments/assets/9b664f94-0276-43ec-bb20-47985904ba9d)

## Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/fujiwaratofushop/country-search.git
cd country-search
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using Yarn:
```bash
yarn install
```

### 3. Start MongoDB Locally

Ensure MongoDB is running on your system. If installed locally, you can start it using:

```bash
mongod
```

OR

If using docker:

```bash
docker run -d \
  --name country-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_DATABASE=mongodb \
  mongo
```

By default, it connects to `mongodb://localhost:27017`.

### 4. Verify .env.local

Your environment variables should already be set as:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DBNAME=mongodb
```

✅ No need to modify if `.env.local` is already present in the project.

### 5. Seed the Database

Populate the database with country data:

```bash
npm run seed
```

This command connects to the local MongoDB instance and inserts necessary data.

### 6. Start the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Self Evaluation

### 1. 🧱 Architecture & Component Design

From the beginning, I aimed for a modular, scalable, and maintainable structure. The components are separated into:

- **`common/`**: Shared, reusable UI components like Card, Grid, SearchBar, SortBy, SuggestiveInput, etc. These are generic and decoupled from domain-specific logic.

- **`semantic/`**: Context-specific components like CountryDetails, CountrySearchCard, NoCountryResults, which reflect the meaning and behavior of the domain.

I also used custom hooks to isolate logic-heavy operations:

- **`useCountrySuggestions`** – handles user input and debounce behavior.
- **`useCountryResults`** – handles fetching paginated search results based on URL params, and supports fuzzy matching via backend API.
- **`useCountryDetails`** – handles data fetching and toggling between remote/local data sources.
- **`useInfiniteScrollObserver`** – reusable hook to make scrollable containers infinite scroll.

This separation of concerns allows for clean, testable code and easier future extension.

### 2. 🔁 Dynamic Data Source Support

One of the more flexible parts of the app is the CountryDetails page, which can toggle between pulling data from the REST Countries API or my local MongoDB-backed API. This is abstracted through a custom hook, `useCountryDetails`, that:

- Accepts a configurable endpoint (either external or local).
- Optionally accepts a flattening function to shape the data for UI consumption.
- Fetches data accordingly and returns a normalized response.
- Provides consistent loading and error states, keeping the component logic clean.

Instead of relying on a raw shared API response type, I defined a `CountryDetailsCardProps` interface, which represents the flattened and display-ready version of country details. This ensures:

✅ Strong typing across different data sources  
✅ Consistent rendering of the country detail UI  
✅ Safer handling of optional or nested fields like maps, coatOfArms, or currencies

### 3. ⚠️ Handling Edge Cases

The app gracefully handles:

- **Empty/invalid search inputs** – doesn't trigger unnecessary requests.
- **No results found** – displays a fallback message.
- **Missing data** – uses optional chaining and fallback UI for things like missing coat of arms, TLDs, maps, or currencies.
- **API errors** – logged internally without crashing the UI. (Improving user-facing error feedback is on my roadmap.)

Errors and Loading are wrapped in common reusable components/containers.

### 4. ⚙️ Performance Optimizations

- **Debounced input**: The suggestive input is debounced to reduce unnecessary API calls.
- **Optimized backend payloads**: Only the necessary fields are fetched from MongoDB (or will be in future refinements).
- **Pagination & sorting**: Supported via query params and exposed in the UI via a SortBy dropdown.

I plan to integrate client-side caching (with SWR or React Query) to further improve responsiveness and reduce load.

### 5. 🧰 Code Quality and Maintainability

- **TypeScript-first approach**: All components, hooks, and API responses are typed.
- **Consistent naming**: Components, props, and files are clearly named for discoverability.
- **TailwindCSS**: Used consistently for utility-first, responsive styling.
- **Directory structure**: Semantic and functional separation is followed (hooks, constants, API, components, types).

### 6. 🌐 Technical Breadth

This project demonstrates full-stack capability:

- **Frontend**: Next.js + React, modular components, debounce logic, responsive design.
- **Backend API**: Custom API routes in Next.js to query MongoDB with fuzzy search.
- **Database**: MongoDB running locally via Docker with efficient queries and indexing.
- **Data abstraction**: The ability to switch data sources dynamically and normalize responses.
