"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import type { Route } from 'next';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">AppointFlow</h3>
                        <p className="text-gray-400">Modern işletmeler için geliştirilmiş randevu yönetim sistemi.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href={"/services" as Route} className="text-gray-400 hover:text-white">
                                    Özellikler
                                </Link>
                            </li>
                            <li>
                                <Link href={"/pricing" as Route} className="text-gray-400 hover:text-white">
                                    Paketler
                                </Link>
                            </li>
                            <li>
                                <Link href={"/businesses" as Route} className="text-gray-400 hover:text-white">
                                    İşletmeler
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Destek</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href={"/contact" as Route} className="text-gray-400 hover:text-white">
                                    İletişim
                                </Link>
                            </li>
                            <li>
                                <Link href={"/faq" as Route} className="text-gray-400 hover:text-white">
                                    SSS
                                </Link>
                            </li>
                            <li>
                                <Link href={"/privacy" as Route} className="text-gray-400 hover:text-white">
                                    Gizlilik Politikası
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                        <p className="text-gray-400 mb-2">Email: info@appointflow.com</p>
                        <p className="text-gray-400 mb-4">Tel: +90 212 XXX XX XX</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} AppointFlow. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
