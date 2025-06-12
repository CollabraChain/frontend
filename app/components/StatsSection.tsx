
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: "59%",
    label: "Freelancers face payment issues",
    subtext: "Traditional platforms lack trust"
  },
  {
    value: "200B+",
    label: "Creator economy by 2025",
    subtext: "Growing need for better tools"
  },
  {
    value: "52%",
    label: "Employers struggle with communication",
    subtext: "Coordination challenges persist"
  },
  {
    value: "0.1s",
    label: "Average payment settlement",
    subtext: "On Base blockchain"
  }
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
            The numbers speak for themselves
          </h2>
          <p className="mt-4 text-neutral-600">
            Current collaboration platforms fail to address fundamental issues
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-white border-neutral-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold trust-blue mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-neutral-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-500">
                  {stat.subtext}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
