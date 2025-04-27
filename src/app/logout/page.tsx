'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        // Kullanıcı bilgilerini localStorage'dan temizle
        localStorage.removeItem('currentUser');

        // Ana sayfaya yönlendir
        router.push('/');
    }, [router]);

    return null; // Sayfa görünmeyecek, direkt yönlendirme yapılacak
} 