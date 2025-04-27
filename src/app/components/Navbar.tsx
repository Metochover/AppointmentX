'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '../routes';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href={routes.home} className="text-2xl font-bold text-purple-600">AppointX</Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href={routes.features}
                                className={`inline-flex items-center px-1 pt-1 ${pathname === routes.features
                                    ? 'border-b-2 border-purple-500 text-purple-700'
                                    : 'text-gray-700 hover:text-purple-700'
                                    }`}
                            >
                                Özellikler
                            </Link>
                            <Link
                                href={routes.pricing}
                                className={`inline-flex items-center px-1 pt-1 ${pathname === routes.pricing
                                    ? 'border-b-2 border-purple-500 text-purple-700'
                                    : 'text-gray-700 hover:text-purple-700'
                                    }`}
                            >
                                Fiyatlandırma
                            </Link>
                            <Link
                                href={routes.businesses}
                                className={`inline-flex items-center px-1 pt-1 ${pathname === routes.businesses
                                    ? 'border-b-2 border-purple-500 text-purple-700'
                                    : 'text-gray-700 hover:text-purple-700'
                                    }`}
                            >
                                İşletmeler
                            </Link>
                            <Link
                                href={routes.contact}
                                className={`inline-flex items-center px-1 pt-1 ${pathname === routes.contact
                                    ? 'border-b-2 border-purple-500 text-purple-700'
                                    : 'text-gray-700 hover:text-purple-700'
                                    }`}
                            >
                                İletişim
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <Link
                            href={routes.login}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 hover:text-purple-700 focus:outline-none"
                        >
                            Giriş Yap
                        </Link>
                        <Link
                            href={routes.register}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Kayıt Ol
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 