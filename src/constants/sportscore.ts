// SportScore (https://sportscore.com) — free, keyless, CORS-open REST API
// for live sports scores. No signup needed. Free tier requires a visible
// "Powered by SportScore" attribution link, shown below the Live Matches table.
//
// /api/v1/fixtures/ (vs. the simpler /api/widget/matches/) supports date and
// status filters plus a limit of up to 200, which is what makes real
// pagination and a full live/upcoming/finished view possible.
export const SPORTSCORE_FIXTURES_URL = 'https://sportscore.com/api/v1/fixtures/';
