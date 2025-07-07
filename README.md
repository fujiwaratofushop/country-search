# country-search

>Architecture

![archoneoak drawio](https://github.com/user-attachments/assets/724fc61a-336e-4fb2-b431-c0da0fa8dde1)

>Setup Guide

>Self Evaluation

1. Design and Architecture
In building this app, I focused on creating reusable and modular components. The search bar, dropdown, suggestive input, and result list are all broken down into focused, decoupled units, making them easy to maintain and reuse elsewhere. I abstracted out logic-heavy parts into custom hooks — like useCountrySuggestions and useCountryResults — so the components can remain clean and focused purely on UI.

To support maintainability and extensibility, I tried to follow a separation of concerns principle:

Presentation logic (UI rendering) is handled inside React components.

Business logic (like search debouncing, pagination, and interaction handling) is moved to hooks.

Data logic (fetching, transforming, error handling) is scoped within the backend API route and inside custom hooks.

I didn’t follow a rigid design pattern like MVC or MVVM, but the approach is still quite structured and modular. Constants like continent names, reusable enums, and types are abstracted into dedicated files. This makes it easier to swap in other data sources or fields in the future.

2. Handling Edge Cases
I was conscious about handling different types of edge cases to make the app robust and user-friendly:

For empty or invalid queries, the search input does not fire API requests unless there’s a meaningful input. It also handles "no results found" scenarios with a fallback message.

If the API throws an error or data is malformed/missing (e.g., a country is missing a flag or name), the components degrade gracefully. I use conditional rendering and optional chaining to avoid crashes.

I’ve built the UI to be resilient even if certain fields are absent in the response. This includes fallback UI text, defensive checks, and skeleton states if needed.

What I can improve is adding more visible error feedback to the user — for example, toast notifications or alerts when a network request fails.

3. Optimization and Performance
I implemented debounced API calls using useEffect and setTimeout (or a utility debounce function) to avoid excessive calls when users are typing. This improves performance and reduces load on the server.

In terms of payload size, I’ve made sure the frontend only uses what it needs. However, I could still optimize the backend MongoDB queries to only fetch specific fields (like name, code, flag) rather than the entire document.

One area I haven’t deeply implemented yet is caching or prefetching. If this were a production system, I’d likely bring in SWR or React Query to add local caching, background refetching, and prefetching for faster navigation. That’s something I’d prioritize in future iterations.

4. Code Quality and Maintainability
Throughout the codebase, I paid close attention to readability and consistent styling:

All components follow consistent structure and naming conventions.

I use TypeScript interfaces (ISearchBar, SortDropdownProps, etc.) to make my code self-documenting and type-safe.

TailwindCSS is used in a clean, utility-first way. I try to avoid excessive nesting or inline styles, which keeps styles declarative and scoped.

The project is also organized in a scalable way — hooks go in a hooks folder, components are grouped semantically, and constants/types live in their own modules. I’ve made sure that most pieces of logic can be modified or replaced independently.

Where I see room to improve is surfacing internal errors to the user (e.g., via toasts or banners), and possibly adding more unit tests or snapshot tests for critical UI components.

5. Technical Breadth
This project demonstrates my full-stack capabilities:

Frontend:
I built the UI using Next.js with React and TypeScript. I’ve used client components when necessary ('use client') and followed modern React patterns (hooks, conditional rendering, composition). The suggestive search input supports keyboard navigation, click-to-select, and dropdown highlighting.

Backend / API Integration:
I created a custom Next.js API route that queries MongoDB for country data. This route performs fuzzy matching (with regex or full-text search) and supports pagination and sorting based on client query parameters.

Data Transformation:
I ensure the data is normalized before it hits the frontend. For instance, the API only returns what’s needed (though this could be optimized further), and fields are renamed or shaped properly to suit the UI.

MongoDB + Docker:
I’ve used MongoDB running in Docker for local development. I connected to the database securely, used Mongoose (or native driver, depending on config), and built index-aware queries to keep lookups efficient.
