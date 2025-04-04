# Home Page – Spotify Clone

This file represents the **HomePage** component of a Spotify clone application. It is rendered at the `/home` route and allows users to view different types of Spotify data such as:

- **New Releases**
- **Featured Playlist**
- **Browse Genres**

## 📂 File Path
`/app/home/page.tsx`

## 🧠 Features

- Fetches a Spotify access token on component mount.
- Displays different data views based on user selection.
- Implements a responsive layout with a mobile-friendly menu.
- Automatically loads "New Releases" as the default view.
- Highlights active views in the menu.

## 🚧 Known Issues

### ❌ Featured Playlist Not Working

The **"Featured Playlist"** view is currently non-functional. Possible reasons include:

- The API route used in `getFeaturedPlaylists()` might be deprecated or incorrect.
- Spotify API access might require different scopes or an updated token.
- Network or permission errors are preventing proper data retrieval.

### 🔍 Recommendations

- Check the implementation of the `getFeaturedPlaylists()` function in `services/http.services.ts`.
- Refer to the latest [Spotify Web API documentation](https://developer.spotify.com/documentation/web-api/) for the correct endpoint.
- Use Postman or browser dev tools to test the endpoint manually.
- Ensure the token has sufficient scopes to access featured playlists.

## 📍 Route

The component is available at:



## 🗂 Related Files

- `services/http.services.ts` – for Spotify API utility methods
- `styles.scss` – for component styling
- `HomePage.tsx` – this component file
