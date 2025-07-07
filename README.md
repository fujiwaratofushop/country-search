# country-search

>Architecture

![archoneoak drawio](https://github.com/user-attachments/assets/724fc61a-336e-4fb2-b431-c0da0fa8dde1)

>Setup Guide

>Self Evaluation

1. 🧱 Architecture & Component Design
From the beginning, I aimed for a modular, scalable, and maintainable structure. The components are separated into:

common/: Shared, reusable UI components like Card, Grid, SearchBar, SortBy, SuggestiveInput, etc. These are generic and decoupled from domain-specific logic.

semantic/: Context-specific components like CountryDetails, CountrySearchCard, NoCountryResults, which reflect the meaning and behavior of the domain.

I also used custom hooks to isolate logic-heavy operations:

useCountrySuggestions – handles user input and debounce behavior.

useCountryResults – handles fetching paginated search results based on URL params.

useCountryDetails – handles data fetching and toggling between remote/local data sources.

This separation of concerns allows for clean, testable code and easier future extension.

2. 🔁 Dynamic Data Source Support
One of the more flexible parts of the app is the CountryDetails page, which can toggle between pulling data from the REST Countries API or my local MongoDB-backed API. This is abstracted through a custom hook (useCountryDetails) that:

Accepts a flag or config to determine the data source.

Fetches data accordingly and normalizes the response.

Returns consistent output with loading/error states.

To unify both APIs, I defined a shared interface CountryAPIResponse

This ensures strong typing, consistent rendering, and safer access to optional fields across sources.

3. ⚠️ Handling Edge Cases
The app gracefully handles:

Empty/invalid search inputs – doesn’t trigger unnecessary requests.

No results found – displays a fallback message.

Missing data – uses optional chaining and fallback UI for things like missing coat of arms, TLDs, maps, or currencies.

API errors – logged internally without crashing the UI. (Improving user-facing error feedback is on my roadmap.)

4. ⚙️ Performance Optimizations
Debounced input: The suggestive input is debounced to reduce unnecessary API calls.

Optimized backend payloads: Only the necessary fields are fetched from MongoDB (or will be in future refinements).

Pagination & sorting: Supported via query params and exposed in the UI via a SortBy dropdown.

I plan to integrate client-side caching (with SWR or React Query) to further improve responsiveness and reduce load.

5. 🧰 Code Quality and Maintainability
TypeScript-first approach: All components, hooks, and API responses are typed.

Consistent naming: Components, props, and files are clearly named for discoverability.

TailwindCSS: Used consistently for utility-first, responsive styling.

Directory structure: Semantic and functional separation is followed (hooks, constants, API, components, types).

6. 🌐 Technical Breadth
This project demonstrates full-stack capability:

Frontend: Next.js + React, modular components, debounce logic, responsive design.

Backend API: Custom API routes in Next.js to query MongoDB with fuzzy search.

Database: MongoDB running locally via Docker with efficient queries and indexing.

Data abstraction: The ability to switch data sources dynamically and normalize responses.


