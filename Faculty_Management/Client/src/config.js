const config = {
    // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/Home/index',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    API_SERVER: 'http://localhost:5000/api/',
    EVENT_TYPES: ['FDP', 'Workshop', 'Seminar', 'STTP', 'Conference', 'AnyOther'],
    EVENT_LEVELS: ['Local', 'National', 'International'],
    PUBLICATION_LEVELS: ['National', 'International'],
    FILE_SIZE: 1048576
};

export default config;
