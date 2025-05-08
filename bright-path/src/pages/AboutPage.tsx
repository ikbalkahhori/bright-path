import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="pt-12">
            <section className="relative py-32 md:py-40">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop"
                        alt="Students studying abroad"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="text-center text-white max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About BrightPath
                        </h1>
                        <p className="text-xl text-gray-100">
                            Guiding students to their perfect international education journey since 2022
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
                        <p className="text-lg text-gray-600">
                            Passionate educators and innovators committed to transforming international education
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Yunus Ozdeniz",
                                role: "MSc SE - North American University (NAU)",
                                bio: "I’m a Master’s student in Computer Science (Software Engineering) at North American University (NAU), and this is my final capstone project.",
                                image: "Yunus.jpeg"
                            },
                            {
                                name: "Muhammadikbol Kahhori",
                                role: "MSc SE - North American University (NAU)",
                                bio: "I’m a Master’s student in Computer Science (Software Engineering) at North American University (NAU), and this is my final capstone project.",
                                image: "./Kahhori.JPG"
                            },
                            {
                                name: "Togay Bayram",
                                role: "MSc SE - North American University (NAU)",
                                bio: "I’m a Master’s student in Computer Science (Software Engineering) at North American University (NAU), and this is my final capstone project.",
                                image: "./Tog.jpeg"
                            }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="h-64 bg-gray-100">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600 text-justify">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-white p-8 rounded-xl shadow-md h-full">
                                    <div className="inline-block p-3 bg-purple-100 rounded-lg mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                    <p className="text-gray-600 mb-4">
                                        At BrightPath, we believe that education is the foundation for a brighter future.
                                        Our mission is to connect students with international educational opportunities that
                                        align with their aspirations, abilities, and ambitions.
                                    </p>
                                    <p className="text-gray-600">
                                        We strive to make quality international education accessible to all qualified
                                        students, regardless of their background or resources.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-white p-8 rounded-xl shadow-md h-full">
                                    <div className="inline-block p-3 bg-pink-100 rounded-lg mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                                    <p className="text-gray-600 mb-4">
                                        We envision a world where geographical, financial, and informational barriers
                                        no longer prevent talented students from accessing global education opportunities.
                                    </p>
                                    <p className="text-gray-600">
                                        By 2030, we aim to help over 100,000 students from diverse backgrounds
                                        fulfill their dreams of studying abroad and building global careers.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                        </motion.div>

                        <div className="relative border-l-2 border-purple-200 pl-10 ml-6 space-y-10">
                            {[
                                {
                                    year: "2022",
                                    title: "The Beginning",
                                    description: "BrightPath was founded by a team of education enthusiasts who saw the challenges students face when planning to study abroad."
                                },
                                {
                                    year: "2023",
                                    title: "Platform Launch",
                                    description: "We launched our digital platform, helping our first 500 students find and apply to programs around the world."
                                },
                                {
                                    year: "2024",
                                    title: "AI Integration",
                                    description: "Introduced our AI assistant 'Brightie' to provide 24/7 personalized guidance to students."
                                },
                                {
                                    year: "2025",
                                    title: "Global Expansion",
                                    description: "Expanded our services to 50+ countries, with a growing network of university partnerships worldwide."
                                }
                            ].map((milestone, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="absolute -left-16 mt-1.5 h-8 w-8 rounded-full border-2 border-purple-200 bg-white flex items-center justify-center">
                                        <div className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <span className="inline-block px-3 py-1 text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-2">
                                            {milestone.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                                        <p className="text-gray-600">{milestone.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-lg text-gray-600">
                            The principles that guide everything we do at BrightPath
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Student-Centered",
                                description: "We put students' needs and goals at the heart of every decision."
                            },
                            {
                                title: "Integrity",
                                description: "We provide honest guidance, even when it's not the easiest path."
                            },
                            {
                                title: "Innovation",
                                description: "We constantly explore new ways to improve the study abroad journey."
                            },
                            {
                                title: "Inclusivity",
                                description: "We believe diverse perspectives enrich the educational experience."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                            >
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4 flex items-center justify-center">
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
