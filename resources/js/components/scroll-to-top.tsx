import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export function ScrollToTop() {
    const { url } = usePage();
    useEffect(() => { window.scrollTo(0, 0); }, [url]);
    return null;
}
