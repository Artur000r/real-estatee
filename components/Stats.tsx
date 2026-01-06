export default function Stats() {
  const stats = [
    { label: "Գույքեր", value: "1,200+" },
    { label: "Գործակալներ", value: "45" },
    { label: "Հաճախորդներ", value: "10k+" },
    { label: "Մրցանակներ", value: "12" },
  ];

  return (
    <section className="py-12 border-y border-gray-100 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-blue-600 mb-1">{s.value}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}