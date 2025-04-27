"use client";

import React, { useState } from 'react';
import { FaCat, FaDog, FaPaw, FaPlus } from 'react-icons/fa';

const defaultPets = [
    {
        name: 'Pamuk',
        type: 'Kedi',
        breed: 'Van Kedisi',
        birthDate: '2021-05-10',
        image: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg',
    },
    {
        name: 'Karabas',
        type: 'Köpek',
        breed: 'Golden Retriever',
        birthDate: '2020-08-20',
        image: 'https://cdn.pixabay.com/photo/2016/02/19/10/00/dog-1207816_1280.jpg',
    },
];

function getTypeIcon(type: string) {
    if (type.toLowerCase() === 'kedi') return <FaCat className="text-yellow-600 text-2xl" />;
    if (type.toLowerCase() === 'köpek') return <FaDog className="text-blue-700 text-2xl" />;
    return <FaPaw className="text-gray-500 text-2xl" />;
}

export default function PetsPage() {
    const [pets, setPets] = useState(defaultPets);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', type: '', breed: '', birthDate: '', image: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setPets([...pets, { ...form, image: form.image || 'https://cdn.pixabay.com/photo/2016/11/29/09/32/animal-1867121_1280.jpg' }]);
        setForm({ name: '', type: '', breed: '', birthDate: '', image: '' });
        setShowModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-black flex items-center gap-2">
                    <FaPaw className="text-purple-600 text-4xl" /> Evcil Hayvanlarım
                </h1>
                <button
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded shadow transition"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Hayvan Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pets.map((pet, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-lg flex items-center gap-5 p-5 hover:shadow-2xl transition">
                        <img
                            src={pet.image}
                            alt={pet.name}
                            className="w-24 h-24 object-cover rounded-full border-4 border-purple-200 shadow"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(pet.type)}
                                <span className="text-xl font-bold text-black">{pet.name}</span>
                            </div>
                            <div className="text-black text-sm font-medium">Tür: <span className="font-normal">{pet.type}</span></div>
                            <div className="text-black text-sm font-medium">Irk: <span className="font-normal">{pet.breed}</span></div>
                            <div className="text-black text-sm font-medium">Doğum Tarihi: <span className="font-normal">{new Date(pet.birthDate).toLocaleDateString('tr-TR')}</span></div>
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
                        <h2 className="text-2xl font-semibold mb-6 text-black">Yeni Hayvan Ekle</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Adı"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Tür (Kedi, Köpek vb.)"
                                value={form.type}
                                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Irk"
                                value={form.breed}
                                onChange={e => setForm(f => ({ ...f, breed: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Doğum Tarihi"
                                value={form.birthDate}
                                onChange={e => setForm(f => ({ ...f, birthDate: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="url"
                                placeholder="Fotoğraf URL (opsiyonel)"
                                value={form.image}
                                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                            />
                            <button
                                type="submit"
                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full text-lg mt-2"
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