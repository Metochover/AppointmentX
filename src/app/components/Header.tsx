import React from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import type { Route } from 'next';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-semibold">
                    <Link href={"/" as Route} className="text-white">Randevu</Link>
                </div>

                {/* Navigation Menu */}
                <nav className="hidden md:flex space-x-6">
                    <Link href={"/" as Route} className="hover:text-gray-200">Ana Sayfa</Link>
                    <Link href={"/services" as Route} className="hover:text-gray-200">Hizmetler</Link>
                    <Link href={"/about" as Route} className="hover:text-gray-200">Hakkımızda</Link>
                    <Link href={"/contact" as Route} className="hover:text-gray-200">İletişim</Link>
                    <Link href={"/signup" as Route} className="hover:text-gray-200">Üye Ol</Link>
                    <Link href={"/login" as Route} className="hover:text-gray-200">Giriş Yap</Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button>
                        <FaBars className="text-3xl" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
