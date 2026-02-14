import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateUtils {
    public fromIsoToDMY(dateStr: string): string {
        if (!dateStr) return ''
        let date = new Date(dateStr)
        return ('0' + date.getDate()).slice(-2) + '/' +
            ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
            date.getFullYear();
    }

    public fromDMYToIso(dateStr: string): string {
        if (!dateStr) return '';
        const parts = dateStr.split('/');
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }

}