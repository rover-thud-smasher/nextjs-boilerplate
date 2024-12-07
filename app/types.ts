export interface Welcome {
    leagues:    League[];
    groups:     string[];
    events:     Event[];
    eventsDate: EventsDate;
}

export interface Event {
    id:           string;
    uid:          string;
    date:         string;
    name:         string;
    shortName:    string;
    season:       EventSeason;
    competitions: Competition[];
    links:        EventLink[];
    status:       Status;
}

export interface Competition {
    id:                    string;
    uid:                   string;
    date:                  string;
    attendance:            number;
    type:                  CompetitionType;
    timeValid:             boolean;
    neutralSite:           boolean;
    conferenceCompetition: boolean;
    playByPlayAvailable:   boolean;
    recent:                boolean;
    venue:                 Venue;
    competitors:           Competitor[];
    notes:                 Note[];
    status:                Status;
    broadcasts:            Broadcast[];
    tournamentId?:         number;
    format:                Format;
    startDate:             string;
    broadcast:             string;
    geoBroadcasts:         GeoBroadcast[];
    highlights:            Highlight[];
    situation?:            Situation;
    headlines?:            Headline[];
    tickets?:              Ticket[];
    odds?:                 Odd[];
}

export interface Broadcast {
    market: MarketEnum;
    names:  string[];
}

export enum MarketEnum {
    Home = "home",
    National = "national",
}

export interface Competitor {
    id:          string;
    uid:         string;
    type:        TypeElement;
    order:       number;
    homeAway:    HomeAway;
    winner?:     boolean;
    team:        CompetitorTeam;
    score:       string;
    linescores?: Linescore[];
    curatedRank: CuratedRank;
    statistics:  Statistic[];
    records?:    Record[];
    leaders?:    CompetitorLeader[];
}

export interface CuratedRank {
    current: number;
}

export enum HomeAway {
    Away = "away",
    Home = "home",
}

export interface CompetitorLeader {
    name:             LeaderName;
    displayName:      DisplayName;
    shortDisplayName: ShortDisplayName;
    abbreviation:     LeaderAbbreviation;
    leaders:          LeaderLeader[];
}

export enum LeaderAbbreviation {
    AST = "Ast",
    AbbreviationAST = "AST",
    AbbreviationPTS = "PTS",
    AbbreviationREB = "REB",
    Pts = "Pts",
    Rat = "RAT",
    Reb = "Reb",
}

export enum DisplayName {
    Assists = "Assists",
    AssistsPerGame = "Assists Per Game",
    Points = "Points",
    PointsPerGame = "Points Per Game",
    Rating = "Rating",
    Rebounds = "Rebounds",
    ReboundsPerGame = "Rebounds Per Game",
}

export interface LeaderLeader {
    displayValue: string;
    value:        number;
    athlete:      Athlete;
    team:         VenueClass;
}

export interface Athlete {
    id:          string;
    fullName:    string;
    displayName: string;
    shortName:   string;
    links:       AthleteLink[];
    headshot?:   string;
    jersey:      string;
    position:    Position;
    team:        VenueClass;
    active:      boolean;
}

export interface AthleteLink {
    rel:  PurpleRel[];
    href: string;
}

export enum PurpleRel {
    Athlete = "athlete",
    Desktop = "desktop",
    Playercard = "playercard",
}

export interface Position {
    abbreviation: Tion;
}

export enum Tion {
    Ath = "ATH",
    C = "C",
    F = "F",
    G = "G",
    PG = "PG",
}

export interface VenueClass {
    id: string;
}

export enum LeaderName {
    Assists = "assists",
    AssistsPerGame = "assistsPerGame",
    Points = "points",
    PointsPerGame = "pointsPerGame",
    Rating = "rating",
    Rebounds = "rebounds",
    ReboundsPerGame = "reboundsPerGame",
}

export enum ShortDisplayName {
    AST = "Ast",
    Apg = "APG",
    Ppg = "PPG",
    Pts = "Pts",
    RPG = "RPG",
    Rat = "RAT",
    Reb = "Reb",
}

export interface Linescore {
    value: number;
}

export interface Record {
    name:          RecordName;
    abbreviation?: RecordAbbreviation;
    type:          RecordType;
    summary:       string;
}

export enum RecordAbbreviation {
    Away = "AWAY",
    Game = "Game",
    Home = "Home",
    Season = "Season",
    VsConf = "VS CONF",
}

export enum RecordName {
    Home = "Home",
    Overall = "overall",
    Road = "Road",
    VsConf = "vs. Conf.",
}

export enum RecordType {
    Home = "home",
    Road = "road",
    Total = "total",
    Vsconf = "vsconf",
}

export interface Statistic {
    name:              StatisticName;
    abbreviation:      StatisticAbbreviation;
    displayValue:      string;
    rankDisplayValue?: string;
}

