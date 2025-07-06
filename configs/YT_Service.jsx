const { default: axios } = require("axios")

const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'

// the additional info with the url
const getVideos=async(query)=>{
    const params={ //these all are present in the documentation on console.google.com/youtube/v3
        part:'snippet', 
        q:query, //the query(python fundamentals) the thing we search in yt
        maxResults:1, // max no.of videos needed as result
        key:process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }
    const response = await axios.get(YOUTUBE_BASE_URL,{params})

    return response.data.items
}

export default {getVideos}