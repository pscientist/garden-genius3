const paragraphs = [
  "Starting a landscape project is harder than it looks. A homeowner has to choose a layout, a budget, and plants that suit the yard, then guess how much skill and upkeep that choice will take. Without a clear first step, the project stays on the list.",
  "Other people's gardens are easy to admire and hard to copy. A photo online does not show what will fit your own space, or what you can realistically take on in a weekend.",
  "GardenViz helps you begin. Browse makeover ideas and see the cost, skill, and maintenance beside each one. Then use a photo of your own yard to get a suggested design, with short notes on layout, plants, and budget, so you can start.",
];

export default function AboutPage() {
  return (
    <section className="max-w-2xl py-4">
      <h1 className="page-title">About</h1>
      <div className="mt-8 flex flex-col gap-5">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="font-inter text-sm leading-7 text-main-nav"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