export enum StatisticAbbreviation {
    AST = "AST",
    Fg = "FG%",
    Fga = "FGA",
    Fgm = "FGM",
    Ft = "FT%",
    Fta = "FTA",
    Ftm = "FTM",
    Pts = "PTS",
    Reb = "REB",
    The3P = "3P%",
    The3Pa = "3PA",
    The3Pm = "3PM",
}

export enum StatisticName {
    Assists = "assists",
    AvgAssists = "avgAssists",
    AvgPoints = "avgPoints",
    AvgRebounds = "avgRebounds",
    FieldGoalPct = "fieldGoalPct",
    FieldGoalsAttempted = "fieldGoalsAttempted",
    FieldGoalsMade = "fieldGoalsMade",
    FreeThrowPct = "freeThrowPct",
    FreeThrowsAttempted = "freeThrowsAttempted",
    FreeThrowsMade = "freeThrowsMade",
    Points = "points",
    Rebounds = "rebounds",
    ThreePointFieldGoalPct = "threePointFieldGoalPct",
    ThreePointFieldGoalsAttempted = "threePointFieldGoalsAttempted",
    ThreePointFieldGoalsMade = "threePointFieldGoalsMade",
}

export interface CompetitorTeam {
    id:               string;
    uid:              string;
    location:         string;
    name:             string;
    abbreviation:     string;
    displayName:      string;
    shortDisplayName: string;
    color?:           string;
    isActive:         boolean;
    links:            TeamLink[];
    logo?:            string;
    alternateColor?:  string;
    venue?:           VenueClass;
    conferenceId?:    string;
}

export interface TeamLink {
    rel:        TypeElement[];
    href:       string;
    text:       Text;
    isExternal: boolean;
    isPremium:  boolean;
}

export enum TypeElement {
    Clubhouse = "clubhouse",
    Desktop = "desktop",
    Roster = "roster",
    Schedule = "schedule",
    Stats = "stats",
    Team = "team",
}

export enum Text {
    Clubhouse = "Clubhouse",
    Roster = "Roster",
    Schedule = "Schedule",
    Statistics = "Statistics",
}

export interface Format {
    regulation: Regulation;
}

export interface Regulation {
    periods: number;
}

export interface GeoBroadcast {
    type:   GeoBroadcastType;
    market: MarketClass;
    media:  Media;
    lang:   Lang;
    region: Region;
}

export enum Lang {
    En = "en",
}

export interface MarketClass {
    id:   string;
    type: MarketType;
}

export enum MarketType {
    Home = "Home",
    National = "National",
}

export interface Media {
    shortName: string;
    logo?:     string;
    darkLogo?: string;
}

export enum Region {
    Us = "us",
}

export interface GeoBroadcastType {
    id:        string;
    shortName: ShortName;
}

export enum ShortName {
    Streaming = "Streaming",
    Tv = "TV",
}

export interface Headline {
    type:          ShortText;
    description:   string;
    shortLinkText: string;
    video?:        Video[];
}

export enum ShortText {
    BoxScore = "Box Score",
    Gamecast = "Gamecast",
    Highlights = "Highlights",
    PlayByPlay = "Play-by-Play",
    Recap = "Recap",
}

export interface Video {
    id:                 number;
    source:             string;
    headline:           string;
    thumbnail:          string;
    duration:           number;
    tracking:           Tracking;
    deviceRestrictions: DeviceRestrictions;
    links:              Links;
}

export interface DeviceRestrictions {
    type:    string;
    devices: string[];
}

export interface Links {
    web:          Web;
    mobile:       Mobile;
    api:          API;
    source:       Source;
    sportscenter: Sportscenter;
}

export interface API {
    self:    Sportscenter;
    artwork: Sportscenter;
}

export interface Sportscenter {
    href: string;
}

export interface Mobile {
    href:                string;
    source:              Sportscenter;
    alert:               Sportscenter;
    streaming:           Sportscenter;
    progressiveDownload: Sportscenter;
}

export interface Source {
    href:      string;
    mezzanine: Sportscenter;
    flash:     Sportscenter;
    hds:       Sportscenter;
    HLS:       HLS;
    HD:        Sportscenter;
    full:      Sportscenter;
}

export interface HLS {
    href: string;
    HD:   Sportscenter;
}

export interface Web {
    href: string;
    self: Self;
    seo:  Sportscenter;
}

export interface Self {
    href: string;
    dsi:  Sportscenter;
}

export interface Tracking {
    sportName:    string;
    leagueName:   string;
    coverageType: string;
    trackingName: string;
    trackingId:   string;
}

export interface Highlight {
    id:                  number;
    cerebroId:           string;
    source:              string;
    headline:            string;
    description:         string;
    lastModified:        Date;
    originalPublishDate: Date;
    duration:            number;
    timeRestrictions:    TimeRestrictions;
    deviceRestrictions:  DeviceRestrictions;
    thumbnail:           string;
    links:               Links;
    ad:                  Ad;
    tracking:            Tracking;
}

export interface Ad {
    sport:  string;
    bundle: string;
}

export interface TimeRestrictions {
    embargoDate:    Date;
    expirationDate: Date;
}

