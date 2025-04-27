import React from 'react';
import Link from 'next/link';
import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Yeni Hesap Oluşturun
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Zaten hesabınız var mı?{' '}
                    <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                        Giriş yapın
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
} 