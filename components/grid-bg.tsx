"use client"


export function GridBackground() {
    return (
        <>
            <style jsx global>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }
                @keyframes pulse-slow-delay {
                    0%, 100% { opacity: 0.4; transform: scale(1.05); }
                    50% { opacity: 0.8; transform: scale(1); }
                }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
                .animate-pulse-slow-delay { animation: pulse-slow-delay 5s ease-in-out infinite; }
            `}</style>

            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Base dark background */}
                <div className="absolute inset-0 bg-[#070b14]" />

                {/* Square grid */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(99, 102, 241, 0.07) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.07) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Radial fade overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />

                {/* Glowing orbs */}
                <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-300px] right-[-200px] w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-[120px] animate-pulse-slow-delay" />
                <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[100px]" />
            </div>
        </>
    )
}

