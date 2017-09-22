export const PORT =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_HOST
        : 'your variable';