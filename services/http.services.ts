import { getErrorMessage } from "../helper/utils";
import Axios from "axios";
import { getCookie, setCookie } from "../helper/cookie";
import axios from "axios";
import { error } from "console";

// readonly properties
const TOKEN_STORAGE_KEY = "spotifyToken";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"; // Ensure it's correct

export class httpmethod {
  static GET = "get";
  static POST = "post";
  static PUT = "put";
  static DELETE = "delete";
  static PATCH = "patch";
}
const http: any = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export let httpToken = "";
export const setJwt = (jwt: any) => {
  httpToken = `Bearer ${jwt}`;
  Axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
};

export const execute = async (
  url: string,
  method: any = httpmethod.GET,
  data: any = undefined,
  config: any = {},
): Promise<any> => {
  try {
    const _token =
      getCookie(TOKEN_STORAGE_KEY) || "";
    if (_token) {
      setJwt(_token);
    }

    if (!config.headers) {
      config.headers = {};
    }
    if (httpToken !== "") {
      config.headers.Authorization = httpToken;
    }

    let response;
    if (method === httpmethod.GET) {
      response = await http.get(url, config);
    } else if (method === httpmethod.DELETE) {
      response = await http[method](url, { ...config, data });
    } else {
      response = await http[method](url, data, config);
    }
    console.log("response",response);
    return response;
  } catch (e: any) {
    let response = e.response;
    if (response && response.status !== 500) {
      return {
        error: true,
        message:
          getErrorMessage(response.data.message) ||
          getErrorMessage(response.data.description) ||
          "Something went wrong",
      };
    }
    return { error: true, message: "Something went wrong" };
  }
};

/**
 * Fetch Spotify API Token and store in a cookie
 */
export const getSpotifyToken = async (): Promise<any> => {
    try {
      // Check if token already exists in the cookie
      const cachedToken = getCookie(TOKEN_STORAGE_KEY);
      if (cachedToken) {
        return { access_token: cachedToken };
      }
  
      // Fetch new token if not found in cookie
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  
      if (!clientId || !clientSecret) {
        throw new Error("Missing Spotify credentials");
      }
  
      const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
      const data = new URLSearchParams({ grant_type: "client_credentials" }).toString();
  
      // Use execute function to make request
      const response = await execute(`${process.env.NEXT_PUBLIC_API_URL}`, httpmethod.POST, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      console.log(response);
      if (response.error) {
        throw new Error(response.message);
      }
      const { access_token, expires_in } = response.data;
        // Set JWT for Axios
      setJwt(access_token);

        // Store token in cookie with expiry time
        setCookie(TOKEN_STORAGE_KEY, access_token);

  
      return {
        access_token: response.data.access_token,
        expires_in: response.data.expires_in,
      };
    } catch (error: any) {
      console.error("Error fetching Spotify token:", error.message);
      return { error: error.message };
    }
  };

  export const getNewReleases = async () => {
    try {
      const tokenResponse = await getSpotifyToken();
      console.log(tokenResponse);   
      if (tokenResponse.error) {
        throw new Error(tokenResponse.error);
      }
    //   const newReleasesApi = process.env.NEXT_SPOTIFY_API_BASE_URL;
    const newReleasesApi ='https://api.spotify.com/v1';
      const token = await getSpotifyToken();
         const  response  = await axios.get(
          `${newReleasesApi}/browse/new-releases`,
          { headers: { Authorization: `Bearer ${token.access_token}` } }
        );
        console.log(response);
      if (response.error) {
        console.log(response.error);
        throw new Error(response.message);
      }
  
      return response.data.albums.items; // Get only the top 10 new releases
    } catch (error: any) {
      console.error("Error fetching new releases:", error.message);
      return { error: error.message };
    }
  };

//   export const getFeaturedPlayList = async () => {
//     try {
//       const tokenResponse = await getSpotifyToken();
//       console.log(tokenResponse);   
//       if (tokenResponse.error) {
//         throw new Error(tokenResponse.error);
//       }
//     //   const newReleasesApi = process.env.NEXT_SPOTIFY_API_BASE_URL;
//     const newReleasesApi ='https://api.spotify.com/v1';
//       const token = await getSpotifyToken();
//          const  response  = await axios.get(
//           `${newReleasesApi}/browse/featured-playlists`,
//           { headers: { Authorization: `Bearer ${token.access_token}` } }
//         );
//         console.log(response);
//       if (response.error) {
//         console.log(response.error);
//         throw new Error(response.message);
//       }
  
//     //   return response.data.albums.items.slice(0, 14); // Get only the top 10 new releases
//     } catch (error: any) {
//       console.error("Error fetching new releases:", error.message);
//       return { error: error.message };
//     }
//   };

export const getFeaturedPlaylists = async () => {
    try {
      const tokenResponse = await getSpotifyToken();
      if (tokenResponse.error) {
        throw new Error(tokenResponse.error);
      }
      const newReleasesApi ='https://api.spotify.com/v1';
      const response = await axios.get(`${newReleasesApi}/browse/featured-playlists`, {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
  
      if (response.status !== 200) {
        throw new Error("Failed to fetch Featured Playlists");
      }
  
      return response.data.playlists.items.slice(0, 10); // Get only the top 10 playlists
    } catch (error: any) {
      console.error("Error fetching Featured Playlists:", error.message);
      return { error: error.message };
    }
  };

  export const getBrowseGenres = async () => {
    try {
      const tokenResponse = await getSpotifyToken();
      if (tokenResponse.error) {
        throw new Error(tokenResponse.error);
      }
  
      const response = await axios.get(`${SPOTIFY_API_BASE_URL}/browse/categories`, {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
  
      if (response.status !== 200) {
        throw new Error("Failed to fetch Browse Genres");
      }
  
      return response.data.categories.items; // Returns genre categories
    } catch (error: any) {
      console.error("Error fetching Browse Genres:", error.message);
      return { error: error.message };
    }
  };    