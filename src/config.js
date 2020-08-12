export default {
    API_ENDPOINT: (process.env.NODE_ENV==='production')
                ? process.env.REACT_APP_API_BASE_URL
                : 'http://localhost:9000/api',
    API_TOKEN: 'ab2f72b0-a93f-4f02-940b-9d8c308ae787'
}