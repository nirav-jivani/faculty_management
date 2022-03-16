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
    FILE_SIZE: 1048576,
    EXPORTED_FILENAMES :  {
        event_attended : 'event-attended',
        event_conducted : 'event-conducted',
        event_organized : 'event-organized',
        reaserch_paper_conference : 'research-conference',
        reaserch_paper_journal : 'research-journal',
    }
};

export default config;
