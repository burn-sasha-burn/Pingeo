import {jsonFetchWithErrorLog} from 'utils/apiUtils';

interface IGeoipResult {
    city: string;
    country_code: string;
    ip: string;
    latitude: number;
    longitude: number;
    metro_code: number;
    region_code: string;
    region_name: string;
    time_zone: string;
    zip_code: string;
}

export function getLocation(): Promise<IGeoipResult> {
    return jsonFetchWithErrorLog('https://freegeoip.app/json/', {});
}
