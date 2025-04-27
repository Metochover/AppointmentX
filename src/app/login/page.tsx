'use client';

import React from 'react';
import Link from 'next/link';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="auth-container">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="auth-title">
                    Hesabınıza Giriş Yapın
                </h2>
                <p className="auth-subtitle">
                    Hesabınız yok mu?{' '}
                    <Link href="/register" className="auth-link">
                        Kayıt olun
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="auth-box">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
} 