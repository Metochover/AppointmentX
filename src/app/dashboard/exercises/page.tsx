"use client";
import React, { useState } from 'react';
import { FaDumbbell, FaClipboardList, FaPlus } from 'react-icons/fa';

const defaultExercises = [
    {
        date: '2024-04-12',
        patient: 'Mehmet Yılmaz',
        program: 'Diz Rehabilitasyonu',
        notes: 'Quadriceps güçlendirme, 3 set 15 tekrar',
    },
    {
        date: '2024-04-18',
        patient: 'Ayşe Kara',
        program: 'Omuz Mobilizasyonu',
        notes: 'Günlük 2 set 10 tekrar, lastik bant ile',
    },
];

export default function ExercisesPage() {
    const [exercises, setExercises] = useState(defaultExercises);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ date: '', patient: '', program: '', notes: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setExercises([...exercises, form]);
        setForm({ date: '', patient: '', program: '', notes: '' });
        setShowModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-black flex items-center gap-2">
                    <FaDumbbell className="text-blue-700 text-4xl" /> Egzersiz Planları
                </h1>
                <button
                    className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded shadow transition"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Plan Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exercises.map((ex, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-lg flex items-start gap-5 p-5 hover:shadow-2xl transition">
                        <div className="flex flex-col items-center gap-2 min-w-[60px]">
                            <FaClipboardList className="text-blue-500 text-2xl" />
                            <span className="text-xs text-gray-500">{new Date(ex.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-lg font-bold text-black mb-1 flex items-center gap-2">
                                {ex.patient}
                            </div>
                            <div className="text-black text-sm font-medium mb-1">Program: <span className="font-normal">{ex.program}</span></div>
                            <div className="text-black text-sm font-medium">Notlar: <span className="font-normal">{ex.notes}</span></div>
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
                        <h2 className="text-2xl font-semibold mb-6 text-black">Yeni Egzersiz Planı</h2>
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
                                placeholder="Program"
                                value={form.program}
                                onChange={e => setForm(f => ({ ...f, program: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <textarea
                                placeholder="Notlar"
                                value={form.notes}
                                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                                rows={3}
                            />
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-full text-lg mt-2"
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