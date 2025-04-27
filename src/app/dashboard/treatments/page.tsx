"use client";
import React, { useState } from 'react';
import { FaUserInjured, FaTooth, FaNotesMedical, FaPlus } from 'react-icons/fa';

const defaultReports = [
    {
        date: '2024-04-02',
        patient: 'Ayşe Demir',
        treatment: 'Dolgu',
        description: 'Arka diş dolgu işlemi',
    },
    {
        date: '2024-04-05',
        patient: 'Mehmet Yılmaz',
        treatment: 'Diş Temizliği',
        description: 'Düzenli bakım',
    },
];

function getTreatmentIcon(treatment: string) {
    if (treatment.toLowerCase().includes('diş')) return <FaTooth className="text-blue-600 text-2xl" />;
    if (treatment.toLowerCase().includes('dolgu')) return <FaNotesMedical className="text-green-600 text-2xl" />;
    return <FaUserInjured className="text-gray-500 text-2xl" />;
}

export default function TreatmentsPage() {
    const [reports, setReports] = useState(defaultReports);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ date: '', patient: '', treatment: '', description: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setReports([...reports, form]);
        setForm({ date: '', patient: '', treatment: '', description: '' });
        setShowModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-black flex items-center gap-2">
                    <FaNotesMedical className="text-blue-600 text-4xl" /> Tedavi Raporları
                </h1>
                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow transition"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Rapor Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-lg flex items-start gap-5 p-5 hover:shadow-2xl transition">
                        <div className="flex flex-col items-center gap-2 min-w-[60px]">
                            {getTreatmentIcon(report.treatment)}
                            <span className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-lg font-bold text-black mb-1">{report.patient}</div>
                            <div className="text-black text-sm font-medium mb-1">Tedavi: <span className="font-normal">{report.treatment}</span></div>
                            <div className="text-black text-sm font-medium">Açıklama: <span className="font-normal">{report.description}</span></div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative animate-fade-in">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-black">Yeni Tedavi Raporu</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input
                                type="date"
                                placeholder="Tarih"
                                value={form.date}
                                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Hasta Adı"
                                value={form.patient}
                                onChange={e => setForm(f => ({ ...f, patient: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Tedavi"
                                value={form.treatment}
                                onChange={e => setForm(f => ({ ...f, treatment: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Açıklama"
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-lg mt-2"
                            >
                                Kaydet
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 