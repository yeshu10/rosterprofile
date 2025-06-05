This document outlines the core flow, component structure, state management, and scalability of the Roster Profile application, with emphasis on the /submit route.
 
  Deployed LINK :https://rosteruserprofile.vercel.app/
  API DOCUMNETATION :https://app.swaggerhub.com/apis-docs/justforlearning-b6e/rosterprofile/1.1.0
  video walk through: https://drive.google.com/drive/folders/1jHraiA6qic7ipxY4U7SL5MTLSw86diDr?usp=sharing

1. User Flow

Step 1: Landing Page (/)

A simple introductory page with a typing animation.

Purpose: Provides a clean entry point into the application.

Users are guided or redirected to the next route.

Step 2: Submit Page (/submit)

This route allows users to submit their personal portfolio link for parsing and profile generation.

Actions:
User Enters Portfolio Link:

Input field to paste external portfolio URL (e.g., from Canva, Behance, etc.).

Link is validated before submission.

Step 3: Parsing and Temporary Profile Preview

Once the user submits their portfolio link on /submit, the following sequence occurs:

Validation: The input URL is validated client-side to ensure it meets standard URL format criteria.

API Call Triggered: On submission, a request is sent to a mock endpoint (/api/portfolio/parse), simulating the parsing of the provided external portfolio site.

Data Extraction: The mock API returns structured portfolio data, including:

Basic information (name, intro, about me)

Experience entries (clients, roles, durations, descriptions)

Projects (thumbnails, titles, tech stacks, links)

Loading & Error States: While waiting for the response, a loading spinner is shown. If the parsing fails (invalid URL or server issue), an error message is rendered.

State Update:

The Redux store is updated using parsePortfolioSuccess action with the parsed profile data.

UI state slices are also initialized (e.g., modal states, active menu item, visible experiences count).

Profile Preview Display: Once the state is updated, the user is shown a generated profile preview on the same route (/submit). This preview closely resembles the actual profile page, composed dynamically from the parsed data.


2. State Management in Submit Flow
The same Redux Toolkit store is used:

profileSlice:

Stores parsed profile data (setProfileData) returned from the parse API.

Dispatches async thunk (createProfile) to store final data via mock create endpoint.

modalSlice & uiSlice:

Can be reused here if modals (e.g., for editing parsed sections) are introduced.

Redux Flow:

User submits URL → Dispatch parseProfileThunk

Response stored via setProfileData

On confirm → Dispatch createProfileThunk

Redirect to /profile/[username]

3. Scalability Considerations (Submit Flow)

Backend Integration:

Real Parsing Backend: Replace the mock /parse route with a real service capable of scraping and structuring portfolio data securely.

Draft Profile Saving: Allow saving parsed data as a draft before final submission.

User Authentication: Add auth to tie submitted profiles to user accounts for updates and privacy control.

Image/File Uploads: Enhance profile richness by allowing users to upload missing assets if not parsed.

Multi-Stage Editing: Let users confirm, edit, and enrich parsed data before publishing their profile.


Tool Chat Gpt
AI Prompts 

Generate a placeholder mock API response for user portfolio data using TypeScript interfaces.

To reduce API call frequency, I requested a debounced input handler via AI. I then refined it to handle edge cases and added loading states, improving performance and user experience without relying solely on the AI output.

I used AI to quickly generate boilerplate code for a Redux slice using @reduxjs/toolkit. This helped speed up setup, but I customized the reducers, initial state, and action naming to better align with project logic and scalability needs.

To get direct urls of dummy image 



