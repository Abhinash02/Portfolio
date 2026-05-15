import SectionForm from "@/components/admin/SectionForm";
import { getPortfolioData } from "@/lib/getData";

export default async function AboutAdminPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">About Section</h1>
      <SectionForm
        endpoint="/api/about"
        initialData={data.about || {}}
        fields={[{ name: "content", label: "About Content", type: "textarea" }]}
      />
    </div>
  );
}