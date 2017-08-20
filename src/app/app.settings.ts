import { Headers } from '@angular/http';

export class AppSettings {

    public static get API_ENDPOINT(): string {
        let apiUrl = 'http://localhost:3000/'; // json server port
        return apiUrl;
    }
    public static get GetDefaultHeaders(): Headers {
        let optionsHeaders = new Headers();
        optionsHeaders.append('Content-Type', 'application/json');
        return optionsHeaders;
    }
}