export interface Note {
    type:     TypeEnum;
    headline: string;
}

export enum TypeEnum {
    Boxscore = "boxscore",
    Desktop = "desktop",
    Event = "event",
    Highlights = "highlights",
    Live = "live",
    Pbp = "pbp",
    Recap = "recap",
    Summary = "summary",
}

export interface Odd {
    provider:     Provider;
    details:      string;
    overUnder:    number;
    spread:       number;
    awayTeamOdds: TeamOdds;
    homeTeamOdds: TeamOdds;
    open:         Open;
    current:      Current;
}

export interface TeamOdds {
    favorite: boolean;
    underdog: boolean;
    team:     AwayTeamOddsTeam;
}

export interface AwayTeamOddsTeam {
    id:           string;
    uid:          string;
    abbreviation: string;
    name:         string;
    displayName:  string;
    logo:         string;
}

export interface Current {
    over:  Over;
    under: Over;
    total: Total;
}

export interface Over {
    value:                 number;
    displayValue:          DisplayValue;
    alternateDisplayValue: string;
    decimal:               number;
    fraction:              DisplayValue;
    american:              string;
    outcome?:              Outcome;
}

export enum DisplayValue {
    The1011 = "10/11",
    The2021 = "20/21",
    The2023 = "20/23",
    The21 = "2/1",
    The512 = "5/12",
}

export interface Outcome {
    type: OutcomeType;
}

export enum OutcomeType {
    Pending = "pending",
}

export interface Total {
    alternateDisplayValue: string;
    american:              string;
}

export interface Open {
    over:  Over;
    under: Over;
    total: Over;
}

export interface Provider {
    id:       string;
    name:     ProviderName;
    priority: number;
}

export enum ProviderName {
    EspnBet = "ESPN BET",
}

export interface Situation {
    lastPlay: LastPlay;
}

export interface LastPlay {
    id:                string;
    type:              LastPlayType;
    text:              string;
    scoreValue:        number;
    team?:             VenueClass;
    probability:       Probability;
    athletesInvolved?: AthletesInvolved[];
}

export interface AthletesInvolved {
    id:          string;
    fullName:    string;
    displayName: string;
    shortName:   string;
    links:       AthleteLink[];
    headshot?:   string;
    jersey:      string;
    position:    Tion;
    team:        VenueClass;
}

export interface Probability {
    tiePercentage:     number;
    homeWinPercentage: number;
    awayWinPercentage: number;
}

export interface LastPlayType {
    id:   string;
    text: string;
}

export interface Status {
    clock:        number;
    displayClock: string;
    period:       number;
    type:         StatusType;
}

export interface StatusType {
    id:          string;
    name:        TypeName;
    state:       State;
    completed:   boolean;
    description: Description;
    detail:      string;
    shortDetail: string;
}

export enum Description {
    Final = "Final",
    Halftime = "Halftime",
    InProgress = "In Progress",
    Scheduled = "Scheduled",
}

export enum TypeName {
    StatusFinal = "STATUS_FINAL",
    StatusHalftime = "STATUS_HALFTIME",
    StatusInProgress = "STATUS_IN_PROGRESS",
    StatusScheduled = "STATUS_SCHEDULED",
}

export enum State {
    In = "in",
    Post = "post",
    Pre = "pre",
}

export interface Ticket {
    summary:         string;
    numberAvailable: number;
    links:           Sportscenter[];
}

export interface CompetitionType {
    id:           string;
    abbreviation: TypeAbbreviation;
}

export enum TypeAbbreviation {
    Std = "STD",
    Trnmnt = "TRNMNT",
}

export interface Venue {
    id:       string;
    fullName: string;
    address:  Address;
    indoor:   boolean;
}

export interface Address {
    city:  string;
    state: string;
}

export interface EventLink {
    language:   Language;
    rel:        TypeEnum[];
    href:       string;
    text:       ShortText;
    shortText:  ShortText;
    isExternal: boolean;
    isPremium:  boolean;
}

export enum Language {
    EnUS = "en-US",
}

export interface EventSeason {
    year: number;
    type: number;
    slug: Slug;
}

export enum Slug {
    RegularSeason = "regular-season",
}

export interface EventsDate {
    date:       string;
    seasonType: number;
}

export interface League {
    id:                  string;
    uid:                 string;
    name:                string;
    abbreviation:        string;
    midsizeName:         string;
    slug:                string;
    season:              LeagueSeason;
    logos:               Logo[];
    calendarType:        string;
    calendarIsWhitelist: boolean;
    calendarStartDate:   string;
    calendarEndDate:     string;
    calendar:            string[];
}

export interface Logo {
    href:        string;
    width:       number;
    height:      number;
    alt:         string;
    rel:         string[];
    lastUpdated: string;
}

export interface LeagueSeason {
    year:        number;
    startDate:   string;
    endDate:     string;
    displayName: string;
    type:        SeasonType;
}

export interface SeasonType {
    id:           string;
    type:         number;
    name:         string;
    abbreviation: string;
}
